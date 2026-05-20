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
  // messages is what you use to read the component. It is automatically updated when you apply
  // Apply changes to setMessages -> use messages to output.

  // useEffect application - here, it only calls once when the entire component is rendered for
  // the first time
  useEffect(() => {
    fetch("http://localhost:8000/TotalChat") // send and await promise -- fetch is always async
      // -- promise is a class -- object.
      // gives all sorts of class specific methods to it.
      .then((res) => res.json()) // once promise fulfilled, flow continues to .then() -- .then()
      // continues the async flow for code. just helper to encapsulate
      // logic that must be encapsulated
      .then((history) => setMessages(history)) // first block
      // (variable container representing data.) => the logic.
      .catch((err) => console.error("Error loading history:", err)); // .catch() error handles. blatantly.
  }, []);

  // debug messages
  console.log("this is the messages: " + messages);

  // dissect messages and apply as html.
  const fullMessageDOM = messages
    .sort((a, b) => a.id - b.id) // order by id, chronologically.
    .map((msg) => {
      const messageClass = msg.role === "User" ? "user-box" : "biyae-box"; // every scan through array checks.

      return (
        //every loop, export DOM.
        <div key={msg.id} className={`message ${messageClass}`}>
          <p>{msg.role}:</p>
          <p className="message-content">{msg.message}</p>
        </div>
      ); // continuously adds elements -- one long line of similar <div> elements
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
