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
  const users = new sdk.Users(client)

  const payload = JSON.parse(`${req.payload}`)

  const { userId } = payload

  const user = await users.get(userId)
  console.log(user)

  res.json({
    message: "Team Member created!"
  })
}
