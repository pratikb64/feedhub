import { Teams } from "appwrite"
import { useStore } from "zustand"
import appwriteState from "~states/appwrite"

const useTeams = () => {
  const { getClient } = useStore(appwriteState)
  const teams = new Teams(getClient())

  const deleteTeam = async (teamId: string) => {
    await teams.delete(teamId).catch(console.error)
  }

  return { deleteTeam }
}

export default useTeams
