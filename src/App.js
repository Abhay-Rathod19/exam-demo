import "./App.css";
import { Message } from "./containers/Message";
import { UserRoutes } from "./routes/userRoutes";

function App() {


  return (
    <div className="main-container">
      <Message />
      <UserRoutes />
    </div>
  );
}

export default App;