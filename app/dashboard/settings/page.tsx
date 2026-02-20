"use client";

import React, { useState } from 'react';
import { Bell, Lock, Volume2, Globe } from 'lucide-react';

type Settings = {
    notifications: boolean;
    emailUpdates: boolean;
    darkMode: boolean;
    twoFactor: boolean;
    soundEnabled: boolean;
    languagePreference: string;
};

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>({
        notifications: true,
        emailUpdates: true,
        darkMode: true,
        twoFactor: false,
        soundEnabled: true,
        languagePreference: 'English',
    });

    const handleToggle = (key: keyof Settings) => {
        setSettings((prev) => {
            const value = prev[key];
            if (typeof value === 'boolean') {
                return { ...prev, [key]: !value } as Settings;
            }
            return prev;
        });
    };

    return (
        <div className="px-8 pt-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-neutral-400">Manage your account preferences</p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-4">
                {/* Notifications */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                                <Bell className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Notifications</h3>
                                <p className="text-neutral-500 text-sm">Receive alerts and updates</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle('notifications')}
                            className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                                settings.notifications ? 'bg-primary' : 'bg-neutral-800'
                            }`}
                        >
                            <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                    settings.notifications ? 'translate-x-7' : 'translate-x-1'
                                } mt-1`}
                            />
                        </button>
                    </div>
                </div>

                {/* Email Updates */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                                <Bell className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Email Updates</h3>
                                <p className="text-neutral-500 text-sm">Get notified via email</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle('emailUpdates')}
                            className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                                settings.emailUpdates ? 'bg-primary' : 'bg-neutral-800'
                            }`}
                        >
                            <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                    settings.emailUpdates ? 'translate-x-7' : 'translate-x-1'
                                } mt-1`}
                            />
                        </button>
                    </div>
                </div>

                {/* Sound */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                                <Volume2 className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Sound Effects</h3>
                                <p className="text-neutral-500 text-sm">Enable notification sounds</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle('soundEnabled')}
                            className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                                settings.soundEnabled ? 'bg-primary' : 'bg-neutral-800'
                            }`}
                        >
                            <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                    settings.soundEnabled ? 'translate-x-7' : 'translate-x-1'
                                } mt-1`}
                            />
                        </button>
                    </div>
                </div>

                {/* Two Factor Auth */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                                <Lock className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Two-Factor Authentication</h3>
                                <p className="text-neutral-500 text-sm">Secure your account</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle('twoFactor')}
                            className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                                settings.twoFactor ? 'bg-primary' : 'bg-neutral-800'
                            }`}
                        >
                            <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                    settings.twoFactor ? 'translate-x-7' : 'translate-x-1'
                                } mt-1`}
                            />
                        </button>
                    </div>
                </div>

                {/* Language */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                                <Globe className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Language</h3>
                                <p className="text-neutral-500 text-sm">Choose your preferred language</p>
                            </div>
                        </div>
                        <select
                            value={settings.languagePreference}
                            onChange={(e) =>
                                setSettings((prev) => ({
                                    ...prev,
                                    languagePreference: e.target.value,
                                }))
                            }
                            className="bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded-lg outline-none"
                        >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                        </select>
                    </div>
                </div>

                {/* Save Button */}
                <button className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors mt-6">
                    Save Settings
                </button>
            </div>
        </div>
    );
}
