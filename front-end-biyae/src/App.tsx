import "./App.css";
import { ChatBoxContainer } from "./ChatBoxContainer";

function App() {
  // const [count, setCount] = useState(0);

  // todo;where i last ended off
  // I'mgoingto just build all of the components right now. and then style later. next, we have to do the header nav, and then the conversation history pullout. that should be it, I think?
  // after, we can style things, by the end of this week, we should be staritng the backend.

  // avoid force reload upon form submission.

  return (
    <>
      {/* big container */}
      <ChatBoxContainer />
      <section id="text-input">
        {/* todo: make it so that when overflow happens, it pushes upwards and doesn't 
          go downwards */}
        <textarea></textarea>

        <button type="submit"></button>
      </section>
    </>
  );
}

export default App;
