import { useState } from "react"

const useCurrentTab = () => {
  const [tab, setTab] = useState<chrome.tabs.Tab | null>(null)
  const [data, setData] = useState({
    url: "",
    pathname: ""
  })
  chrome.tabs
    .query({ active: true })
    .then((tabs) => {
      let tab = tabs[0]
      setTab(tab)
      let url
      if (tab.url) {
        url = new URL(tab.url)
        url.pathname
        setData({
          url: url.hostname,
          pathname: url.pathname
        })
      }
    })
    .catch(() => setTab(null))
  return { tab, data }
}

export default useCurrentTab
