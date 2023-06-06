import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useStore } from "zustand"
import Comment from "~components/Comment"
import LoadingScreen from "~components/LoadingScreen"
import ProjectLayout from "~components/ProjectLayout"
import useComments from "~hooks/useComments"
import commentsState from "~states/commentsState"

const Project = () => {
  const { project_id } = useParams()
  const { syncComments } = useComments()
  const { comments } = useStore(commentsState)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    syncComments().then(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <ProjectLayout>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col gap-4 p-4">
          {comments?.documents.map((comment) => (
            <Comment data={comment} key={comment.$id} />
          ))}
        </div>
      )}
    </ProjectLayout>
  )
}

export default Project
