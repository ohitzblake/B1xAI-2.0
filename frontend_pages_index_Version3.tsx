import React, { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatMessage from '../components/ChatMessage';
import PromptBar from '../components/PromptBar';

interface ChatEntry {
  id: string;
  prompt: string;
  response: string;
  outputType: string;
}

export default function Home() {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selected = history.find(h => h.id === selectedId) ?? history[history.length - 1];

  const handleSend = async (prompt: string, outputType: string) => {
    setLoading(true);
    const id = Date.now().toString();
    setHistory(h => [
      ...h,
      { id, prompt, response: '', outputType }
    ]);
    setSelectedId(id);

    // Call API
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, outputType })
      });
      const data = await res.json();
      setHistory(h =>
        h.map(msg =>
          msg.id === id ? { ...msg, response: data.code ?? data.error ?? 'Error.' } : msg
        )
      );
    } catch (e) {
      setHistory(h =>
        h.map(msg =>
          msg.id === id ? { ...msg, response: 'Network error.' } : msg
        )
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar
        history={history}
        onSelect={setSelectedId}
        selectedId={selected?.id || ''}
      />
      <main className="flex-1 flex flex-col bg-gray-50">
        <div className="flex-1 overflow-y-auto p-8">
          {selected ? (
            <>
              <ChatMessage message={{ role: 'user', content: selected.prompt }} />
              <ChatMessage message={{ role: 'assistant', content: selected.response }} />
              {selected.response && (
                <button
                  className="mt-3 bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={() => {
                    const blob = new Blob([selected.response], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${selected.outputType}-project.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Download Code
                </button>
              )}
            </>
          ) : (
            <div className="text-gray-400 text-lg">Start a new chat!</div>
          )}
        </div>
        <PromptBar onSend={handleSend} loading={loading} />
      </main>
    </div>
  );
}