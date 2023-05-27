import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="h-[650px] w-[500px] text-base">
      <div className="p-4 text-center text-xl font-bold">Feedhub</div>
      <hr />
      <div className="p-4">
        Don't have an account?{" "}
        <Link to={"/register"} className="text-violet-500">
          Register now
        </Link>
      </div>
      <hr />
      <form className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="w-full rounded-md border-[3px] border-gray-300 p-2"
            type="email"
            id="email"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            className="w-full rounded-md border-[3px] border-gray-300 p-2"
            type="password"
            id="password"
            required
          />
        </div>
        <button className="rounded-md bg-violet-500 p-2 px-4 font-bold text-white hover:bg-violet-600 active:bg-violet-700">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
