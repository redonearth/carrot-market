import { NextPage } from 'next';
import Layout from '../../components/layout';
import Message from '../../components/message';

const Stream: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-4 py-10 px-4">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">iPhone 14</h1>
          <span className="mt-3 block text-2xl text-gray-900">₩ 950,000</span>
          <p className="my-6 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            saepe odio ipsam ut incidunt facere necessitatibus ea assumenda
            debitis ullam dolorum ipsum exercitationem, dolorem, esse libero
            iusto dolores laborum! Accusamus.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">라이브 채팅</h2>
          <div className="h-[50vh] space-y-4 overflow-y-scroll py-10 px-4 pb-16">
            <Message message="안녕하세요. 다비드 투수 글러브 문의 드립니다." />
            <Message message="10만원 네고 가능할까요?" />
            <Message message="미쳤어?" reversed />
          </div>
          <div className="fixed inset-x-0 bottom-0 bg-white py-2">
            <div className="relative mx-auto flex w-full max-w-md items-center">
              <input
                type="text"
                className="w-full rounded-full border-gray-700 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="flex items-center rounded-full bg-orange-500 px-3 text-white hover:bg-orange-600 focus:ring-2 focus:ring-offset-2">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
