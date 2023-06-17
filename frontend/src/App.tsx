import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

import Login from "./components/Login";
import Register from "./components/Register";

import Settings from "./components/Settings";
import Order from "./components/Order";
import Menus from "./components/Menus";
import MenuCategories from "./components/MenuCategories";
import Addons from "./components/Addons";
import AddonCategories from "./components/AddonCategories";

import Layout from "./components/Layout";
import PrivateRoute from "./routes/Test";
import Locations from "./components/Locations";

function App() {
  console.log("App");
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" Component={Home} />
            <Route path="/orders" element={<Order />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/menu-categories" element={<MenuCategories />} />
            <Route path="/addons" element={<Addons />} />
            <Route path="/addon-categories" element={<AddonCategories />} />
            <Route path="/locations" Component={Locations} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
