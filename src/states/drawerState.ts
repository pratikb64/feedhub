import { createStore } from "zustand"

const drawerState = createStore<DrawerState>((set, get) => ({
  isVisible: false,
  toggleIsDrawerVisible: () => set({ isVisible: !get().isVisible })
}))

interface DrawerState {
  isVisible: boolean
  toggleIsDrawerVisible: () => void
}

export default drawerState
