"use server";

import { redirect } from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";
import fs from "fs/promises";

const productSchema = z.object({
  title: z.string({ required_error: "제목은 필수입니다." }),
  photo: z.string({ required_error: "사진은 필수입니다." }),
  description: z.string({ required_error: "상품 설명을 적어주세요." }),
  price: z.coerce.number({ required_error: "상품 가격을 입력해주세요." }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    photo: formData.get("photo"),
    description: formData.get("description"),
    price: formData.get("price"),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();

    if (session.id) {
      const product = await db.product.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          photo: result.data.photo,
          price: result.data.price,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/products/${product.id}`);
    }
  }
}
