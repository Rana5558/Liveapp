"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
    Mail,
    Phone,
    MapPin,
    Edit2,
    Camera,
    Briefcase,
    GraduationCap,
    Clock,
    Globe,
    Shield,
    Award,
    Save,
    X,
} from "lucide-react";

/* ═══════════════════ MAIN PAGE ═══════════════════ */

export default function ProfilePage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);

    const doctorName = user?.name || "Maya Sinclair";
    const doctorEmail = user?.email || "maya.sinclair@liveclinic.com";

    return (
        <div className="p-3 sm:p-4 md:p-6 min-h-screen bg-slate-50 space-y-4 sm:space-y-5">

            {/* ── Top Profile Card ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Cover Banner */}
                <div className="h-24 sm:h-32 md:h-40 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-60" />
                </div>

                {/* Avatar + Info */}
                <div className="px-3 sm:px-5 md:px-8 pb-4 sm:pb-6 -mt-12 sm:-mt-14 md:-mt-16 relative">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4 md:gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor"
                                    alt="Doctor profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isEditing && (
                                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-lg shadow-md flex items-center justify-center hover:bg-primary/90 transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Name & role */}
                        <div className="flex-1 pb-0.5 sm:pb-1">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">{doctorName}</h2>
                            <p className="text-sm text-gray-500">General Practitioner</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Active
                                </span>
                                <span className="text-xs text-gray-400">Member since Jan 2021</span>
                            </div>
                        </div>

                        {/* Edit button */}
                        <div className="sm:ml-auto">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${isEditing
                                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    : "bg-primary text-white hover:bg-primary/90 shadow-primary/25"
                                    }`}
                            >
                                {isEditing ? (
                                    <><X className="w-4 h-4" /> Cancel</>
                                ) : (
                                    <><Edit2 className="w-4 h-4" /> Edit Profile</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Info Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">

                {/* Left Column: Personal Info */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-5">

                    {/* Personal Information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-5 md:p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" />
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue={doctorName}
                                    disabled={!isEditing}
                                    className={`w-full mt-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${isEditing
                                        ? "bg-white border-gray-200 text-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                        : "bg-gray-50 border-gray-100 text-gray-600"
                                        }`}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email Address</label>
                                <div className={`flex items-center gap-2 mt-1.5 px-4 py-2.5 rounded-xl border text-sm transition-colors ${isEditing
                                    ? "bg-white border-gray-200"
                                    : "bg-gray-50 border-gray-100"
                                    }`}>
                                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <input
                                        type="email"
                                        defaultValue={doctorEmail}
                                        disabled={!isEditing}
                                        className="flex-1 bg-transparent text-gray-600 font-medium outline-none"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Phone Number</label>
                                <div className={`flex items-center gap-2 mt-1.5 px-4 py-2.5 rounded-xl border text-sm transition-colors ${isEditing
                                    ? "bg-white border-gray-200"
                                    : "bg-gray-50 border-gray-100"
                                    }`}>
                                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <input
                                        type="tel"
                                        defaultValue="+1 234 567 8900"
                                        disabled={!isEditing}
                                        className="flex-1 bg-transparent text-gray-600 font-medium placeholder-gray-300 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Location</label>
                                <div className={`flex items-center gap-2 mt-1.5 px-4 py-2.5 rounded-xl border text-sm transition-colors ${isEditing
                                    ? "bg-white border-gray-200"
                                    : "bg-gray-50 border-gray-100"
                                    }`}>
                                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <input
                                        type="text"
                                        defaultValue="San Francisco, CA"
                                        disabled={!isEditing}
                                        className="flex-1 bg-transparent text-gray-600 font-medium placeholder-gray-300 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Language */}
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Language</label>
                                <div className={`flex items-center gap-2 mt-1.5 px-4 py-2.5 rounded-xl border text-sm transition-colors ${isEditing
                                    ? "bg-white border-gray-200"
                                    : "bg-gray-50 border-gray-100"
                                    }`}>
                                    <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <input
                                        type="text"
                                        defaultValue="English, Spanish"
                                        disabled={!isEditing}
                                        className="flex-1 bg-transparent text-gray-600 font-medium placeholder-gray-300 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Date of Birth</label>
                                <input
                                    type="text"
                                    defaultValue="March 15, 1985"
                                    disabled={!isEditing}
                                    className={`w-full mt-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${isEditing
                                        ? "bg-white border-gray-200 text-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                        : "bg-gray-50 border-gray-100 text-gray-600"
                                        }`}
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex justify-end mt-6">
                                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm shadow-primary/25 transition-all duration-200">
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Professional Information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-5 md:p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-primary" />
                            Professional Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Specialization */}
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Specialization</label>
                                <input
                                    type="text"
                                    defaultValue="General Practitioner"
                                    disabled={!isEditing}
                                    className={`w-full mt-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${isEditing
                                        ? "bg-white border-gray-200 text-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                        : "bg-gray-50 border-gray-100 text-gray-600"
                                        }`}
                                />
                            </div>

                            {/* License Number */}
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">License Number</label>
                                <input
                                    type="text"
                                    defaultValue="MD-2021-00458"
                                    disabled={!isEditing}
                                    className={`w-full mt-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${isEditing
                                        ? "bg-white border-gray-200 text-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                        : "bg-gray-50 border-gray-100 text-gray-600"
                                        }`}
                                />
                            </div>

                            {/* Years of Experience */}
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Years of Experience</label>
                                <div className={`flex items-center gap-2 mt-1.5 px-4 py-2.5 rounded-xl border text-sm transition-colors ${isEditing
                                    ? "bg-white border-gray-200"
                                    : "bg-gray-50 border-gray-100"
                                    }`}>
                                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <input
                                        type="text"
                                        defaultValue="12 Years"
                                        disabled={!isEditing}
                                        className="flex-1 bg-transparent text-gray-600 font-medium outline-none"
                                    />
                                </div>
                            </div>

                            {/* Hospital / Clinic */}
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Hospital / Clinic</label>
                                <div className={`flex items-center gap-2 mt-1.5 px-4 py-2.5 rounded-xl border text-sm transition-colors ${isEditing
                                    ? "bg-white border-gray-200"
                                    : "bg-gray-50 border-gray-100"
                                    }`}>
                                    <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <input
                                        type="text"
                                        defaultValue="Live Health Clinic"
                                        disabled={!isEditing}
                                        className="flex-1 bg-transparent text-gray-600 font-medium outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar cards */}
                <div className="lg:col-span-1 space-y-4 sm:space-y-5">

                    {/* Education & Certifications */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-primary" />
                            Education
                        </h3>
                        <div className="space-y-3">
                            {[
                                { degree: "MD, Medicine", school: "Stanford University", year: "2009 - 2013" },
                                { degree: "Residency, Internal Medicine", school: "UCSF Medical Center", year: "2013 - 2016" },
                                { degree: "Fellowship, Family Medicine", school: "Mayo Clinic", year: "2016 - 2018" },
                            ].map((edu, i) => (
                                <div
                                    key={i}
                                    className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 hover:border-primary/20 transition-colors"
                                >
                                    <p className="text-sm font-semibold text-gray-700">{edu.degree}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{edu.school}</p>
                                    <p className="text-xs text-primary font-medium mt-0.5">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            Certifications
                        </h3>
                        <div className="space-y-2.5">
                            {[
                                { name: "Board Certified - Family Medicine", issued: "American Board of FM" },
                                { name: "Advanced Cardiac Life Support", issued: "AHA" },
                                { name: "Pediatric Advanced Life Support", issued: "AHA" },
                            ].map((cert, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">{cert.name}</p>
                                        <p className="text-xs text-gray-400">{cert.issued}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="text-sm font-bold text-gray-800 mb-4">Quick Stats</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Total Patients", value: "1,248", color: "text-primary" },
                                { label: "This Month", value: "87", color: "text-emerald-600" },
                                { label: "Avg. Rating", value: "4.8", color: "text-amber-500" },
                                { label: "Consultations", value: "3,450", color: "text-blue-600" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-gray-50/80 rounded-xl p-3 text-center border border-gray-100">
                                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mt-0.5">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
