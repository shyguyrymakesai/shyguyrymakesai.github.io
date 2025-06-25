import React, { useState } from 'react';

export default function ChatDemo({ agentId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: 'user', text: input }]);
    const userInput = input;
    setInput('');
    let reply = '';
    try {
      let res;
      if (agentId === 'will') {
        res = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await res.json();
        reply = `${data.setup} ${data.punchline}`;
      } else if (agentId === 'ava') {
        res = await fetch('https://zenquotes.io/api/random');
        const data = await res.json();
        reply = `${data[0].q} - ${data[0].a}`;
      } else {
        res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        reply = data.slip.advice;
      }
    } catch (err) {
      reply = 'Oops, something went wrong. This is just a demo.';
    }
    setMessages((m) => [...m, { from: 'bot', text: reply }]);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50 max-w-2xl mx-auto space-y-3">
      <div className="h-64 overflow-y-auto space-y-2 bg-white p-2 rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm p-2 rounded-md max-w-[80%] ${msg.from === 'user' ? 'ml-auto bg-blue-100' : 'mr-auto bg-gray-200'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="flex-grow border rounded px-2 py-1 text-sm"
          placeholder="Say something..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}

