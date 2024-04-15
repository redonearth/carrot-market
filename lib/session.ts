import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

interface SessionContent {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "carrot-cookie",
    password: process.env.COOKIE_PASSWORD!,
  });
}
