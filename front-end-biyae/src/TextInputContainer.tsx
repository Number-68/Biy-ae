import { useState } from "react";

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
    setInput("");
  };
  return (
    <section id="text-input">
      {/* todo: make it so that when overflow happens, it pushes upwards and doesn't 
          go downwards */}

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {/* small random happensance. when entering nothing, it still sends. ensure to clear up that so that we don't have any blank inputs. */}

      <button type="submit">send!</button>
    </section>
  );
}
