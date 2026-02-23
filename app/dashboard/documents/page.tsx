"use client";

import React from 'react';
import { FileText, Upload, Trash2 } from 'lucide-react';

const documents = [
    {
        id: 1,
        name: 'Blood Report Analysis.pdf',
        date: 'Feb 15, 2026',
        size: '2.4 MB',
        type: 'Medical Report'
    },
    {
        id: 2,
        name: 'Prescription - Dr. Smith.pdf',
        date: 'Feb 10, 2026',
        size: '1.2 MB',
        type: 'Prescription'
    },
    {
        id: 3,
        name: 'Lab Test Results.pdf',
        date: 'Feb 5, 2026',
        size: '3.1 MB',
        type: 'Lab Report'
    },
];

export default function DocumentsPage() {
    return (
        <div className=" px-8 pt-8 space-y-6 ">
            {/* Header with Upload */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
                    <p className="text-neutral-400">Manage your medical documents and reports</p>
                </div>
            </div>

            {/* Documents List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {documents.map((doc) => (
                    <div key={doc.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-800 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                                <div className="p-3 bg-primary/20 rounded-lg">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold">{doc.name}</h3>
                                    <p className="text-neutral-500 text-sm mt-1">{doc.type}</p>
                                    <div className="flex items-center gap-2 mt-3 text-xs text-neutral-400">
                                        <span>{doc.date}</span>
                                        <span>•</span>
                                        <span>{doc.size}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors text-neutral-400 hover:text-red-400">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
