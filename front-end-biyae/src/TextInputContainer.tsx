import { useState, useRef } from "react";

export function InputBoxContainer() {
  // define handlers
  const [input, setInput] = useState("");

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
    //for now, log it to console.
    // for later, we use this to send to api.
    setInput("");
  };

  // auto resize
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  return (
    <section id="text-input">
      {/* todo: make it so that when overflow happens, it pushes upwards and doesn't 
          go downwards */}

      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          autoResize();
        }}
        onKeyDown={handleKeyDown}
        style={{ resize: "none", overflow: "hidden" }}
        placeholder="Type your message here..."
      />
      {/* small random happensance. when entering nothing, it still sends. ensure to clear up that so that we don't have any blank inputs. */}

      <button type="submit" onClick={sendMessage}>
        send!
      </button>
    </section>
  );
}
