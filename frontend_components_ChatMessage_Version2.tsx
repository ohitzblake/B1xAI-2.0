import React from 'react';

function formatCodeBlocks(text: string) {
  // Simple Markdown code block formatter
  const regex = /```([a-z]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let result: React.ReactNode[] = [];
  let match;
  let idx = 0;

  while ((match = regex.exec(text)) !== null) {
    const [full, lang, code] = match;
    result.push(<span key={idx++}>{text.slice(lastIndex, match.index)}</span>);
    result.push(
      <pre key={idx++} className="bg-gray-200 p-2 rounded overflow-x-scroll mb-2">
        <code>{code}</code>
      </pre>
    );
    lastIndex = match.index + full.length;
  }
  result.push(<span key={idx++}>{text.slice(lastIndex)}</span>);
  return result;
}

interface Props {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
}

const ChatMessage: React.FC<Props> = ({ message }) => (
  <div className={`my-2 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-xl p-3 rounded-lg shadow ${
        message.role === 'user'
          ? 'bg-blue-600 text-white self-end'
          : 'bg-gray-100 text-gray-900 self-start'
      }`}
      style={{whiteSpace: 'pre-wrap'}}
    >
      {formatCodeBlocks(message.content)}
    </div>
  </div>
);

export default ChatMessage;