import type { Models } from "appwrite"
import { createStore } from "zustand"
import type { Project } from "~utils/types"

const drawerState = createStore<DrawerState>((set, get) => ({
  isVisible: false,
  activeProject: undefined,
  toggle: () => set({ isVisible: !get().isVisible }),
  setActiveProject: (project) => {
    set({ activeProject: project })
  }
}))

interface DrawerState {
  isVisible: boolean
  activeProject?: Models.Document & Project
  setActiveProject: (project?: Models.Document & Project) => void
  toggle: () => void
}

export default drawerState
