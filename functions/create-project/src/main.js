import {
  Client,
  Databases,
  ID,
  Permission,
  Role,
  Teams,
  Users,
} from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.API_KEY);

  const database = new Databases(client);
  const teams = new Teams(client);
  const users = new Users(client);

  if (!req.body) return res.json({ message: 'No domain provided!' });

  const { domain } = JSON.parse(req.body);

  if (!domain) return res.json({ message: 'No domain provided!' });

  const USER_ID =
    process.env.APPWRITE_FUNCTION_USER_ID || '66f18572000311cbb079';
  const team = await teams.create(ID.unique(), domain);
  const user = await users.get(USER_ID);

  await teams.createMembership(team.$id, ['owner'], user.email, USER_ID);

  await database.createDocument(
    'prod',
    'projects',
    ID.unique(),
    {
      domain: domain,
      owner: USER_ID,
      teamId: team.$id,
    },
    [
      Permission.read(Role.team(team.$id)),
      Permission.update(Role.team(team.$id, 'owner')),
      Permission.delete(Role.team(team.$id, 'owner')),
      Permission.write(Role.team(team.$id)),
    ]
  );

  return res.json({
    message: 'Project created!',
  });
};
