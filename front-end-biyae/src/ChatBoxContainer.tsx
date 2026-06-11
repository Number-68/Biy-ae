// import chatExample from "./test-chat.json";

import { useEffect, useRef } from "react";
// useState - for local storing of data for UI components. you could use sessionStorage but that means you would need to
// manually update the component. that's what useState was designed for. however, it's not persistent through pages,
// which you could apply both methods to maintain persistent data upon pages or page loads.
// -----------------------------------
// useEffect - from my understanding: useEffect is used for logic that isn't managed by react.
// useEffect has broad usages? basically just a huge adaptor for outside components that would otherwise cause react to acts weird.
// in our situation, we use it to run the fetch for loading the entire chat for the first time upon first render.

export function ChatBoxContainer({ messages }) {
  // debug messages
  //console.log("this is the messages: " + messages);

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

  // auto scrolling when messages updates
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  // an idea of style. do i want it to present the text as scrolling animation? that would be cool.
  // or should I just appear it immediately and set the scroll to the top of the model's message?
  // we'll figure it out another time

  return (
    <section id="chat-box-container" ref={chatContainerRef}>
      {/* 
        <div className="biyae-box"></div>
        <div className="user-box"></div> 
        */}
      {fullMessageDOM}
    </section>
  );
}
