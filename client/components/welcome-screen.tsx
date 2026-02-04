"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function WelcomeScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-between p-6 bg-[#FAFAF9] dark:bg-[#111827] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-20%] w-150 h-150 bg-[#0F766E]/10 rounded-full blur-[120px]" />

      {/* 1. The Brand (Center) */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 space-y-6">
        <div className="w-24 h-24 bg-linear-to-br from-[#0F766E] to-[#115E59] rounded-3xl shadow-2xl flex items-center justify-center transform rotate-3">
          <span className="text-5xl">🪐</span>
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Batiyoun
          </h1>
          <p className="text-lg text-gray-500 max-w-62.5">
            Speak freely. Your space, your frequency.
          </p>
        </div>
      </div>

      {/* 2. The Actions (Bottom Thumb Zone) */}
      <div className="w-full space-y-4 z-10 mb-8">
        <Button asChild className="w-full h-14 text-lg rounded-2xl bg-[#0F766E] hover:bg-[#0D6E66] shadow-lg shadow-[#0F766E]/20">
          <Link href="/signup">Get Started</Link>
        </Button>
        
        <Button asChild variant="ghost" className="w-full h-14 text-lg rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Link href="/login">I already have an account</Link>
        </Button>
      </div>
    </div>
  );
}