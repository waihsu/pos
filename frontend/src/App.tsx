import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import Tables from "./components/Tables";
import EditMenuCateogry from "./components/EditMenuCategory";
import EditAddonCategories from "./components/EditAddonCategories";
import EditAddon from "./components/EditAddon";

const options = [
  { id: 1, name: "la-phet-tote" },
  { id: 2, name: "shan-khout-swell" },
];

function App() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <Layout>
        <SearchBar options={options} defaultValue={[options[0]]} />

        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/menu-categories" element={<MenuCategories />} />
            <Route path="/menu-categories/:id" element={<EditMenuCateogry />} />
            <Route path="/addons" element={<Addons />} />
            <Route path="/addons/:id" element={<EditAddon />} />
            <Route path="/addon-categories" element={<AddonCategories />} />
            <Route
              path="/addon-categories/:id"
              element={<EditAddonCategories />}
            />
            <Route path="/locations" element={<Locations />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route
            path="/login"
            element={!accessToken ? <Login /> : <Navigate to={"/"} />}
          />

          <Route
            path="/register"
            element={!accessToken ? <Register /> : <Navigate to={"/"} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
