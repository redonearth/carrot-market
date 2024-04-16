import db from "@/lib/db";
import saveSession from "@/lib/saveSession";
import { getAccessToken, getUserEmail, getUserProfile } from "./utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = await getAccessToken(request);

  const { id, avatar_url, login }: GitHubProfile =
    await getUserProfile(accessToken);
  const emails: GitHubEmail[] = await getUserEmail(accessToken);
  const email = emails?.find(
    ({ primary, visibility }) => primary && visibility === "public"
  )?.email;

  const user = await db.user.findUnique({
    where: {
      github_id: String(id),
    },
    select: {
      id: true,
    },
  });

  if (user) {
    return await saveSession(user.id);
  }

  const newUser = await db.user.create({
    data: {
      username: `${login}${id && `-${id}`}${email && `-${email.split("@").at(0)}`}`,
      email,
      github_id: String(id),
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });
  return await saveSession(newUser.id);
}
