import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import * as z from "zod"
import AuthLayout from "~components/AuthLayout"
import useAccount from "~hooks/useAccount"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAccount()
  const { register, handleSubmit, formState, setError } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const id = toast.loading("Logging in...")
    login(data).then((res) => {
      if (res?.error) {
        setError("root", {
          //@ts-ignore
          message: res.error.response.message
        })
        toast.error("Login failed", { id })
      }
      if (res?.session) {
        toast.success("Login successful", { id })
        navigate("/")
      }
    })
  }

  return (
    <AuthLayout>
      <div className="px-4 text-sm">
        Don't have an account?{" "}
        <Link to={"/register"} className="text-violet-500">
          Register now
        </Link>
      </div>
      <hr className="my-4" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded-md p-2"
            type="email"
            id="email"
            required
            {...register("email")}
          />
          <span className="mt-2 text-xs text-red-500">
            {formState.errors.email?.message}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="w-full rounded-md p-2"
            type="password"
            id="password"
            required
            {...register("password")}
          />
          <span className="mt-2 text-xs text-red-500">
            {formState.errors.password?.message}
          </span>
        </div>
        <span className="text-xs text-red-500">
          {formState.errors.root?.message}
        </span>
        <button
          className="mt-4 rounded-md bg-violet-600 p-2 px-4 font-bold text-white hover:bg-violet-700 active:bg-violet-800"
          title="Login">
          Login
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
