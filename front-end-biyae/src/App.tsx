import { useState } from "react";
import "./App.css";
import { ChatBoxContainer } from "./ChatBoxContainer";

function App() {
  // const [count, setCount] = useState(0);

  // todo;where i last ended off
  // I'mgoingto just build all of the components right now. and then style later. next, we have to do the header nav, and then the conversation history pullout. that should be it, I think?
  // after, we can style things, by the end of this week, we should be staritng the backend.

  // avoid force reload upon form submission.

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
    <>
      {/* big container */}
      <ChatBoxContainer />
      <section id="text-input">
        {/* todo: make it so that when overflow happens, it pushes upwards and doesn't 
          go downwards */}

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button type="submit">send!</button>
      </section>

      {/* last ended off: do integratoin test for the text area input. clear 
      and print out to console the text that was in it just for
       validation. etc */}
    </>
  );
}

export default App;
