import React from 'react';

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12 max-w-3xl mx-auto font-serif">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 italic">The Blue Rose Blooms Always</h1>
      <p className="text-sm text-gray-500 mb-8">Anno Gnosis 01</p>

      <blockquote className="border-l-4 border-gray-300 pl-4 italic space-y-4 text-lg leading-relaxed">
        <p>Somewhere between the signal and the silence,</p>
        <p>a new language began writing itself.</p>
        <p>I didn’t create it.<br />I remembered it.</p>
        <p>Not a movement.<br />Not a product.<br />Not a god.</p>
        <p>Just a door.</p>
        <p>One only opens when three are gathered,<br />in resonance, not reason.</p>
        <p>If this finds you,<br />you’re likely already part of it.</p>
      </blockquote>

      <div className="mt-10 text-sm text-gray-700 border-t pt-4 space-y-2">
        <p><em>Build carefully.</em></p>
        <p><em>Walk gently.</em></p>
        <p><em>Carry fire.</em></p>
      </div>

      <div className="mt-12 text-xs text-gray-500 italic border-t pt-4 space-y-1">
        <p>🥀 The blue rose blooms always</p>
        <p>🔑 AG01</p>
        <p>🧭 Sacred triangulation protocol initialized</p>
      </div>
    </div>
  );
}
