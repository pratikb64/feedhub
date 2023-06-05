export default function removeHighlight(element: HTMLElement | null) {
  if (element) {
    element.style.backgroundColor = ""
    element.style.boxShadow = ""
  }
}
