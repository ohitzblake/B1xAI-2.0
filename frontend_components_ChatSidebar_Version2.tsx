import React from 'react';

interface Props {
  history: {id: string, prompt: string, response: string, outputType: string}[];
  onSelect: (id: string) => void;
  selectedId: string;
}

const ChatSidebar: React.FC<Props> = ({ history, onSelect, selectedId }) => (
  <aside className="w-64 bg-gray-900 text-white h-full flex flex-col">
    <h2 className="font-bold p-4 border-b border-gray-700">Chats</h2>
    <div className="flex-1 overflow-y-auto">
      {history.map(msg => (
        <button
          key={msg.id}
          className={`block text-left w-full px-4 py-2 hover:bg-gray-800 ${
            selectedId === msg.id ? 'bg-gray-800 font-bold' : ''
          }`}
          onClick={() => onSelect(msg.id)}
        >
          {msg.prompt.substring(0, 32)}...
        </button>
      ))}
    </div>
  </aside>
);

export default ChatSidebar;