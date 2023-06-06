import { Permission, Query, Role, type Models } from "appwrite"
import projectState from "~states/projectState"
import type { Comment, CommentDocument } from "~utils/types"
import useDatabase from "./useDatabase"

const useComments = () => {
  const { createDocument, getDocumentList, deleteDocument } = useDatabase()
  const { activeProject } = projectState.getState()

  const allComments = async () => {
    if (activeProject) {
      const comments = (await getDocumentList({
        collectionId: "comments",
        queries: [Query.equal("project", [activeProject.$id])]
      })) as Models.DocumentList<CommentDocument>
      return comments
    } else throw new Error('Active project not found in "useComments" hook')
  }

  const addComment = async (data: Comment) => {
    if (activeProject) {
      const comment = await createDocument({
        collectionId: "comments",
        data,
        permissions: [
          Permission.read(Role.team(activeProject.teamId)),
          Permission.delete(Role.team(activeProject.teamId, "owner"))
        ]
      })
      return comment
    } else throw new Error('Active project not found in "useComments" hook')
  }

  const deleteComment = async ({ commentId }: { commentId: string }) => {
    if (activeProject) {
      const comment = await deleteDocument({
        collectionId: "comments",
        documentId: commentId
      })
      return comment
    } else throw new Error('Active project not found in "useComments" hook')
  }

  return { addComment, allComments, deleteComment }
}

export default useComments