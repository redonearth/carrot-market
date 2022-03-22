import { NextPage } from 'next';
import Item from '../../components/item';
import Layout from '../../components/layout';

const Loved: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 divide-y pb-10">
        {[...Array(20)].map((_, i) => (
          <Item
            key={i}
            id={i}
            title="2022 MacBook Pro 16인치"
            price={1980000}
            hearts={2}
            comments={2}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Loved;
