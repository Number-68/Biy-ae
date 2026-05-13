// import chatExample from "./test-chat.json";

import { useState, useEffect } from "react";

// import type
interface Message {
  id: number;
  role: string;
  message: string;
}

export function ChatBoxContainer() {
  // set the useState object to messages and setMessages
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/TotalChat")
      .then((res) => res.json())
      .then((history) => setMessages(history))
      .catch((err) => console.error("Error loading history:", err));
  }, []);

  console.log(
    "this is the messages: " +
      messages +
      " and here is the setmessages: " +
      setMessages,
  );

  const fullMessageDOM = messages
    .sort((a, b) => a.id - b.id)
    .map((msg) => {
      const messageClass = msg.role === "User" ? "user-box" : "biyae-box";

      return (
        <div key={msg.id} className={`message ${messageClass}`}>
          <p>{msg.role}:</p>
          <p className="message-content">{msg.message}</p>
        </div>
      );
    });

  // updaters
  // another will be getting most recent chat message. basically.

  return (
    <section id="chat-box-container">
      {/* 
        <div className="biyae-box"></div>
        <div className="user-box"></div> 
        */}
      {fullMessageDOM}
    </section>
  );
}
