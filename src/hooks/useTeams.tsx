import { Teams, type Models } from "appwrite"
import { useState } from "react"
import { useStore } from "zustand"
import appwriteState from "~states/appwrite"
import projectState from "~states/projectState"

const useTeams = () => {
  const { getClient } = useStore(appwriteState)
  const { activeProject } = useStore(projectState)
  const teams = new Teams(getClient())
  const [isOwner, setIsOwner] = useState(false)
  const [teamMembers, setTeamMembers] = useState<Models.MembershipList>()

  const deleteTeam = async () => {
    if (activeProject) {
      await teams.delete(activeProject?.teamId).catch(console.error)
    } else throw new Error('Active project not found in "useTeams" hook')
  }

  const syncTeamMembers = async () => {
    if (activeProject) {
      const members = await teams
        .listMemberships(activeProject?.teamId)
        .catch(console.error)
      if (members) {
        members.memberships.forEach((member) => {
          if (member.roles.includes("owner")) setIsOwner(true)
        })
        setTeamMembers(members)
      }
    } else throw new Error('Active project not found in "useTeams" hook')
  }

  const addMember = async (email: string) => {
    if (activeProject) {
      await teams.createMembership(
        activeProject?.teamId,
        ["member"],
        "https://feedhub.p15.workers.dev",
        email
      )
    } else throw new Error('Active project not found in "useTeams" hook')
  }

  const deleteMember = async (memberId: string) => {
    if (activeProject) {
      await teams.deleteMembership(activeProject?.teamId, memberId)
    } else throw new Error('Active project not found in "useTeams" hook')
  }

  return {
    deleteTeam,
    syncTeamMembers,
    addMember,
    isOwner,
    teamMembers,
    deleteMember
  }
}

export default useTeams
