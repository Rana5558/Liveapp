"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

import {
  Stethoscope,
  Apple,
  FileText,
  Calendar,
  MessageSquare,
  Brain,
  ChevronRight,
} from 'lucide-react';

const problems = [
  {
    id: 'medical',
    icon: Stethoscope,
    title: 'Explain Medical Condition',
    description: "I'm having vomiting Sensation",
  },
  {
    id: 'diet',
    icon: Apple,
    title: 'Need Diet Plan',
    description: 'I want you to plan my diet for weight loss',
  },
  {
    id: 'report',
    icon: FileText,
    title: 'Scan Report',
    description: 'Scan my blood report & suggest me cure...',
  },
  {
    id: 'appointment',
    icon: Calendar,
    title: 'Schedule Appointment',
    description: 'Schedule appointment with stomach expert',
  },
  {
    id: 'chat',
    icon: MessageSquare,
    title: 'Live Chat With Doctor',
    description: 'Schedule an online consultation with doctor',
  },
  {
    id: 'health',
    icon: Brain,
    title: 'Predict My Health',
    description: 'Predict my health condition',
  },
];

export default function OnboardingPage() {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    // Here we could persist the selectedProblem to user preferences
    router.push('/dashboard/home');
  };

  const handleSkip = () => {
    router.push('/dashboard/home');
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 md:ml-12">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Image
              src="/images/mainlogo2.png"
              alt="LiVE Logo"
              width={100}
              height={32}
              priority
              className="object-contain"
            />
          </div>
        </div>

        <button onClick={handleSkip} className="text-neutral-400 hover:text-neutral-200 transition-colors">
          ✕
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-3xl space-y-6">
          {/* Header Text */}
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold text-primary">Get Started</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              How would you describe your problem?
            </h1>
            <p className="text-neutral-400 text-base max-w-2xl mx-auto">
              You can describe your health issues or scan your prescriptions, reports, medicines and more
            </p>
          </div>

          {/* Problem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {problems.map((problem) => {
              const IconComponent = problem.icon as React.ComponentType<{ className?: string }>;
              const isSelected = selectedProblem === problem.id;

              return (
                <button
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left hover:border-primary group ${isSelected ? 'border-primary bg-primary/10' : 'border-neutral-700 bg-neutral-900 hover:bg-neutral-800'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-neutral-800 text-neutral-400 group-hover:text-primary'
                        }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mt-2 text-sm">{problem.title}</h3>
                  <p className="text-neutral-500 text-xs mt-1">{problem.description}</p>
                </button>
              );
            })}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <button onClick={handleSkip} className="px-4 py-2 text-neutral-300 hover:text-white transition-colors font-semibold text-sm">
              Skip & Chat
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-md flex items-center gap-2 transition-all duration-200 shadow-md shadow-primary/10 text-sm"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-800 px-4 py-4 text-center text-[11px] text-neutral-500">
        <p>
          Free Research Preview. Alive.ai may produce inaccurate information about people, places, or facts.
         <span className="text-primary cursor-pointer hover:text-primary/90">Alive.ai Version 2.0</span>
        </p>
      </div>
    </div>
  );
}
