import { RiAddFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import Layout from "~components/Layout"
import useAccount from "~hooks/useAccount"
import useCurrentTab from "~hooks/useCurrentTab"

const Home = () => {
  const { user, logout, isLoading } = useAccount()
  const navigate = useNavigate()
  const { tab, data } = useCurrentTab()

  // useEffect(() => {
  // if (isLoading) return
  // if (!user) navigate("/login")
  // }, [user, isLoading])

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="text-xl font-semibold">
          You don't have any project yet
        </div>
        <div className="mt-4 text-sm">
          Create a new project for <b>{data?.url}</b> get started
        </div>
        <div className="mt-12">
          <button className="flex items-center p-2 px-4 font-bold text-white rounded-md bg-violet-500 hover:bg-violet-600 active:bg-violet-700">
            <RiAddFill size={24} />
            Create Project
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Home
