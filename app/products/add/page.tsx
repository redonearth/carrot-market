"use client";

import { ChangeEvent, useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { getUploadUrl, uploadProduct } from "./actions";
import { ProductType, productSchema } from "./schema";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [photoUploadUrl, setPhotoUploadUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = handleSubmit(async (data: ProductType) => {
    // 1. Cloudflare에 이미지 업로드
    if (!file) return;

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);

    const response = await fetch(photoUploadUrl, {
      method: "POST",
      body: cloudflareForm,
    });

    if (response.status !== 200) return;

    // 2. formData를 변경
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("photo", data.photo);
    formData.append("description", data.description);
    formData.append("price", String(data.price));

    // 3. uploadProduct 호출
    return uploadProduct(formData);
  });

  const onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);

    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setPhotoUploadUrl(uploadURL);
      setValue(
        "photo",
        `https://imagedelivery.net/Y45BUDi393Qe7-mR-gFRlA/${id}`
      );
    }

    // TODO:
    // 1. image 형식인지 확인
    // 2. 파일 크기 제한
  };

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <div>
      <form action={onValid} className="p-5 flex flex-col gap-y-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <span className="text-neutral-400 text-sm">
                사진을 추가해주세요.
              </span>
            </>
          ) : null}
        </label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
        <Input
          type="text"
          placeholder="제목"
          required
          {...register("title")}
          errors={[errors.title?.message ?? ""]}
        />
        <Input
          type="number"
          placeholder="가격"
          required
          {...register("price")}
          errors={[errors.price?.message ?? ""]}
        />
        <Input
          type="text"
          placeholder="상품 설명"
          required
          {...register("description")}
          errors={[errors.description?.message ?? ""]}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
