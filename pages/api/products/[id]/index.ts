import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const product = await client.product.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(' ').map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.record.findFirst({
      where: {
        productId: product?.id,
        userId: user?.id,
        kind: 'favorites',
      },
      select: {
        id: true,
      },
    })
  );
  if (!product) {
    res.status(404).json({
      ok: false,
      error: '상품을 찾을 수 없습니다!',
    });
  }
  res.json({
    ok: true,
    product,
    isLiked,
    relatedProducts,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
