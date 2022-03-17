import { NextPage } from 'next';

const CommunityPostDetail: NextPage = () => {
  return (
    <div>
      <span className="my-3 ml-4 inline-flex items-center rounded-full border-b-[2px] bg-gray-100 px-2.5 py-0.5 pl-4 text-xs font-medium">
        동네 질문
      </span>
      <div className="flex cursor-pointer items-center space-x-3 border-b px-4 py-3">
        <div className="h-12 w-12 rounded-full bg-slate-300" />
        <div>
          <p className="text-sm font-medium text-gray-700">Steve Hope</p>
          <p className="text-xs font-medium text-gray-500">
            프로필 보기 &rarr;
          </p>
        </div>
      </div>
      <div>
        <div className="mt-2 pl-4 text-gray-700">
          <span className="font-medium text-orange-500">Q.</span> 동네에 괜찮은
          두부 전골집 있을까요?
        </div>
        <div className="mt-3 flex w-full space-x-5 border-t border-b-2 px-4 py-2.5 text-gray-700">
          <span className="flex items-center space-x-2 text-sm">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>궁금해요 1</span>
          </span>
          <span className="flex items-center space-x-2 text-sm">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>답변 1</span>
          </span>
        </div>
      </div>
      <div className="my-5 space-y-5 px-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-start space-x-3">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <div>
              <span className="block text-sm font-medium text-gray-700">
                레도
              </span>
              <span className="block text-xs text-gray-500">2시간 전</span>
              <p className="mt-2 text-gray-700">
                정자동에 두부공방이라고 괜찮은 집 있어요!
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4">
        <textarea
          id="description"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          placeholder="답변을 부탁해요!"
          rows={4}
        />
        <button className="mt-2 w-full rounded-md border-transparent bg-orange-500 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          답변하기
        </button>
      </div>
    </div>
  );
};

export default CommunityPostDetail;
