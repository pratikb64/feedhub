export default function getElementByXPath(xpath: string): HTMLElement | null {
  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  )
  const element = result.singleNodeValue as HTMLElement
  return element
}
