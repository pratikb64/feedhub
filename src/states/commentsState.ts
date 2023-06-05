import type { Models } from "appwrite"
import { createStore } from "zustand"
import type { CommentDocument } from "~utils/types"

const commentsState = createStore<CommentsState>((set, get) => ({
  comments: undefined,
  setComments: (comments) => {
    set({ comments })
  }
}))

interface CommentsState {
  comments: Models.DocumentList<CommentDocument> | undefined
  setComments: (comments: Models.DocumentList<CommentDocument>) => void
}

export default commentsState
