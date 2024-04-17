import { z } from "zod";

export const productSchema = z.object({
  title: z.string({ required_error: "제목은 필수입니다." }).trim(),
  photo: z.string({ required_error: "사진은 필수입니다." }).trim(),
  description: z.string({ required_error: "상품 설명을 적어주세요." }),
  price: z.coerce.number({ required_error: "상품 가격을 입력해주세요." }),
});

export type ProductType = z.infer<typeof productSchema>;
