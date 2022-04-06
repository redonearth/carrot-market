import type { NextPage } from 'next';
import Item from '@components/item';
import Layout from '@components/layout';

const Bought: NextPage = () => {
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 divide-y pb-10">
        {[...Array(20)].map((_, i) => (
          <Item
            key={i}
            id={i}
            title="iPhone 14"
            price={950000}
            hearts={1}
            comments={1}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Bought;
