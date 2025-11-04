import React from "react";

const contacts = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
];

function ChatList() {
  return (
    <div className="w-full max-w-xs bg-slate-900 p-4 rounded-md">
      <h2 className="text-xl font-bold text-slate-200 mb-4">Chats</h2>
      <ul className="space-y-2">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="cursor-pointer p-2 rounded-md text-slate-200 hover:bg-slate-700"
          >
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
