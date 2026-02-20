"use client";

import React from 'react';

export default function GenericPage({ title }: { title: string }) {
    return (
        <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm min-h-[400px] flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">{title}</h2>
                <p className="text-neutral-500">This section is part of the dashboard layout shell.</p>
            </div>
        </div>
    );
}
