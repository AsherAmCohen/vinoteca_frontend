import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Vinoteca } from "./pages/vinoteca";
import { SingIn } from "./components/sign-in/sign-in";
import { SignUp } from "./components/sign-up/sign-up";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Vinoteca />} />
        <Route path="/SignIn" element={<SingIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
