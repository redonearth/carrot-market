import { NextPage } from 'next';

const Write: NextPage = () => {
  return (
    <div className="px-4 py-10">
      <textarea
        id="description"
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        placeholder="질문을 해보세요!"
        rows={4}
      />
      <button className="mt-2 w-full rounded-md border-transparent bg-orange-500 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        작성하기
      </button>
    </div>
  );
};

export default Write;
