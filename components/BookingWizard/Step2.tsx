import React, { useEffect, useState } from 'react';

interface Props {
  datetime: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2({ datetime, onChange, onNext, onPrev }: Props) {
  const [unavailable, setUnavailable] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => setUnavailable(data.map((b: any) => b.datetime)));
  }, []);

  const isDisabled = (value: string) => unavailable.includes(value);

  return (
    <div className="space-y-4">
      <input
        type="datetime-local"
        value={datetime}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />
      {datetime && isDisabled(datetime) && (
        <p className="text-red-600">Selected time unavailable</p>
      )}
      <div className="flex justify-between">
        <button onClick={onPrev} className="px-4 py-2 rounded border">Back</button>
        <button
          onClick={onNext}
          disabled={!datetime || isDisabled(datetime)}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
