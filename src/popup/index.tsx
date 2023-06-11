import { Toaster } from "react-hot-toast"
import { MemoryRouter } from "react-router-dom"

import Routing from "~popup/routes"

function IndexPopup() {
  return (
    <MemoryRouter>
      <Routing />
      <Toaster position="bottom-center" />
    </MemoryRouter>
  )
}

export default IndexPopup
