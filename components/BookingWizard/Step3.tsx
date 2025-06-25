import React from 'react';

interface Props {
  form: { name: string; email: string; message: string };
  datetime: string;
  onPrev: () => void;
  onSubmit: () => void;
}

export default function Step3({ form, datetime, onPrev, onSubmit }: Props) {
  return (
    <div className="space-y-4">
      <p>
        <strong>Name:</strong> {form.name}
      </p>
      <p>
        <strong>Email:</strong> {form.email}
      </p>
      <p>
        <strong>Message:</strong> {form.message}
      </p>
      <p>
        <strong>Date:</strong> {new Date(datetime).toLocaleString()}
      </p>
      <div className="flex justify-between">
        <button onClick={onPrev} className="px-4 py-2 rounded border">Back</button>
        <button onClick={onSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
          Confirm
        </button>
      </div>
    </div>
  );
}
