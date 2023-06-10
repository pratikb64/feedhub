// @ts-check
const sdk = require("node-appwrite")

module.exports = async (req, res) => {
  const client = new sdk.Client()

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
  const teams = new sdk.Teams(client)

  const payload = JSON.parse(`${req.payload}`)

  const { teamId, email } = payload

  await teams.createMembership(
    teamId,
    ["member"],
    "https://feedhub.pratikbadhe.com",
    email
  )

  res.json({
    message: "Team Member created!"
  })
}
