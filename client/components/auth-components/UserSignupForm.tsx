'use client';

import { useState } from 'react';
import { EmailStep } from './signup-components/EmailStep';
import { OtpStep } from './signup-components/OtpStep';
import { UsernameStep } from './signup-components/UsernameStep';
import { CompleteStep } from './signup-components/CompleteStep';
import { motion } from 'framer-motion';

export function UserSignupForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const steps = [
    { number: 1, label: 'Email' },
    { number: 2, label: 'Verify' },
    { number: 3, label: 'Username' },
    { number: 4, label: 'Complete' },
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-3 sm:px-4">
      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <div className="flex justify-between items-center relative gap-1 sm:gap-2">
          {/* Progress Line */}
          <div className="absolute left-0 right-0 top-4 h-0.5 bg-border -z-10">
            <motion.div
              className="h-full bg-green-600"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center gap-1.5 min-w-0">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm transition-all ${
                  step >= s.number
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                    : 'bg-card border-2 border-border text-muted-foreground'
                }`}
              >
                {s.number}
              </div>
              <span
                className={`text-[10px] sm:text-xs font-medium ${
                  step >= s.number ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl w-full min-w-0"
      >
        {step === 1 && (
          <EmailStep
            onSuccess={(email) => {
              setEmail(email);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <OtpStep email={email} onSuccess={() => setStep(3)} onBack={() => setStep(1)} />
        )}

        {step === 3 && (
          <UsernameStep
            onSuccess={(username) => {
              setUsername(username);
              setStep(4);
            }}
          />
        )}

        {step === 4 && <CompleteStep username={username} />}
      </motion.div>
    </div>
  );
}

export default UserSignupForm;
