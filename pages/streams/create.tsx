import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';

interface ICreateForm {
  name: string;
  price: string;
  description: string;
}

interface ICreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { loading, data }] =
    useMutation<ICreateResponse>(`/api/streams`);
  const { register, handleSubmit } = useForm<ICreateForm>();
  const onValid = (form: ICreateForm) => {
    if (loading) return;
    createStream(form);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);
  return (
    <Layout title="라이브 가기" seoTitle="라이브 가기" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 py-10 px-4">
        <Input
          register={register('name', { required: true })}
          name="name"
          label="상품 이름"
          type="text"
          required
        />
        <Input
          register={register('price', { required: true, valueAsNumber: true })}
          name="price"
          label="금액"
          type="text"
          kind="price"
          placeholder="0"
          required
        />
        <TextArea
          register={register('description', { required: true })}
          name="description"
          label="상품 설명"
        />
        <Button isLoading={loading} text="라이브 가기" />
      </form>
    </Layout>
  );
};

export default Create;
