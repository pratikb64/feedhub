// @ts-check
const sdk = require("node-appwrite")
const { Permission, Role } = sdk

module.exports = async (req, res) => {
  const client = new sdk.Client()
  const ID = sdk.ID
  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    )
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true)
  }
  const database = new sdk.Databases(client)
  const teams = new sdk.Teams(client)
  const users = new sdk.Users(client)
  const payload = JSON.parse(`${req.payload}`)

  const { domain } = payload

  const USER_ID = req.variables.APPWRITE_FUNCTION_USER_ID

  const team = await teams.create(ID.unique(), domain)

  const user = await users.get(USER_ID)
  await teams.createMembership(
    team.$id,
    ["owner"],
    "https://feedhub.p15.workers.dev",
    user.email,
    USER_ID
  )

  await database.createDocument(
    "prod",
    "projects",
    sdk.ID.unique(),
    {
      domain: domain,
      owner: USER_ID,
      teamId: team.$id
    },
    [
      Permission.read(Role.team(team.$id)),
      Permission.update(Role.team(team.$id, "owner")),
      Permission.delete(Role.team(team.$id, "owner")),
      Permission.write(Role.team(team.$id))
    ]
  )

  res.json({
    message: "Project created!"
  })
}
