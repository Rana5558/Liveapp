"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Mail, Phone, MapPin, User, Edit2 } from 'lucide-react';

export default function ProfilePage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className=" px 8 pt-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
                    <p className="text-neutral-400">Manage your personal information</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                    <Edit2 className="w-5 h-5" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
                <div className="flex items-start gap-8">
                    {/* Avatar */}
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-neutral-800 overflow-hidden border-4 border-primary/20">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Patient"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {isEditing && (
                            <button className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded-lg transition-colors">
                                Change Photo
                            </button>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="text-neutral-400 text-sm">Name</label>
                            <input
                                type="text"
                                value={user?.name || 'Maya Sinclair'}
                                disabled={!isEditing}
                                className={`w-full mt-2 px-4 py-3 rounded-lg border transition-colors ${
                                    isEditing
                                        ? 'bg-neutral-800 border-neutral-700 text-white'
                                        : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                                }`}
                            />
                        </div>

                        <div>
                            <label className="text-neutral-400 text-sm">Email</label>
                            <div className="flex items-center gap-3 mt-2 px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                                <Mail className="w-5 h-5 text-neutral-500" />
                                <input
                                    type="email"
                                    value={user?.email || 'maya@example.com'}
                                    disabled={!isEditing}
                                    className="flex-1 bg-transparent text-neutral-300 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-neutral-400 text-sm">Phone</label>
                            <div className="flex items-center gap-3 mt-2 px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                                <Phone className="w-5 h-5 text-neutral-500" />
                                <input
                                    type="tel"
                                    placeholder="+1 234 567 8900"
                                    disabled={!isEditing}
                                    className="flex-1 bg-transparent text-neutral-300 placeholder-neutral-600 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-neutral-400 text-sm">Location</label>
                            <div className="flex items-center gap-3 mt-2 px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                                <MapPin className="w-5 h-5 text-neutral-500" />
                                <input
                                    type="text"
                                    placeholder="City, Country"
                                    disabled={!isEditing}
                                    className="flex-1 bg-transparent text-neutral-300 placeholder-neutral-600 outline-none"
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <button className="w-full mt-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors">
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
