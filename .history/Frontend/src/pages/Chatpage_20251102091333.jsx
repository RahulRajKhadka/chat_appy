import { useState } from "react";

export const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-1 overflow-auto bg-white p-4 rounded-lg shadow mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 p-2 bg-blue-100 rounded-lg">{msg}</div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition">
          Send
        </button>
      </form>
    </div>
  );
};
