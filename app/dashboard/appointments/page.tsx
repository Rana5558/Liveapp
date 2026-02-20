"use client";

import React from 'react';
import { Calendar, Clock, User, MapPin, Video, Phone } from 'lucide-react';

const appointments = [
    {
        id: 1,
        doctorName: 'Dr. Sarah Mitchell',
        specialty: 'Gastroenterologist',
        date: 'Feb 20, 2026',
        time: '10:00 AM',
        type: 'Video Call',
        status: 'Upcoming'
    },
    {
        id: 2,
        doctorName: 'Dr. James Wilson',
        specialty: 'General Physician',
        date: 'Feb 18, 2026',
        time: '2:30 PM',
        type: 'In-Person',
        status: 'Confirmed'
    },
    {
        id: 3,
        doctorName: 'Dr. Emma Davis',
        specialty: 'Nutritionist',
        date: 'Feb 25, 2026',
        time: '11:00 AM',
        type: 'Phone Call',
        status: 'Scheduled'
    },
];

export default function AppointmentsPage() {
    return (
        <div className=" px-8 pt-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">My Appointments</h1>
                <p className="text-neutral-400">View and manage your scheduled appointments</p>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
                {appointments.map((apt) => (
                    <div key={apt.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-800 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-white font-semibold text-lg">{apt.doctorName}</h3>
                                <p className="text-neutral-400 text-sm">{apt.specialty}</p>
                            </div>
                            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                                {apt.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2 text-neutral-400">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{apt.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-400">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">{apt.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-400">
                                {apt.type === 'Video Call' && <Video className="w-4 h-4" />}
                                {apt.type === 'Phone Call' && <Phone className="w-4 h-4" />}
                                {apt.type === 'In-Person' && <MapPin className="w-4 h-4" />}
                                <span className="text-sm">{apt.type}</span>
                            </div>
                            <button className="ml-auto px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
