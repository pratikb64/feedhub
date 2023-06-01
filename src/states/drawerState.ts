import { createStore } from "zustand"

const drawerState = createStore<DrawerState>((set, get) => ({
  isVisible: false,
  toggle: () => set({ isVisible: !get().isVisible })
}))

interface DrawerState {
  isVisible: boolean
  toggle: () => void
}

export default drawerState
