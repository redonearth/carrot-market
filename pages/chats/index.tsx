import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '@components/layout';

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1px]">
        {[...Array(7)].map((_, i) => (
          <Link key={i} href={`/chats/${i}`}>
            <a className="flex cursor-pointer items-center space-x-3 px-4 py-3">
              <div className="h-12 w-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-gray-700">칵승규</p>
                <p className="text-sm font-medium text-gray-500">
                  내일 오후 2시에 수내역 2번 출구에서 만나요!
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
