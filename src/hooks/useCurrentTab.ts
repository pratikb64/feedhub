import { useState } from "react"

const useCurrentTab = () => {
  const [tab, setTab] = useState<chrome.tabs.Tab | null>(null)
  const [currentTabData, setCurrentTabData] = useState({
    hostname: "",
    pathname: ""
  })
  chrome?.tabs
    .query({ active: true })
    .then((tabs) => {
      let tab = tabs[0]
      setTab(tab)
      let url
      if (tab.url) {
        url = new URL(tab.url)
        setCurrentTabData({
          hostname: url.hostname,
          pathname: url.pathname
        })
      }
    })
    .catch(() => setTab(null))
  return { tab, currentTabData }
}

export default useCurrentTab
