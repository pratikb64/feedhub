import type { Models } from "appwrite"
import { createStore } from "zustand"
import type { Project } from "~utils/types"

const projectState = createStore<ProjectState>((set, get) => ({
  isProductFetching: true,
  activeProject: undefined,
  showSettings: false,
  setActiveProject: (project) => {
    set({ activeProject: project })
  },
  setIsProductFetching: (state) => {
    set({ isProductFetching: state })
  },
  toggleShowSettings: () => {
    set({ showSettings: !get().showSettings })
  }
}))

interface ProjectState {
  isProductFetching: boolean
  activeProject?: Models.Document & Project
  showSettings: boolean
  setActiveProject: (project?: Models.Document & Project) => void
  setIsProductFetching: (state: boolean) => void
  toggleShowSettings: () => void
}

export default projectState
