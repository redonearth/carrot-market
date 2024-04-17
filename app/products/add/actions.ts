"use server";

import { redirect } from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { productSchema } from "./schema";

export async function uploadProduct(formData: FormData) {
  const data = {
    title: formData.get("title"),
    photo: formData.get("photo"),
    description: formData.get("description"),
    price: formData.get("price"),
  };

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

interface CloudflareOneTimeUploadUrl {
  result: {
    id: string;
    uploadURL: string;
  };
  success: boolean;
  errors: string[];
  messages: string[];
}

export async function getUploadUrl(): Promise<CloudflareOneTimeUploadUrl> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
    }
  );
  return await response.json();
}
