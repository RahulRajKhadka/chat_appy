import { useState, useRef, useEffect } from "react";

export const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How are you?", time: "10:00 AM", sender: "other" },
    { id: 2, text: "I'm good, thanks! How about you?", time: "10:01 AM", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom whenever new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle message send
  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "me",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Chat Application</h1>
      </header>

      {/* Chat messages */}
      <main className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-3 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span
                className={`text-xs block mt-1 ${
                  msg.sender === "me" ? "text-gray-200" : "text-gray-500"
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Input area */}
      <footer className="bg-white p-4 border-t">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPage;
