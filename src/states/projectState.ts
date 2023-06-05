import type { Models } from "appwrite"
import { createStore } from "zustand"
import type { Project } from "~utils/types"

const projectState = createStore<ProjectState>((set, get) => ({
  isProductFetching: true,
  activeProject: undefined,
  setActiveProject: (project) => {
    set({ activeProject: project })
  },
  setIsProductFetching: (state) => {
    set({ isProductFetching: state })
  }
}))

interface ProjectState {
  isProductFetching: boolean
  activeProject?: Models.Document & Project
  setActiveProject: (project?: Models.Document & Project) => void
  setIsProductFetching: (state: boolean) => void
}

export default projectState
