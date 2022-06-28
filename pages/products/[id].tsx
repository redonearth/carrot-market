import type { NextPage } from 'next';
import Button from '@components/button';
import Layout from '@components/layout';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { Product, User } from '@prisma/client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from 'next/link';
import useMutation from '@libs/client/useMutation';
import { joinClassNames } from '@libs/client/utils';
import Image from 'next/image';

interface ProductWithUser extends Product {
  user: User;
}

interface IProductDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<IProductDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFavorite] = useMutation(
    `/api/products/${router.query.id}/favorite`
  );
  const onFavoriteClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    // mutate('/api/users/me', (prev: any) => ({ ok: !prev.ok }), false);
    toggleFavorite({});
  };
  return (
    <Layout seoTitle="상품 상세" canGoBack>
      <div className="p-4">
        <div className="mb-8">
          {data?.product.image ? (
            <div className="relative h-96">
              <Image
                src={`https://imagedelivery.net/Y45BUDi393Qe7-mR-gFRlA/${data.product.image}/public`}
                layout="fill"
                className="object-cover"
                alt="상품 사진"
              />
            </div>
          ) : (
            <div className="h-96 bg-slate-300" />
          )}
          <div className="flex cursor-pointer items-center space-x-3 border-t border-b py-3">
            {data?.product.user.avatar ? (
              <div className="relative h-12 w-12 rounded-full bg-slate-300">
                <Image
                  src={`https://imagedelivery.net/Y45BUDi393Qe7-mR-gFRlA/${data.product.user.avatar}/avatar`}
                  layout="fill"
                  className="rounded-full object-cover"
                  alt="Avatar"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full bg-slate-300" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data ? data.product.user.name : <Skeleton />}
              </p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  프로필 보기 &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data ? data.product.name : <Skeleton width="90%" />}
            </h1>
            <span className="mt-3 block text-3xl text-gray-900">
              {data ? `₩ ${data.product.price}` : <Skeleton width="50%" />}
            </span>
            <p className="my-6 text-base text-gray-700">
              {data ? data.product.description : <Skeleton />}
            </p>

            <div className="flex items-center justify-between space-x-2">
              <Button text="채팅하기" large />
              <button
                onClick={onFavoriteClick}
                className={joinClassNames(
                  'flex items-center justify-center rounded-md p-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500',
                  data?.isLiked
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-400 hover:text-gray-500'
                )}
              >
                {data?.isLiked ? (
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">비슷한 상품</h2>
          {data?.relatedProducts.length !== 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-4">
              {data?.relatedProducts.map((product: any) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <a>
                    <div className="relative mb-2 h-56 w-full bg-slate-300">
                      <Image
                        src={`https://imagedelivery.net/Y45BUDi393Qe7-mR-gFRlA/${product.image}/public`}
                        layout="fill"
                        className="object-cover"
                        alt="상품 사진"
                      />
                    </div>
                    <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                    <span className="text-sm font-medium text-gray-900">
                      ₩ {product.price}
                    </span>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <span className="text-lg">상품이 없습니다. 😭</span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
