import { Client, Query, Users } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.API_KEY);

  const users = new Users(client);

  const { email } = JSON.parse(req.body);

  const user = await users.list([Query.equal('email', [email])]);

  if (user.total == 0) {
    return res.json({
      message: 'User does not exist',
      status: 404,
    });
  }

  return res.json({
    message: 'User exists',
  });
};
