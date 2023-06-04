export default function getXPath(element: Node): string {
  if (element && element.nodeType === Node.ELEMENT_NODE) {
    const elementNode = element as Element
    if (elementNode.id) {
      // If the element has an ID, use it to create a unique XPath
      return `id("${elementNode.id}")`
    } else {
      // Build the XPath by traversing the DOM from the given element
      let xpath = ""
      let currentElement: Element | null = elementNode
      while (currentElement) {
        let position = 0
        let sibling = currentElement.previousSibling
        while (sibling) {
          // Count the preceding siblings with the same tag name
          if (
            sibling.nodeType === Node.ELEMENT_NODE &&
            sibling.nodeName === currentElement.nodeName
          ) {
            position++
          }
          sibling = sibling.previousSibling
        }
        // Generate the XPath segment for the current element
        const tagName = currentElement.nodeName.toLowerCase()
        const index = position > 0 ? `[${position + 1}]` : ""
        xpath = `/${tagName}${index}${xpath}`
        currentElement = currentElement.parentElement
      }
      return xpath
    }
  } else {
    return ""
  }
}
