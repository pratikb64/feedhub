export default function setHighlight(element: HTMLElement | null) {
  if (element) {
    element.style.backgroundColor = "rgba(51,153,255,0.6)"
    element.style.boxShadow = "rgb(51,153,255) 0px 0px 0px 1px"
  }
}
