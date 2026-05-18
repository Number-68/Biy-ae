import { useState, useRef } from "react";
// useState: Local Storing of data
// useRef:

export function InputBoxContainer() {
  // define handlers
  const [input, setInput] = useState("");
  // input is result
  // setInput is function to modify.

  // textareaRef define
  const textareaRef = useRef<HTMLTextAreaElement>(null); // empty until fulfilled.

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  //send the message
  const sendMessage = async () => {
    //do not send empty messages
    if (!input.trim()) return;

    const jsonMessage = JSON.stringify({ message: input });

    try {
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

      const data = await response.json(); // if your API returns JSON
      console.log("Success:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setInput("");
  };

  // auto resize.
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      //variable -- current variable -- varirable style -- height == set height.
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      // if reaches a certain threshold, enable scroll.
    }
  };
  return (
    <section id="text-input">
      {/* todo: make it so that when overflow happens, it pushes upwards and doesn't 
          go downwards 
          might need to change the whole organization of the dom if I want this to be cleaner. 
          instead of having the chat box and text input on the same line, we could make textinput
          above and have it hang so that its size is not contained by the top part, y'know?
          */}

      <textarea //reminder -- JSX
        ref={textareaRef} // ref = special prop. attaches to textareaRef with this specific DOM Element
        value={input}
        onChange={(e) => {
          // check if change. every change triggers a check.
          // e can be anything depending on prop.
          // in this instance, it sends the event, in which we can target the value with method flags
          setInput(e.target.value);
          autoResize();
        }}
        onKeyDown={handleKeyDown}
        style={{ resize: "none", overflow: "hidden" }}
        placeholder="Type your message here..."
      />

      <button onClick={sendMessage}>send!</button>
    </section>
  );
}
