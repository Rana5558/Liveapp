"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CreditCard, CheckCircle2, Download, ChevronLeft, ChevronRight } from "lucide-react";

const showComingSoon = (action: string) => {
  alert(`${action} feature is coming soon!`);
};

const invoices = [
  { id: "#487441", date: "Dec 7, 2024", plan: "Premium", amount: "$59.00" },
  { id: "#653518", date: "Nov 7, 2024", plan: "Standard", amount: "$29.00" },
  { id: "#267400", date: "Oct 7, 2024", plan: "Premium", amount: "$59.00" },
  { id: "#651535", date: "Sep 7, 2024", plan: "Premium", amount: "$59.00" },
  { id: "#449003", date: "Aug 7, 2024", plan: "Premium", amount: "$59.00" },
  { id: "#558612", date: "Jul 7, 2024", plan: "Premium", amount: "$59.00" },
];

const planBenefits = [
  "Unlimited AI Health Consultations",
  "Priority Doctor Appointment Booking",
  "Advanced Report & Prescription Analysis",
  "24/7 Emergency AI Support",
];

export default function PlanBilling() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Plan + Card — stacked on mobile, 2-col on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Current Plan */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4 sm:space-y-5">
          <div>
            <p className="text-neutral-400 text-xs font-semibold uppercase tracking-widest mb-1">Current Plan</p>
            <div className="flex items-center gap-2">
              <span className="text-white text-xl sm:text-2xl font-bold">Premium</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Active</span>
            </div>
            <p className="text-neutral-500 text-sm mt-1">Billed monthly, cancel anytime.</p>
          </div>

          <div className="space-y-2">
            {planBenefits.map((b) => (
              <div key={b} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">{b}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 pt-1">
            <button
              onClick={() => showComingSoon("Change plan")}
              className="flex-1 xs:flex-none px-4 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all shadow shadow-primary/20"
            >
              Change Plan
            </button>
            <button
              onClick={() => showComingSoon("Cancel subscription")}
              className="flex-1 xs:flex-none px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white font-semibold rounded-xl text-sm transition-all border border-neutral-700"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Next Invoice + Payment Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4 sm:space-y-5">
          <div>
            <p className="text-neutral-400 text-xs font-semibold uppercase tracking-widest mb-1">Next Invoice</p>
            <p className="text-primary text-2xl sm:text-3xl font-bold">$59.00</p>
            <p className="text-neutral-500 text-sm mt-1">Due on Mar 28, 2026</p>
            <button
              onClick={() => showComingSoon("Payment gateway")}
              className="mt-3 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all shadow shadow-primary/20 w-full sm:w-auto"
            >
              Pay Now →
            </button>
          </div>

          <div className="border-t border-neutral-800 pt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-neutral-400 text-sm font-medium">Payment Card</p>
              <button
                onClick={() => showComingSoon("Edit payment method")}
                className="text-primary text-xs font-semibold hover:text-primary/80 flex items-center gap-1"
              >
                <CreditCard className="w-3.5 h-3.5" />
                Edit Card
              </button>
            </div>
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <Image src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" width={36} height={24} className="object-contain" />
                <span className="text-neutral-400 text-xs">Expires 12/29</span>
              </div>
              <p className="text-white text-sm sm:text-base font-mono tracking-widest">6714 **** **** ****</p>
              <p className="text-neutral-400 text-sm mt-1">Esther Howard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table — scrollable on mobile */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
        <h3 className="text-white font-bold text-sm sm:text-base">Invoice History</h3>
        <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left py-2.5 px-3 text-neutral-500 font-semibold text-xs uppercase tracking-widest">#ID</th>
                <th className="text-left py-2.5 px-3 text-neutral-500 font-semibold text-xs uppercase tracking-widest">Date</th>
                <th className="text-left py-2.5 px-3 text-neutral-500 font-semibold text-xs uppercase tracking-widest">Plan</th>
                <th className="text-left py-2.5 px-3 text-neutral-500 font-semibold text-xs uppercase tracking-widest">Amount</th>
                <th className="py-2.5 px-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="py-3 px-3 text-neutral-400 font-mono text-xs sm:text-sm">{inv.id}</td>
                  <td className="py-3 px-3 text-neutral-300 text-xs sm:text-sm">{inv.date}</td>
                  <td className="py-3 px-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {inv.plan}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-white font-semibold text-xs sm:text-sm">{inv.amount}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => showComingSoon("Download invoice")}
                      className="p-1.5 hover:bg-neutral-700 rounded-lg text-neutral-500 hover:text-white transition-colors"
                      title="Download invoice"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 pt-3 border-t border-neutral-800">
          <span className="text-neutral-500 text-xs">Showing 1 – 6 of 18 invoices</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${currentPage === p ? "bg-primary text-white" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
              >
                {String(p).padStart(2, "0")}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
              disabled={currentPage === 3}
              className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
