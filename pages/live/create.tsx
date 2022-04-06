import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import TextArea from '@components/textarea';

const Create: NextPage = () => {
  return (
    <Layout title="라이브 가기" canGoBack>
      <form className="space-y-4 py-10 px-4">
        <Input name="name" label="상품 이름" type="text" required />
        <Input
          name="price"
          label="금액"
          type="text"
          kind="price"
          placeholder="0"
          required
        />
        <TextArea name="description" label="상품 설명" />
        <Button text="라이브 가기" />
      </form>
    </Layout>
  );
};

export default Create;
