import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";

async function getUser() {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";

    const session = await getSession();
    session.destroy();

    redirect("/");
  };

  return (
    <div>
      <h1>환영합니다 🙌 {user?.username}</h1>
      <form action={logOut}>
        <button className="font-bold text-blue-500">로그아웃</button>
      </form>
    </div>
  );
}
