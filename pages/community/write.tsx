import { NextPage } from 'next';
import Button from '../../components/button';
import Layout from '../../components/layout';
import TextArea from '../../components/textarea';

const Write: NextPage = () => {
  return (
    <Layout title="질문하기" canGoBack>
      <form className="space-y-4 p-4">
        <TextArea placeholder="질문을 해보세요!" required />
        <Button text="작성하기" />
      </form>
    </Layout>
  );
};

export default Write;
