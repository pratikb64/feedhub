import { Client, Teams } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  const { membershipId, userId, teamId, secret } = req.query;

  if (!membershipId || !userId || !teamId || !secret) {
    return res.json({ message: 'Missing required parameters' });
  }

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.API_KEY);

  const teams = new Teams(client);

  try {
    await teams.updateMembershipStatus(teamId, membershipId, userId, secret);
  } catch (error) {
    return res.text(alreadyAcceptedHtml, 200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
  }

  return res.text(successHtml, 200, {
    'Content-Type': 'text/html; charset=utf-8',
  });
};

const successHtml = `<html style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #161616;
      color: #e4e4e4;
    ">
    <body style="
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    ">
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1rem;
        border-radius: .25rem;
        background-color: #282828;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
      ">
        <h1 style="
          font-size: 2rem;
          margin-bottom: 1rem;
        ">Invitation accepted successfully!</h1>
        <p style="
          font-size: 1.05rem;
          color: #999;
          margin-bottom: 2rem;
        ">Login to Feedhub extension to access the project</p>
      </div>
    </body>
    </html>`;

const alreadyAcceptedHtml = `<!DOCTYPE html><html style="
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #161616;
        color: #e4e4e4;
      ">
      <body style="
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      ">
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1rem;
          border-radius: .25rem;
          background-color: #282828;
          box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        ">
          <h1 style="
            font-size: 2rem;
            margin-bottom: 1rem;
          ">Invitation already accepted!</h1>
          <p style="
            font-size: 1.05rem;
            color: #999;
            margin-bottom: 2rem;
          ">Please login to Feedhub extension to access the project</p>
        </div>
      </body>
      </html>`;
