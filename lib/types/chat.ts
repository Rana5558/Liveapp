// ── Message Types ────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageStatus = 'sending' | 'sent' | 'error';

export interface FileAttachment {
    id: string;
    name: string;
    type: string;          // MIME type
    size: number;          // bytes
    url?: string;          // remote URL after upload
    previewUrl?: string;   // local blob URL for preview
}

export interface ChatMessage {
    id: string;
    conversationId: string;
    role: MessageRole;
    content: string;
    status: MessageStatus;
    attachments?: FileAttachment[];
    createdAt: string;     // ISO 8601
}

// ── Conversation Types ──────────────────────────────────────────

export interface Conversation {
    id: string;
    title: string;
    lastMessage?: string;
    createdAt: string;
    updatedAt: string;
}

// ── Pagination ──────────────────────────────────────────────────

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
}

// ── WebSocket ───────────────────────────────────────────────────

export type WsStatus = 'connecting' | 'connected' | 'disconnected';

export interface WsIncomingEvent {
    type: 'message' | 'typing' | 'error' | 'stream_token' | 'stream_end';
    payload: Record<string, unknown>;
}

export interface WsOutgoingEvent {
    type: 'send_message' | 'typing_start' | 'typing_stop';
    payload: Record<string, unknown>;
}

// ── Redux State ─────────────────────────────────────────────────

export interface ChatState {
    conversations: Conversation[];
    /** Messages grouped by conversationId */
    messages: Record<string, ChatMessage[]>;
    activeConversationId: string | null;
    isStreaming: boolean;
    isTyping: boolean;
    wsStatus: WsStatus;
    conversationPagination: PaginationMeta;
    messagePagination: Record<string, PaginationMeta>;
    isLoadingConversations: boolean;
    isLoadingMessages: boolean;
}

// ── API DTOs ────────────────────────────────────────────────────

export interface SendMessageRequest {
    conversationId?: string;  // omit to create new conversation
    content: string;
    attachments?: FileAttachment[];
}

export interface SendMessageResponse {
    message: ChatMessage;
    conversationId: string;
}

export interface FetchConversationsResponse {
    conversations: Conversation[];
    pagination: PaginationMeta;
}

export interface FetchMessagesResponse {
    messages: ChatMessage[];
    pagination: PaginationMeta;
}
