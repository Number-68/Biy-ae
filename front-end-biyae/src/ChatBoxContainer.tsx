// import chatExample from "./test-chat.json";

import { useState, useEffect } from "react";
// useState - for local storing of data for UI components. you could use sessionStorage but that means you would need to
// manually update the component. that's what useState was designed for. however, it's not persistent through pages,
// which you could apply both methods to maintain persistent data upon pages or page loads.
// -----------------------------------
// useEffect - from my understanding: useEffect is used for logic that isn't managed by react.
// useEffect has broad usages? basically just a huge adaptor for outside components that would otherwise cause react to acts weird.
// in our situation, we use it to run the fetch for loading the entire chat for the first time upon first render.

// import type
interface Message {
  id: number;
  role: string;
  message: string;
}

export function ChatBoxContainer() {
  // set the useState object to messages and setMessages
  const [messages, setMessages] = useState<Message[]>([]);
  // messages is what you use to read the component. It is automatically updated when you apply something to setMessages
  // setMessages is what you use to apply new data to your useState object. Apply changes to setMessages -> use messages to output.
  // they are connected.

  // useEffect application - here, it only calls once when the entire component is rendered for the first time?
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
