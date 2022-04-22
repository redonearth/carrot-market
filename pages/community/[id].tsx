import type { NextPage } from 'next';
import Button from '@components/button';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Answer, Post, User } from '@prisma/client';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    curiosities: number;
  };
  answers: AnswerWithUser[];
}

interface ICommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { data, error } = useSWR<ICommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  return (
    <Layout canGoBack>
      <div>
        <span className="my-3 ml-4 inline-flex items-center rounded-full border-b-[2px] bg-gray-100 px-2.5 py-0.5 pl-4 text-xs font-medium">
          동네 질문
        </span>
        <div className="flex cursor-pointer items-center space-x-3 border-b px-4 py-3">
          <div className="h-12 w-12 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data ? data?.post?.user?.name : <Skeleton />}
            </p>
            <Link href={`/users/profiles/${data?.post?.user?.id}`}>
              <a className="text-xs font-medium text-gray-500">
                프로필 보기 &rarr;
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-2 pl-4 text-gray-700">
            {data ? (
              <>
                <span className="font-medium text-orange-500">Q. </span>
                {data?.post?.question}
              </>
            ) : (
              <Skeleton width="90%" />
            )}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] px-4 py-2.5 text-gray-700">
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                궁금해요{' '}
                {data ? (
                  data?.post._count.curiosities
                ) : (
                  <Skeleton width="14px" />
                )}
              </span>
            </span>
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>
                답변{' '}
                {data ? data?.post._count.answers : <Skeleton width="14px" />}
              </span>
            </span>
          </div>
        </div>
        <div className="my-5 space-y-5 px-4">
          {data?.post.answers.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  {answer.user.name}
                </span>
                <span className="block text-xs text-gray-500">
                  {answer.createdAt}
                </span>
                <p className="mt-2 text-gray-700">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4">
          <TextArea
            name="description"
            placeholder="답변을 부탁해요!"
            required
          />
          <Button text="답변하기" />
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
