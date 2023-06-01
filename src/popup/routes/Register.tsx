import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import * as z from "zod"
import AuthLayout from "~components/AuthLayout"
import useAccount from "~hooks/useAccount"

const formSchema = z.object({
  name: z.string().min(3).max(50).nonempty(),
  email: z.string().email(),
  password: z.string().min(8)
})

const Register = () => {
  const { register: signUp } = useAccount()
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })
  const navigate = useNavigate()

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    signUp(data).then((d) => {
      navigate("/login")
    })
  }

  return (
    <AuthLayout>
      <div className="px-4 text-sm">
        Already have an account?{" "}
        <Link to={"/login"} className="text-violet-500">
          Login
        </Link>
      </div>
      <hr className="my-4" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="name">
            Name
          </label>
          <input
            className="w-full rounded-md p-2"
            type="name"
            id="name"
            required
            {...register("name")}
          />
          <span className="mt-2 text-xs text-red-500">
            {formState.errors.name?.message}
          </span>
        </div>
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
        <button className="rounded-md bg-violet-500 p-2 px-4 font-bold text-white hover:bg-violet-600 active:bg-violet-700">
          Create account
        </button>
      </form>
    </AuthLayout>
  )
}

export default Register
