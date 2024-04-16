"use server";

import { redirect } from "next/navigation";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import saveSession from "@/lib/saveSession";
import db from "@/lib/db";
import { z } from "zod";
import { compare } from "bcrypt";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "이메일이 없습니다."),
  password: z.string({
    required_error: "비밀번호를 입력하세요.",
  }),
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await compare(result.data.password, user!.password ?? "");

    if (ok) {
      await saveSession(user!.id);
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호입니다."],
          email: [],
        },
      };
    }
  }
}
