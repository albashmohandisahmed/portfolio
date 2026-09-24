"use client";

import { useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [inquiryType, setInquiryType] = useState<string>("Full-Time Position");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const name = String(formData.get("name") ?? "");

    if (email.includes("@") && name.length >= 2) {
      setState("success");
    } else {
      setState("error");
    }
  }

  const inquiryOptions = [
    "Full-Time Position",
    "BI Dashboard Development",
    "ETL / Data Pipeline",
    "Consulting / Freelance",
  ];

  return (
    <form
      onSubmit={submit}
      className="p-6 sm:p-8 rounded-3xl border border-cyan-400/30 bg-slate-900/90 backdrop-blur-2xl shadow-2xl space-y-6"
    >
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-mono font-bold text-cyan-300 mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Direct Inquiry Form</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Send Ahmed a Message
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Have an open data analyst role or dashboard project? Fill out the form below.
        </p>
      </div>

      {/* Inquiry Type Select Pills */}
      <div>
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
          Inquiry Type
        </label>
        <div className="flex flex-wrap gap-2">
          {inquiryOptions.map((opt) => {
            const isSelected = inquiryType === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setInquiryType(opt)}
                className={`rounded-full border px-3 py-1.5 text-xs font-mono font-medium transition-all ${
                  isSelected
                    ? "border-cyan-400 bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,217,255,0.4)]"
                    : "border-white/10 bg-slate-950/60 text-slate-300 hover:border-cyan-400/40 hover:text-white"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Name and Email Input Fields */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            <User className="h-3.5 w-3.5 text-cyan-400" />
            <span>Your Name</span>
          </label>
          <input
            name="name"
            required
            placeholder="e.g. Sarah Jenkins"
            className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60 transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            <Mail className="h-3.5 w-3.5 text-cyan-400" />
            <span>Email Address</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="e.g. sarah@company.com"
            className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60 transition"
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
          <span>Project Brief or Position Details</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell Ahmed about the position, dataset, or dashboard requirements..."
          className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60 transition"
        />
      </div>

      {/* Form Submission Controls */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <MagneticButton type="submit">
          <span className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Send Inquiry</span>
          </span>
        </MagneticButton>

        {state === "success" && (
          <div className="p-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-pulse">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>Message validated! Ahmed will reply shortly.</span>
          </div>
        )}

        {state === "error" && (
          <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-mono">
            <span>Please enter a valid name and email address.</span>
          </div>
        )}
      </div>
    </form>
  );
}
