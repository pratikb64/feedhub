import { Teams } from "appwrite"
import { useStore } from "zustand"
import appwriteState from "~states/appwrite"

const useTeams = () => {
  const { getClient } = useStore(appwriteState)
  const teams = new Teams(getClient())

  const deleteTeam = async (teamId: string) => {
    await teams.delete(teamId).catch(console.error)
  }

  const getTeamMembers = async (teamId: string) => {
    const members = await teams.listMemberships(teamId).catch(console.error)
    if (members) return members
    return undefined
  }

  const addMember = async (teamId: string, email: string) => {
    await teams.createMembership(
      teamId,
      ["member"],
      "https://feedhub.p15.workers.dev",
      email
    )
  }

  return { deleteTeam, getTeamMembers, addMember }
}

export default useTeams
