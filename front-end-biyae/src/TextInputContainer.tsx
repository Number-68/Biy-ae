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
  const sendMessage = () => {
    console.log(input);
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
