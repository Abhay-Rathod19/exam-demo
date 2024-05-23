import { Stack } from "@mui/material";
import "./App.css";
import { UserSignup } from "./presentation/UserSignup";
import { UserAction } from "./presentation/UserAction";
import { UserForgotPass } from "./presentation/UserForgotPass";
import { UserNewPass } from "./presentation/UserNewPass";

function App() {
  return (
    <div className="main-container">
      <Stack spacing={5} direction="column">
        <UserSignup />
        <UserAction actionType="Log in" />
        <UserForgotPass />
        <UserNewPass />
      </Stack>
    </div>
  );
}

export default App;
