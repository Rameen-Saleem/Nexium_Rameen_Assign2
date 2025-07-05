'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [urdu, setUrdu] = useState('');
  const [fullText, setFullText] = useState('');
  const [urduFull, setUrduFull] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/summarize', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    if (!res.ok) {
      alert('API error: ' + res.status);
      return;
    }
    const data = await res.json();
    setSummary(data.summary);
    setUrdu(data.urdu);
    setFullText(data.fullText);
    setUrduFull(data.urduFull);
    alert("Summary saved!");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Blog Summariser</h1>
        <Input
          placeholder="Enter blog URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleSubmit} className="w-full py-2 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg mb-6 transition">Summarise</Button>
        {summary && (
          <div className="w-full mt-4">
            <h2 className="text-xl font-bold mb-2 text-gray-800 border-b pb-1">Summary</h2>
            <div className="bg-gray-100 rounded-lg p-4 mb-4 text-gray-700 whitespace-pre-line">{typeof summary === 'string' ? summary : JSON.stringify(summary)}</div>
            <h2 className="text-xl font-bold mb-2 text-gray-800 border-b pb-1">Urdu Translation</h2>
            <div className="bg-green-50 rounded-lg p-4 text-gray-800 whitespace-pre-line font-[Noto Nastaliq Urdu],serif">{typeof urdu === 'string' ? urdu : JSON.stringify(urdu)}</div>
          </div>
        )}
      </div>
    </main>
  );
}
