import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [datetime, setDatetime] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, datetime }),
    });

    if (res.ok) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="p-4 text-center space-y-4">
        <h2 className="text-xl font-bold">Booking Confirmed!</h2>
        <p>Check your email for the meeting link and calendar invite.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      {step === 1 && <Step1 form={form} onChange={handleChange} onNext={() => setStep(2)} />}
      {step === 2 && (
        <Step2
          datetime={datetime}
          onChange={setDatetime}
          onNext={() => setStep(3)}
          onPrev={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3
          form={form}
          datetime={datetime}
          onPrev={() => setStep(2)}
          onSubmit={submit}
        />
      )}
    </div>
  );
}
