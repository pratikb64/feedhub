import { useEffect, useState } from "react"
import { RiAddFill } from "react-icons/ri"
import Layout from "~components/Layout"
import useCurrentTab from "~hooks/useCurrentTab"
import useDatabase from "~hooks/useDatabase"
import useFunctions from "~hooks/useFunctions"

const Home = () => {
  const { data } = useCurrentTab()
  const [isLoading, setIsLoading] = useState(false)
  const { fn } = useFunctions()
  const { getDocumentList } = useDatabase()

  const clickHandler = async () => {
    setIsLoading(true)
    await fn("create-project", {
      domain: data?.url
    })
    setIsLoading(false)
  }

  const getProjects = async () => {
    const projects = await getDocumentList({
      collectionId: "projects"
    })
    console.log(projects)
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <Layout>
      <div className="mt-16 flex flex-col items-center justify-center">
        <div className="text-xl font-semibold">
          You don't have any project yet
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          Create a new project for{" "}
          <b className="text-violet-500">{data?.url}</b> <br /> and get started
        </div>
        <div className="mt-12">
          <button
            onClick={clickHandler}
            className="flex items-center rounded-md bg-violet-500 p-2 px-4 font-bold text-white hover:bg-violet-600 active:bg-violet-700"
            disabled={isLoading}>
            <RiAddFill size={24} />
            Create Project
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Home
