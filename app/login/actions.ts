"use server";

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    errors: ["비밀번호를 틀렸습니다.", "비밀번호가 너무 짧아요!"],
  };
}
