import { ProductWithFavoritesCount } from 'pages';
import useSWR from 'swr';
import Item from './item';

interface ProductListProps {
  kind: 'sales' | 'purchases' | 'favorites';
}

interface Record {
  id: number;
  product: ProductWithFavoritesCount;
}

interface IProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<IProductListResponse>(
    `/api/users/me/records?kind=${kind}`
  );
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          key={record.id}
          id={record.product.id}
          title={record.product.name}
          price={record.product.price}
          image={record.product.image}
          hearts={record.product._count.records}
        />
      ))}
    </>
  ) : null;
}
