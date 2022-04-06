import type { NextPage } from 'next';
import Item from '@components/item';
import Layout from '@components/layout';

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 divide-y pb-10">
        {[...Array(20)].map((_, i) => (
          <Item
            key={i}
            id={i}
            title="조지아 6X 샤프트"
            price={85000}
            hearts={3}
            comments={3}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Sold;
