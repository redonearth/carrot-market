import { NextPage } from 'next';

const ItemDetail: NextPage = () => {
  return (
    <div className="px-4 py-10">
      <div className="mb-8">
        <div className="h-96 bg-slate-300" />
        <div className="flex cursor-pointer items-center space-x-3 border-b py-3">
          <div className="h-12 w-12 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">Steve Hope</p>
            <p className="text-xs font-medium text-gray-500">
              프로필 보기 &rarr;
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">iPhone 14</h1>
          <span className="mt-3 block text-3xl text-gray-900">₩ 950,000</span>
          <p className="my-6 text-base text-gray-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A cumque
            distinctio possimus dicta quaerat incidunt placeat pariatur
            laboriosam. Hic a eveniet quibusdam eos tempora placeat
            exercitationem mollitia maiores cum. Tempore. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Dicta molestias ullam optio
            voluptatum. Quia velit mollitia similique quam ratione nulla,
            debitis repellat quae magnam ullam, aut magni officiis illo dicta.
          </p>
          <div className="flex items-center justify-between space-x-2">
            <button className="flex-1 rounded-md bg-orange-500 py-3 font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              채팅하기
            </button>
            <button className="flex items-center justify-center rounded-md p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <svg
                className="h-6 w-6 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">비슷한 상품</h2>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="mb-2 h-56 w-full bg-slate-300" />
              <h3 className="-mb-1 text-gray-700">Galaxy S23</h3>
              <span className="text-sm font-medium text-gray-900">
                ₩ 1,000,000
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
