import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../api/apiClient';
import type {
    ChatState,
    ChatMessage,
    Conversation,
    PaginationMeta,
    SendMessageRequest,
    SendMessageResponse,
    FetchConversationsResponse,
    FetchMessagesResponse,
    WsStatus,
} from '../../types/chat';

// ── Initial State ───────────────────────────────────────────────

const initialPagination: PaginationMeta = {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: false,
};

const initialState: ChatState = {
    conversations: [],
    messages: {},
    activeConversationId: null,
    isStreaming: false,
    isTyping: false,
    wsStatus: 'disconnected',
    conversationPagination: { ...initialPagination },
    messagePagination: {},
    isLoadingConversations: false,
    isLoadingMessages: false,
};

// ── Async Thunks ────────────────────────────────────────────────

export const fetchConversations = createAsyncThunk(
    'chat/fetchConversations',
    async (page: number = 1, { rejectWithValue }) => {
        try {
            const data = await apiClient.get<FetchConversationsResponse>(
                `/chat/conversations?page=${page}&limit=20`
            );
            return data;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to fetch conversations';
            return rejectWithValue(message);
        }
    }
);

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async (
        { conversationId, page = 1 }: { conversationId: string; page?: number },
        { rejectWithValue }
    ) => {
        try {
            const data = await apiClient.get<FetchMessagesResponse>(
                `/chat/conversations/${conversationId}/messages?page=${page}&limit=30`
            );
            return { conversationId, ...data };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to fetch messages';
            return rejectWithValue(message);
        }
    }
);

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (request: SendMessageRequest, { rejectWithValue }) => {
        try {
            const data = await apiClient.post<SendMessageResponse, SendMessageRequest>(
                '/chat/messages',
                request
            );
            return data;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to send message';
            return rejectWithValue(message);
        }
    }
);

// ── Slice ───────────────────────────────────────────────────────

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // ── Message Reducers ────────────────────────────────────
        addMessage(state, action: PayloadAction<ChatMessage>) {
            const msg = action.payload;
            if (!state.messages[msg.conversationId]) {
                state.messages[msg.conversationId] = [];
            }
            state.messages[msg.conversationId].push(msg);
        },

        updateMessage(
            state,
            action: PayloadAction<{ conversationId: string; messageId: string; updates: Partial<ChatMessage> }>
        ) {
            const { conversationId, messageId, updates } = action.payload;
            const msgs = state.messages[conversationId];
            if (msgs) {
                const idx = msgs.findIndex((m) => m.id === messageId);
                if (idx !== -1) {
                    msgs[idx] = { ...msgs[idx], ...updates };
                }
            }
        },

        appendStreamToken(
            state,
            action: PayloadAction<{ conversationId: string; messageId: string; token: string }>
        ) {
            const { conversationId, messageId, token } = action.payload;
            const msgs = state.messages[conversationId];
            if (msgs) {
                const msg = msgs.find((m) => m.id === messageId);
                if (msg) {
                    msg.content += token;
                }
            }
        },

        addOlderMessages(
            state,
            action: PayloadAction<{ conversationId: string; messages: ChatMessage[] }>
        ) {
            const { conversationId, messages } = action.payload;
            if (!state.messages[conversationId]) {
                state.messages[conversationId] = [];
            }
            // Prepend older messages
            state.messages[conversationId] = [...messages, ...state.messages[conversationId]];
        },

        // ── State Flag Reducers ─────────────────────────────────
        setStreaming(state, action: PayloadAction<boolean>) {
            state.isStreaming = action.payload;
        },

        setTyping(state, action: PayloadAction<boolean>) {
            state.isTyping = action.payload;
        },

        setWsStatus(state, action: PayloadAction<WsStatus>) {
            state.wsStatus = action.payload;
        },

        setActiveConversation(state, action: PayloadAction<string | null>) {
            state.activeConversationId = action.payload;
        },

        // ── Conversation Reducers ───────────────────────────────
        setConversations(state, action: PayloadAction<Conversation[]>) {
            state.conversations = action.payload;
        },

        addConversation(state, action: PayloadAction<Conversation>) {
            state.conversations.unshift(action.payload);
        },

        clearActiveChat(state) {
            state.activeConversationId = null;
            state.isStreaming = false;
            state.isTyping = false;
        },
    },

    extraReducers: (builder) => {
        // ── Fetch Conversations ─────────────────────────────────
        builder
            .addCase(fetchConversations.pending, (state) => {
                state.isLoadingConversations = true;
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.isLoadingConversations = false;
                const { conversations, pagination } = action.payload;

                if (pagination.page === 1) {
                    state.conversations = conversations;
                } else {
                    // Append for infinite scroll
                    state.conversations = [...state.conversations, ...conversations];
                }
                state.conversationPagination = pagination;
            })
            .addCase(fetchConversations.rejected, (state) => {
                state.isLoadingConversations = false;
            });

        // ── Fetch Messages ──────────────────────────────────────
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.isLoadingMessages = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.isLoadingMessages = false;
                const { conversationId, messages, pagination } = action.payload;

                if (pagination.page === 1) {
                    state.messages[conversationId] = messages;
                } else {
                    // Prepend older messages
                    state.messages[conversationId] = [
                        ...messages,
                        ...(state.messages[conversationId] || []),
                    ];
                }
                state.messagePagination[conversationId] = pagination;
            })
            .addCase(fetchMessages.rejected, (state) => {
                state.isLoadingMessages = false;
            });

        // ── Send Message ────────────────────────────────────────
        builder
            .addCase(sendMessage.fulfilled, (state, action) => {
                const { message, conversationId } = action.payload;
                const msgs = state.messages[conversationId];
                if (msgs) {
                    // Update the optimistic message status to 'sent'
                    const idx = msgs.findIndex((m) => m.id === message.id);
                    if (idx !== -1) {
                        msgs[idx] = { ...msgs[idx], status: 'sent' };
                    }
                }
            })
            .addCase(sendMessage.rejected, (state, action) => {
                // Mark the optimistic message as errored
                const request = action.meta.arg;
                if (request.conversationId) {
                    const msgs = state.messages[request.conversationId];
                    if (msgs && msgs.length > 0) {
                        const lastUserMsg = [...msgs].reverse().find((m) => m.role === 'user');
                        if (lastUserMsg) {
                            lastUserMsg.status = 'error';
                        }
                    }
                }
            });
    },
});

export const {
    addMessage,
    updateMessage,
    appendStreamToken,
    addOlderMessages,
    setStreaming,
    setTyping,
    setWsStatus,
    setActiveConversation,
    setConversations,
    addConversation,
    clearActiveChat,
} = chatSlice.actions;

export default chatSlice.reducer;
