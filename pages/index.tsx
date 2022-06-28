import type { NextPage } from 'next';
import FloatingButton from '@components/floating-button';
import Item from '@components/item';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import Head from 'next/head';
import useSWR, { SWRConfig } from 'swr';
import { Product } from '@prisma/client';
import client from '@libs/server/client';

export interface ProductWithFavoritesCount extends Product {
  _count: {
    records: number;
  };
}

interface IProductsResponse {
  ok: boolean;
  products: ProductWithFavoritesCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<IProductsResponse>('/api/products');
  return (
    <Layout title="홈" seoTitle="홈" hasTabBar>
      <Head>
        <title>캐럿 마켓</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            image={product.image}
            hearts={product._count?.records || 0}
            // comments={4}
          />
        ))}
        <FloatingButton href="/products/upload">
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

const Page: NextPage<{ products: ProductWithFavoritesCount[] }> = ({
  products,
}) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/products': {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  console.log('SSR');
  const products = await client.product.findMany({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Page;
