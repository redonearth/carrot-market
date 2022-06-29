import client from '@libs/server/client';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  if (req.method === 'POST') {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    await res.revalidate('/community');
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === 'GET') {
    const {
      query: { latitude, longitude },
    } = req;
    const parsedLatitude = parseFloat(latitude!.toString());
    const parsedLongitude = parseFloat(longitude!.toString());
    client.$queryRaw`SET SESSION sql_mode =
    'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';`.then(
      async () => {
        const posts = await client.post.findMany({
          where: {
            latitude: {
              gte: parsedLatitude - 0.01,
              lte: parsedLatitude + 0.01,
            },
            longitude: {
              gte: parsedLongitude - 0.01,
              lte: parsedLongitude + 0.01,
            },
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            _count: {
              select: {
                curiosities: true,
                answers: true,
              },
            },
          },
        });
        res.json({
          ok: true,
          posts,
        });
      }
    );
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
