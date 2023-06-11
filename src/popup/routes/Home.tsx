import type { Models } from "appwrite"
import { useEffect, useState } from "react"
import { RiAddFill } from "react-icons/ri"
import Layout from "~components/Layout"
import ProjectItem from "~components/ProjectItem"
import useCurrentTab from "~hooks/useCurrentTab"
import useDatabase from "~hooks/useDatabase"
import useFunctions from "~hooks/useFunctions"
import type { ProjectDocument } from "~utils/types"

const Home = () => {
  const { currentTabData } = useCurrentTab()
  const [isLoading, setIsLoading] = useState(false)
  const { fn } = useFunctions()
  const { getDocumentList } = useDatabase()
  const [projects, setProjects] =
    useState<Models.DocumentList<Models.Document>>()

  const clickHandler = async () => {
    setIsLoading(true)
    await fn("create-project", {
      domain: currentTabData?.hostname
    })
    await getProjects()
    setIsLoading(false)
  }

  const getProjects = async () => {
    const projects = await getDocumentList({
      collectionId: "projects"
    })
    setProjects(projects)
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <Layout>
      <div>
        {projects?.total == 0 && (
          <div className="mt-16 flex flex-col items-center justify-center">
            <div className="text-xl font-semibold">
              You don't have any project yet
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              Create a new project for{" "}
              <b className="text-violet-500">{currentTabData?.hostname}</b>{" "}
              <br /> and get started
            </div>
            <div className="mt-12">
              <button
                onClick={clickHandler}
                className="flex items-center gap-1 rounded-md bg-violet-600 p-2 px-4 font-bold text-white hover:bg-violet-700 active:bg-violet-800 disabled:bg-gray-500"
                disabled={isLoading}
                title="Create New Project">
                <RiAddFill size={24} />
                Create Project
              </button>
            </div>
          </div>
        )}
        <div className="m-4 flex flex-col gap-2 pb-20">
          {projects?.documents.map((project) => {
            return (
              <ProjectItem
                data={project as ProjectDocument}
                getProjects={getProjects}
                key={project.$id}
              />
            )
          })}
        </div>
        <div className="fixed bottom-5 left-0 w-full">
          <button
            onClick={clickHandler}
            className="m-auto flex w-[95%] items-center justify-center gap-1 rounded-md bg-violet-600 p-2 px-4 font-bold text-white hover:bg-violet-700 active:bg-violet-800 disabled:bg-gray-500"
            disabled={isLoading}
            title="Create New Project">
            <RiAddFill size={24} />
            Create New Project for {currentTabData.hostname}
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Home
