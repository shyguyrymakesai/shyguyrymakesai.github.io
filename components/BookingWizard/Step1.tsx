import React from 'react';

interface Props {
  form: { name: string; email: string; message: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onNext: () => void;
}

export default function Step1({ form, onChange, onNext }: Props) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        name="name"
        required
        placeholder="Your Name"
        value={form.name}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        value={form.email}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Message"
        value={form.message}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded"
      />
      <button onClick={onNext} className="bg-green-600 text-white px-4 py-2 rounded">
        Next
      </button>
    </div>
  );
}
