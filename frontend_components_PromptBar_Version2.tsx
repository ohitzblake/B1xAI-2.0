import React, { useState } from 'react';

interface Props {
  onSend: (prompt: string, outputType: string) => void;
  loading: boolean;
}

const PromptBar: React.FC<Props> = ({ onSend, loading }) => {
  const [prompt, setPrompt] = useState('');
  const [outputType, setOutputType] = useState('website');

  return (
    <form
      className="flex gap-2 p-4 border-t"
      onSubmit={e => {
        e.preventDefault();
        onSend(prompt, outputType);
        setPrompt('');
      }}
    >
      <select
        className="rounded border p-2"
        value={outputType}
        onChange={e => setOutputType(e.target.value)}
      >
        <option value="website">Website</option>
        <option value="minecraft-mod">Minecraft Mod (Java)</option>
        <option value="unity-mod">Unity Mod (C#)</option>
        <option value="other">Other</option>
      </select>
      <input
        className="flex-1 rounded border p-2"
        placeholder="Send a message (e.g. 'Make a simple Minecraft mod')"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        disabled={loading}
        required
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
        type="submit"
        disabled={loading || !prompt}
      >
        {loading ? '...' : 'Send'}
      </button>
    </form>
  );
};

export default PromptBar;