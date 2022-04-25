import type { NextPage } from 'next';
import Button from '@components/button';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import useCoords from '@libs/client/useCoords';

interface IWriteForm {
  question: string;
}

interface IWriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<IWriteForm>();
  const [post, { loading, data }] = useMutation<IWriteResponse>('/api/posts');
  const onValid = (data: IWriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data && !data.ok) {
      router.push('/community');
    }
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout title="질문하기" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 p-4">
        <TextArea
          register={register('question', { required: true, minLength: 5 })}
          placeholder="질문을 해보세요!"
          required
        />
        <Button text={loading ? '잠시만 기다려주세요...' : '작성하기'} />
      </form>
    </Layout>
  );
};

export default Write;
