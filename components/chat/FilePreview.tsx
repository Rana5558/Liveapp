import React from 'react';
import { X, FileText, Image as ImageIcon } from 'lucide-react';

interface FilePreviewItem {
    id: string;
    name: string;
    type: string;
    size: number;
    previewUrl?: string;
}

interface FilePreviewProps {
    files: FilePreviewItem[];
    onRemove: (id: string) => void;
    removable?: boolean;
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FilePreview({ files, onRemove, removable = true }: FilePreviewProps) {
    if (files.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 px-1">
            {files.map((file) => {
                const isImage = file.type.startsWith('image/');

                return (
                    <div
                        key={file.id}
                        className="relative group bg-neutral-800 border border-neutral-700 rounded-lg p-2 flex items-center gap-2 max-w-[200px]"
                    >
                        {/* Thumbnail or icon */}
                        {isImage && file.previewUrl ? (
                            <img
                                src={file.previewUrl}
                                alt={file.name}
                                className="w-10 h-10 rounded object-cover shrink-0"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded bg-neutral-700 flex items-center justify-center shrink-0">
                                {isImage ? (
                                    <ImageIcon className="w-5 h-5 text-neutral-400" />
                                ) : (
                                    <FileText className="w-5 h-5 text-neutral-400" />
                                )}
                            </div>
                        )}

                        {/* File info */}
                        <div className="min-w-0 flex-1">
                            <p className="text-white text-[11px] font-medium truncate">
                                {file.name}
                            </p>
                            <p className="text-neutral-500 text-[10px]">
                                {formatFileSize(file.size)}
                            </p>
                        </div>

                        {/* Remove button */}
                        {removable && (
                            <button
                                onClick={() => onRemove(file.id)}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label={`Remove ${file.name}`}
                            >
                                <X className="w-3 h-3 text-white" />
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
