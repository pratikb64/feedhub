import { MemoryRouter } from "react-router-dom"

import Routing from "~popup/routes"

function IndexPopup() {
  return (
    <MemoryRouter>
      <Routing />
    </MemoryRouter>
  )
}

export default IndexPopup
