import { ChatBoxContainer } from "./ChatBoxContainer";
import { InputBoxContainer } from "./TextInputContainer";

import { useState } from "react";

export function ChatComponents() {
  // so here, we're going to get the input box to send back the input. it's goign to trigger the function here,
  // and then it's going to send it to the server, and also, send it to thechat box container.

  // define the function here.
  const [isWaiting, setIsWaiting] = useState(false);

  //send the message
  const sendMessage = async (input) => {
    //do not send empty messages
    if (!input.trim()) return;

    // prepare message into json
    const jsonMessage = JSON.stringify({ message: input });

    try {
      setIsWaiting(true);
      const response = await fetch("http://localhost:8000/NewMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonMessage,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    // setInput("");
    setIsWaiting(false);
  };

  return (
    <>
      <ChatBoxContainer />
      <InputBoxContainer onSend={sendMessage} disabled={isWaiting} />
      {/* remidner; props can be used to send things bilaterally but they do it differently. 
        from parent to child, it can be done by just setting the variables
        from child to parent, the child sends information to the parent through the function that hte parent makes available to the child. */}
    </>
  );
}
