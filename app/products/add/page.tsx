"use client";

import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import Button from "@/components/button";
import Input from "@/components/input";
import { getUploadUrl, uploadProduct } from "./actions";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [photoUploadUrl, setPhotoUploadUrl] = useState("");
  const [photoId, setPhotoId] = useState("");

  const interceptAction = async (_: any, formData: FormData) => {
    // 1. Cloudflare에 이미지 업로드
    const file = formData.get("photo");
    if (!file) return;

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);

    const response = await fetch(photoUploadUrl, {
      method: "POST",
      body: cloudflareForm,
    });

    if (response.status !== 200) return;

    // 2. formData를 변경
    const photoUrl = `https://imagedelivery.net/Y45BUDi393Qe7-mR-gFRlA/${photoId}`;
    formData.set("photo", photoUrl);

    // 3. uploadProduct 호출
    return uploadProduct(_, formData);
  };

  const onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);

    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setPhotoUploadUrl(uploadURL);
      setPhotoId(id);
    }

    // TODO:
    // 1. image 형식인지 확인
    // 2. 파일 크기 제한
  };

  const [state, dispatch] = useFormState(interceptAction, null);

  return (
    <div>
      <form action={dispatch} className="p-5 flex flex-col gap-y-5">
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
          name="title"
          placeholder="제목"
          required
          errors={state?.fieldErrors.title}
        />
        <Input
          type="number"
          name="price"
          placeholder="가격"
          required
          errors={state?.fieldErrors.price}
        />
        <Input
          type="text"
          name="description"
          placeholder="상품 설명"
          required
          errors={state?.fieldErrors.description}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
