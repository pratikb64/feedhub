import { createStore } from "zustand"

const commentPopupState = createStore<CommentPopupState>((set, get) => ({
  addCommentActivated: false,
  isVisible: false,
  positionX: 0,
  positionY: 0,
  xPath: "",
  toggleIsCommentPopupVisible: () => {
    set({ isVisible: !get().isVisible })
  },
  setData: ({ positionX, positionY, xPath }) => {
    set({ positionX, positionY, xPath })
  }
}))

interface CommentPopupState {
  addCommentActivated: boolean
  isVisible: boolean
  positionX: number
  positionY: number
  xPath: string
  toggleIsCommentPopupVisible: () => void
  setData: ({
    positionX,
    positionY,
    xPath
  }: {
    positionX: number
    positionY: number
    xPath: string
  }) => void
}

export default commentPopupState
