const observeUrlChange = (callback: (arg: string) => void) => {
  let oldHref = document.location.href
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href
        callback(window.location.pathname)
      }
    })
  })
  observer.observe(document.body, { childList: true, subtree: true })
  return observer
}

export default observeUrlChange
