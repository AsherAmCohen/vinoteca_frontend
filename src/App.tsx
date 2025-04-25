import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Vinoteca } from "./pages/home/vinoteca";
import { SingIn } from "./pages/sign-in/sign-in";
import { SignUp } from "./pages/sign-up/sign-up";
import { User } from "./pages/user/user";
import { UserInformation } from "./pages/user/information/user-information";
import { UserAddress } from "./pages/user/address/user-address";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Vinoteca />} />
        <Route path="/SignIn" element={<SingIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/user" element={<User/>}>
          <Route index element={<UserInformation/>}/>
          <Route path="address" element={<UserAddress/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
