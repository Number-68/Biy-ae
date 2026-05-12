import chatExample from "./test-chat.json";

// import type
interface Message {
  id: number;
  role: string;
  message: string;
}

export function ChatBoxContainer() {
  const messages = chatExample as Message[];

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

  return (
    <section id="chat-box-container">
      {/* section of chat containers multiple.
        right and left.  
        just examples for now*/}

      {/* <div className="biyae-box">
        </div>
        <div className="user-box">
        </div> */}

      {fullMessageDOM}
      {/* todo: clean all of this up. encapsluate it outside of return for cleanliness. */}
    </section>
  );
}
