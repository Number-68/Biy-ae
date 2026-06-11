import { ChatBoxContainer } from "./ChatBoxContainer";
import { InputBoxContainer } from "./TextInputContainer";

import { useState, useEffect } from "react";

// import type
interface Message {
  id: number;
  role: string;
  message: string;
}

export function ChatComponents() {
  // so here, we're going to get the input box to send back the input. it's goign to trigger the function here,
  // and then it's going to send it to the server, and also, send it to thechat box container.

  // define the function here.
  const [isWaiting, setIsWaiting] = useState(false);

  //send the message
  const sendMessage = async (input) => {
    console.log("waiting for response");
    //do not send empty messages
    if (!input.trim()) return;

    // prepare message into json
    const jsonMessage = JSON.stringify({ message: input });
    // adding new userchat to print on chat box.
    // create message container to fit inside messages array.
    // eslint-disable-next-line react-hooks/purity
    const tempId = Date.now(); // to fix impure function calling.
    const newMessage = { id: tempId, role: "User", message: input };
    displayMessage(newMessage);

    try {
      console.log("waiting true");
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

    console.log("waiting done");

    // unfinished. we have to kinda parse the infrmation into a container that fits the interface.
    // so make a small little container when you come back.
    displayMessage(newMessage);
    setIsWaiting(false);
  };

  // for displaying messages
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

  // todo, add function to auto scroll the page down so that the user doesn't have to do that when
  // new messages are added.

  // where we last ended off:
  // first, we have to fix up the process of when we're getting the AI response, we have to show it immediatly too.
  // next. after that, whenever there is a response at all, we should kinda force the page to scroll down to follow it.
  // that's the next two things that we can kinda figure out right now.
  // after we get proof of concept, we are going to start cleaning up and organizing the code.
  // because this is a bit of a travesty.
  // not to mention change the order of which the UI updates. cause there's no way we're making the user wait for the whole process to finish
  // before printing out the user's message.
  // i think this needs a whole refractor for more dynamic work.

  console.log("Current messages:", messages); //debugging

  // to make it more dynamic. I am going to seperate the function for displaying the new message since both user and biyae needs it.
  const displayMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <>
      <ChatBoxContainer messages={messages} />
      <InputBoxContainer onSend={sendMessage} disabled={isWaiting} />
      {/* remidner; props can be used to send things bilaterally but they do it differently. 
        from parent to child, it can be done by just setting the variables
        from child to parent, the child sends information to the parent through the function that hte parent makes available to the child. */}
    </>
  );
}
