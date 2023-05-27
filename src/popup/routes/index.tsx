import { Route, Routes } from "react-router-dom"

import "~styles/styles.css"

import Home from "./Home"
import Login from "./Login"

const Routing = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/" element={<Home />} />
  </Routes>
)

export default Routing
