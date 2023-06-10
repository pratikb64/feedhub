import { zodResolver } from "@hookform/resolvers/zod"
import * as Tabs from "@radix-ui/react-tabs"
import { type Models } from "appwrite"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RiCloseFill } from "react-icons/ri"
import { z } from "zod"
import { useStore } from "zustand"
import useTeams from "~hooks/useTeams"
import projectState from "~states/projectState"

const formSchema = z.object({
  email: z.string().email()
})

const ProjectSettings = () => {
  const { activeProject, showSettings, toggleShowSettings } =
    useStore(projectState)
  const [members, setMembers] = useState<Models.MembershipList>()
  const { getTeamMembers, addMember } = useTeams()
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  })

  useEffect(() => {
    if (activeProject) {
      getTeamMembers(activeProject.teamId).then((res) => {
        if (res) setMembers(res)
      })
    }
  }, [])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (activeProject) {
      addMember(activeProject.teamId, data.email)
        .then((d) => console.log(d))
        .catch((e) => console.log(e))
    } else throw Error("No active project")
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full w-full bg-black/50 backdrop-blur-[2px] transition-all  ease-in-out ${
        showSettings
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}>
      <div>
        <Tabs.Root
          className={`absolute left-1/2  w-[90%] -translate-x-1/2 -translate-y-1/2 transform  rounded-lg bg-slate-900 p-4 shadow-lg ring-2 ring-slate-800 transition-all ease-in-out ${
            showSettings ? "top-1/2" : "top-[40%]"
          }`}
          defaultValue="members">
          <Tabs.List aria-label="Manage your account">
            <Tabs.Trigger
              className="border-solid border-violet-500 p-3 data-[state=active]:border-b-2"
              value="general">
              General
            </Tabs.Trigger>
            <Tabs.Trigger
              className="border-solid border-violet-500 p-3 data-[state=active]:border-b-2"
              value="members">
              Members
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="mt-4 h-96 overflow-auto" value="general">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm" htmlFor="project-name">
                    Project Name
                  </label>
                  <input
                    className="w-full rounded-md p-2"
                    type="text"
                    id="project-name"
                    value={activeProject?.domain}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm" htmlFor="project-domain">
                    Project Domain
                  </label>
                  <div className="font-bold text-violet-500">
                    {activeProject?.domain}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button className="rounded-md bg-violet-600 p-2 px-4 text-sm font-bold text-white hover:bg-violet-700 active:bg-violet-800">
                  Save
                </button>
                <button className="rounded-md bg-red-600 p-2 px-4 text-sm font-semibold text-white hover:bg-red-700 active:bg-red-800 disabled:bg-gray-500">
                  Delete Project
                </button>
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content className="mt-4 h-96 overflow-auto" value="members">
            <div>
              <label className="text-sm" htmlFor="invite-member">
                Add member to your project
              </label>
              <div className="my-1 text-xs text-slate-500">
                Make sure the user is already registered to feedhub!
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-2 flex gap-4">
                <input
                  className="w-full rounded-md p-2"
                  id="invite-member"
                  type="email"
                  required
                  {...register("email")}
                />
                <button className="rounded-md bg-violet-600 p-2 px-4 text-sm font-bold text-white hover:bg-violet-700 active:bg-violet-800">
                  Invite
                </button>
              </form>
              <div className="mt-6">
                <div className="font-bold">Users</div>
                <div className="mt-4 flex flex-col gap-3">
                  {members?.memberships.map((member) => (
                    <div
                      key={member.userId}
                      className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div>
                          <img
                            className="w-10"
                            src={`https://ui-avatars.com/api/?rounded=true&format=png&name=${member.userName}`}
                            alt=""
                          />
                        </div>
                        <div>
                          <div className="capitalize">{member.userName}</div>
                          <div className="text-xs text-slate-500">
                            {member.userEmail}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {member.roles.map((role) => (
                          <div
                            key={role}
                            className="flex h-max items-center justify-center rounded-full bg-slate-700 px-2 py-1 text-xs">
                            {role.toUpperCase()}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tabs.Content>
          <button
            onClick={toggleShowSettings}
            className="absolute right-3 top-3">
            <RiCloseFill size={22} className="text-white" />
          </button>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default ProjectSettings
