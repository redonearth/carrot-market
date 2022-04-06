import type { NextPage } from 'next';
import Layout from '@components/layout';
import Message from '@components/message';

const ChatDetail: NextPage = () => {
  return (
    <Layout title="칵승규" canGoBack>
      <div className="space-y-4 py-10 px-4 pb-16">
        <Message message="안녕하세요. 다비드 투수 글러브 문의 드립니다." />
        <Message message="10만원 네고 가능할까요?" />
        <Message message="미쳤어?" reversed />
        <form className="fixed inset-x-0 bottom-0 py-2">
          <div className="relative mx-auto flex w-full max-w-md items-center">
            <input
              type="text"
              className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;
