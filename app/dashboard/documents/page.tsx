"use client";

import React, { useState } from "react";
import { FileText, Upload, Trash2, Download, Eye, Search, Plus } from "lucide-react";

const showComingSoon = (action: string) => {
    // Placeholder for toast notification - can be replaced with actual toast library
    alert(`${action} feature is coming soon!`);
};

const documents = [
    { id: 1, name: "Blood Report Analysis.pdf", date: "Feb 15, 2026", size: "2.4 MB", type: "Medical Report" },
    { id: 2, name: "Prescription - Dr. Smith.pdf", date: "Feb 10, 2026", size: "1.2 MB", type: "Prescription" },
    { id: 3, name: "Lab Test Results.pdf", date: "Feb 5, 2026", size: "3.1 MB", type: "Lab Report" },
    { id: 4, name: "MRI Scan Report.pdf", date: "Jan 28, 2026", size: "8.7 MB", type: "Scan Report" },
    { id: 5, name: "Cardiology Report.pdf", date: "Jan 15, 2026", size: "1.9 MB", type: "Medical Report" },
];

const typeBadgeColors: Record<string, string> = {
    "Medical Report": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Prescription": "bg-green-500/10 text-green-400 border-green-500/20",
    "Lab Report": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Scan Report": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function DocumentsPage() {
    const [search, setSearch] = useState("");

    const filtered = documents.filter(
        (d) =>
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.type.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 space-y-5 sm:space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Documents</h1>
                    <p className="text-neutral-400 text-sm sm:text-base">Manage your medical documents and reports</p>
                </div>
                {/* <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary/20 w-full sm:w-auto">
                    <Upload className="w-4 h-4" />
                    Upload Document
                </button> */}
            </div>

            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                    type="text"
                    placeholder="Search documents..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
                />
            </div>

            {/* Documents Grid — 1 col mobile, 2 col desktop */}
            {filtered.length === 0 ? (
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10 sm:p-12 flex flex-col items-center text-center">
                    <FileText className="w-9 h-9 text-neutral-700 mb-3" />
                    <p className="text-neutral-400 font-medium">No documents found</p>
                    <p className="text-neutral-600 text-sm mt-1">Try a different search term or upload a new document</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    {filtered.map((doc) => (
                        <div
                            key={doc.id}
                            className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-5 hover:bg-neutral-800 transition-colors group"
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="p-2.5 sm:p-3 bg-primary/10 border border-primary/20 rounded-xl shrink-0">
                                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold text-sm truncate">{doc.name}</h3>
                                    <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border mt-1.5 ${typeBadgeColors[doc.type] ?? "bg-neutral-800 text-neutral-400 border-neutral-700"}`}>
                                        {doc.type}
                                    </span>
                                    <div className="flex flex-wrap items-center gap-1.5 mt-2 text-xs text-neutral-500">
                                        <span>{doc.date}</span>
                                        <span>•</span>
                                        <span>{doc.size}</span>
                                    </div>
                                </div>

                                {/* Actions — always visible on mobile, hover-only on desktop */}
                                <div className="flex items-center gap-1 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => showComingSoon("Preview")}
                                        className="p-1.5 sm:p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors" title="Preview">
                                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </button>
                                    <button
                                        onClick={() => showComingSoon("Download")}
                                        className="p-1.5 sm:p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors" title="Download">
                                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </button>
                                    <button
                                        onClick={() => showComingSoon("Delete")}
                                        className="p-1.5 sm:p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-400 transition-colors" title="Delete">
                                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Dropzone */}
            {/* <div className="border-2 border-dashed border-neutral-800 hover:border-primary/40 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-primary/30 flex items-center justify-center mb-3 transition-colors">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-neutral-400 text-sm font-medium">Drop files here or <span className="text-primary">browse</span></p>
                <p className="text-neutral-600 text-xs mt-1">Supports PDF, JPG, PNG up to 20MB</p>
            </div> */}
        </div>
    );
}
