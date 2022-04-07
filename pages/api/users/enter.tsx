import mail from '@sendgrid/mail';
import twilio from 'twilio';
import client from '@libs/server/client';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

mail.setApiKey(process.env.SENDGRID_API_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { email, phone } = req.body;
  const user = email ? { email } : phone ? { phone } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });
  if (email) {
    /* const email = await mail.send({
      from: 'wona23@gmail.com',
      to: 'redo@kakao.com',
      subject: '캐럿 마켓 인증 메일 (테스트)',
      text: `인증 번호는 ${payload}입니다.`,
      html: `<strong>인증 번호는 ${payload}입니다.</strong>`,
    });
    console.log(email); */
  } else if (phone) {
    /* const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: process.env.MY_PHONE!,
      body: `인증 번호는 ${payload}입니다.`,
    });
    console.log(message); */
  }
  return res.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
