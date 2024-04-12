"use server";

import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const checkUsername = (username: string) => !username.includes("potato");

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, "너무 짧아요")
      .max(10, "너무 길어요")
      .toLowerCase()
      .trim()
      .transform((username) => `😭 ${username} 😭`)
      .refine(checkUsername, "감자는 허용하지 않아요"),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(4)
      .regex(
        passwordRegex,
        "비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다"
      ),
    confirmPassword: z.string().min(4),
  })
  .refine(checkPasswords, {
    message: "비밀번호가 동일하지 않아요",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
