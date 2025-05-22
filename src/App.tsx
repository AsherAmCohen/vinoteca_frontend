import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Vinoteca } from "./pages/home/vinoteca";
import { SingIn } from "./pages/sign-in/sign-in";
import { SignUp } from "./pages/sign-up/sign-up";
import { UserLayout } from "./pages/user/user";
import { UserInformation } from "./pages/user/information/user-information";
import { UserOrders } from "./pages/user/orders/user-orders";
import { Wine } from "./pages/user/wine/wine";
import { WineList } from "./pages/user/wine/list/wine-list";
import { WineMark } from "./pages/user/wine/mark/wine-mark";
import { WineCategory } from "./pages/user/wine/category/wine-category";
import { PrivateRoute } from "./routes/private-route";
import { AuthProvider } from "./auth-context";
import { PublicRoute } from "./routes/public-route";
import { HomeRoute } from "./routes/home-route";
import { Modal } from './components/user/modal.tsx'
import { User } from "./pages/user/user/user.tsx";
import { UserList } from "./pages/user/user/list/user-list.tsx";
import { UserRole } from "./pages/user/user/role/user-role.tsx";
import { VerifyEmail } from "./pages/token/verify-token.tsx";

const App = () => {
  return (
    <AuthProvider>
      <Modal />
      <Router>
        <Routes>
          <Route path='/verify-email' element={<VerifyEmail />}/>
          
          <Route element={<HomeRoute />}>
            <Route path="/" element={<Vinoteca />} />
          </Route>

          {/* Rutas que comprueban el estado de inicio de sesión */}
          <Route element={<PublicRoute />}>
            <Route path="/SignIn" element={<SingIn />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Route>

          {/* Rutas protegitas */}
          <Route element={<PrivateRoute />}>
            <Route path="/user" element={<UserLayout />}>
              {/* Información del usuario */}
              <Route index element={<UserInformation />} />
              {/* Ordenes */}
              <Route path="orders" element={<UserOrders />} />
              <Route path="wine" element={<Wine />}>
                <Route index element={<WineList />} />
                <Route path="mark" element={<WineMark />} />
                <Route path="category" element={<WineCategory />} />
              </Route>

              {/* Usuarios */}
              <Route path="user" element={<User />}>
                <Route index element={<UserList />} />
                <Route path="role" element={<UserRole />} />
              </Route>

            </Route>

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
