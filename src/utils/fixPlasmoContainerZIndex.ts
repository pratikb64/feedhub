const fixPlasmoContainerZIndex = (element: HTMLDivElement | null) => {
  if (element) {
    let found = false
    let currentElement = null
    currentElement = element
    while (!found) {
      if (currentElement) {
        if (currentElement.id == "plasmo-shadow-container") {
          currentElement.style.zIndex = "9999"
          found = true
        } else {
          currentElement = currentElement.parentElement
        }
      }
    }
  }
}

export default fixPlasmoContainerZIndex
