import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./screens/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Modal from "./Modal";
import { useState } from "react";
import DetailedCart from "./screens/DetailedCart";
import Orders from "./screens/Orders";
function App() {
  const [searchText, setSearchText] = useState("");

  const handleSearchFromNavbar = (data) => {
    setSearchText(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            index
            element={
              <>
                <Navbar onSearch={handleSearchFromNavbar} />
                <Home searchText={searchText} />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar onSearch={handleSearchFromNavbar} />
                <Home searchText={searchText} />
                <Modal>
                  <Login />
                </Modal>
              </>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <>
                <Navbar onSearch={handleSearchFromNavbar} />
                <Home searchText={searchText} />
                <Modal>
                  <Signup />
                </Modal>
              </>
            }
          ></Route>
          <Route
            path="/mycart"
            element={<DetailedCart />}
          />
          <Route
            path="/orders"
            element={<Orders/>}
          />
        </Routes>
        <Footer />
      </header>
    </div>
  );
}

export default App;
