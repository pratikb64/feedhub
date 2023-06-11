// @ts-check
const sdk = require("node-appwrite")
const { Client, Users, Query } = sdk

module.exports = async (req, res) => {
  const client = new Client()

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
  const users = new Users(client)

  const payload = JSON.parse(`${req.payload}`)

  const { email } = payload

  const user = await users.list([Query.equal("email", [email])])

  if (user.total == 0)
    return res.json({
      message: "User does not exist",
      status: 404
    })

  res.json({
    message: "User exists"
  })
}
