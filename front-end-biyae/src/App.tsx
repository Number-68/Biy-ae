import "./App.css";
import { ChatBoxContainer } from "./ChatBoxContainer";
import { InputBoxContainer } from "./TextInputContainer";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* big container */}
      <ChatBoxContainer />
      <InputBoxContainer />
    </>
  );
}

export default App;
