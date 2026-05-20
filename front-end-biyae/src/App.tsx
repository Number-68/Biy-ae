import "./App.css";
import { ChatComponents } from "./ChatComponents";

function App() {
  // const [count, setCount] = useState(0);

  // plan: move all logic to around Here because it needs to be albe to be modiied from here
  // what needs to be done
  // move logic into here, so that we can update what is said in inputbox into ChatBoxContainer.
  // then when we can, we also add the logic that updates all of the things necessarily here, y'know?
  // just perhaps, we could make anotehr container that encapsulates all of these two? but that's probably adding a bit
  // of uncessary layering.
  // we will thin about it.

  return (
    <>
      {/* big container */}
      <ChatComponents />
    </>
  );
}

export default App;
