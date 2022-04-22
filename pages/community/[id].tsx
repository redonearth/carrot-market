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
import useMutation from '@libs/client/useMutation';
import { joinClassNames } from '@libs/client/utils';

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
  isCurious: boolean;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate: boundMutate } = useSWR<ICommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  const [toggleCuriosity] = useMutation(
    `/api/posts/${router.query.id}/curiosity`
  );
  const onCuriosityClick = () => {
    if (!data) return;
    boundMutate(
      {
        ...data,
        post: {
          ...data?.post,
          _count: {
            ...data?.post._count,
            curiosities: data.isCurious
              ? data?.post._count.curiosities - 1
              : data?.post._count.curiosities + 1,
          },
        },
        isCurious: !data.isCurious,
      },
      false
    );
    toggleCuriosity({});
  };
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
            <button
              onClick={onCuriosityClick}
              className={joinClassNames(
                'flex items-center space-x-2 text-sm',
                data?.isCurious ? 'font-semibold text-orange-600' : ''
              )}
            >
              {data?.isCurious ? (
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
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
              )}
              <span>
                궁금해요{' '}
                {data ? (
                  data?.post?._count?.curiosities
                ) : (
                  <Skeleton width="14px" />
                )}
              </span>
            </button>
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
                {data ? data?.post?._count?.answers : <Skeleton width="14px" />}
              </span>
            </span>
          </div>
        </div>
        <div className="my-5 space-y-5 px-4">
          {data?.post?.answers?.map((answer) => (
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
