import React, { useState } from 'react';

interface Props {
  onSubmit: (prompt: string, outputType: string) => void;
}

const PromptForm: React.FC<Props> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [outputType, setOutputType] = useState('website');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(prompt, outputType);
      }}
      className="flex flex-col gap-2"
    >
      <textarea
        className="border rounded p-2"
        placeholder="Describe what you want (e.g., 'Make a Minecraft mod to add a custom sword')"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        rows={3}
        required
      />
      <select
        value={outputType}
        onChange={e => setOutputType(e.target.value)}
        className="border rounded p-2"
      >
        <option value="website">Website</option>
        <option value="minecraft-mod">Minecraft Mod (Java)</option>
        <option value="unity-mod">Unity Mod (C#)</option>
        <option value="other">Other</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white rounded py-2">
        Generate Code
      </button>
    </form>
  );
};

export default PromptForm;