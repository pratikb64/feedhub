import { Route, Routes } from "react-router-dom"

import "~styles/styles.css"

import Home from "./Home"
import Login from "./Login"
import Register from "./Register"

const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Routes>
)

export default Routing