import { NextPage } from 'next';

const Create: NextPage = () => {
  return (
    <div className="space-y-5 py-10 px-4">
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          상품 이름
        </label>
        <div className="relative flex items-center rounded-md shadow-sm">
          <input
            id="name"
            type="email"
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="price"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          금액
        </label>
        <div className="relative flex items-center rounded-md shadow-sm">
          <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
            <span className="text-sm text-gray-500">₩</span>
          </div>
          <input
            id="price"
            type="text"
            className="w-full appearance-none rounded-md border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            placeholder="0.00"
          />
          <div className="pointer-events-none absolute right-0 flex items-center pr-3">
            <span className="text-gray-500">원</span>
          </div>
        </div>
      </div>
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="description"
        >
          상품 설명
        </label>
        <textarea
          id="description"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          rows={4}
        />
      </div>
      <button className="mt-5 w-full rounded-md border-transparent bg-orange-500 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        라이브 가기
      </button>
    </div>
  );
};

export default Create;
