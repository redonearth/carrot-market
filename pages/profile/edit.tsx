import { NextPage } from 'next';
import Button from '../../components/button';
import Input from '../../components/input';
import Layout from '../../components/layout';

const EditProfile: NextPage = () => {
  return (
    <Layout title="프로필 수정" canGoBack>
      <form className="space-y-4 py-10 px-4">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            변경
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input name="email" label="이메일 주소" type="email" required />
        <Input
          name="phone"
          label="휴대폰 번호"
          type="number"
          kind="phone"
          required
        />
        <Button text="프로필 수정하기" />
      </form>
    </Layout>
  );
};

export default EditProfile;
