import getElementByXPath from "./getElementByXPath"
import removeHighlight from "./removeHighlight"
import setHighlight from "./setHighlight"

const focusElement = (xPath: string) => {
  const element = getElementByXPath(xPath)
  if (element) {
    element.focus()
    element.scrollIntoView({
      behavior: "smooth",
      block: "center"
    })
    setHighlight(element)
    setTimeout(() => {
      removeHighlight(element)
    }, 700)
  }
}

export default focusElement
