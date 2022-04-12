import type { NextPage } from 'next';
import FloatingButton from '@components/floating-button';
import Item from '@components/item';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import Head from 'next/head';

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>캐럿 마켓</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {[...Array(20)].map((_, i) => (
          <Item
            key={i}
            id={i}
            title="캘러웨이 로그 ST 드라이버"
            price={800000}
            hearts={4}
            comments={4}
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

export default Home;
