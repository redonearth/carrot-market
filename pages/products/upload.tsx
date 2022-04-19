import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { Product } from '@prisma/client';
import { useRouter } from 'next/router';

interface IUploadProductForm {
  name: string;
  price: number;
  description: string;
}

interface IUploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IUploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<IUploadProductMutation>('/api/products');
  const onValid = (data: IUploadProductForm) => {
    if (loading) return;
    uploadProduct(data);
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data?.product.id}`);
    }
  }, [data, router]);
  return (
    <Layout title="상품 등록" canGoBack>
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input type="file" className="hidden" />
          </label>
        </div>
        <Input
          register={register('name', { required: true })}
          name="name"
          label="상품 이름"
          type="text"
          required
        />
        <Input
          register={register('price', { required: true })}
          name="price"
          label="판매 금액"
          type="text"
          kind="price"
          placeholder="0"
          required
        />
        <TextArea
          register={register('description', { required: true })}
          name="description"
          label="상품 설명"
          required
        />
        <Button text={loading ? '잠시만 기다려주세요...' : '상품 등록하기'} />
      </form>
    </Layout>
  );
};

export default Upload;
