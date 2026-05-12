import "./App.css";

// import chatExample from "./test-chat.json";

// import type
// interface Message {
//   id: number;
//   role: string;
//   message: string;
// }

function App() {
  // const [count, setCount] = useState(0);

  // todo;where i last ended off
  // I'mgoingto just build all of the components right now. and then style later. next, we have to do the header nav, and then the conversation history pullout. that should be it, I think?
  // after, we can style things, by the end of this week, we should be staritng the backend.

  // avoid force reload upon form submission.

  // const messages = chatExample as Message[];

  // logic.
  // opens .json. and scans through it chronologicall.
  // each ID pass, it looks at user.
  // determin class name based off user.
  // print the "message" into the div into the chat-box-container.
  // keep looping until the end?

  return (
    <>
      {/* big container */}

      <section id="chat-box-container">
        {/* section of chat containers multiple.
        right and left.  
        just examples for now*/}

        {/* <div className="biyae-box">
        </div>
        <div className="user-box">
        </div> */}
      </section>
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
