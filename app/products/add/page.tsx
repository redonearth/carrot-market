"use client";

import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import Button from "@/components/button";
import Input from "@/components/input";
import { uploadProduct } from "./actions";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [state, dispatch] = useFormState(uploadProduct, null);
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);

    // TODO:
    // 1. image 형식인지 확인
    // 2. 파일 크기 제한
  };

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
