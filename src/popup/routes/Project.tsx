import { useParams } from "react-router-dom"
import Comment from "~components/Comment"
import ProjectLayout from "~components/ProjectLayout"

const Project = () => {
  const { project_id } = useParams()
  return (
    <ProjectLayout>
      <div className="p-4">
        <Comment />
      </div>
    </ProjectLayout>
  )
}

export default Project
