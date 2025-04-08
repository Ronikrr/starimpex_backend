import {
  APP_URL,
  COMPANY_ADDRESS,
  COMPANY_LOGO,
  INFO_EMAIL,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_SERVICE,
  SENDER_EMAIL_ID,
  SENDER_EMAIL_PASSWORD,
  SENDER_NAME,
  SUPPORT_EMAIL,
} from '@/config';
import nodemailer from 'nodemailer';
import { logger } from './logger';
import { Order } from '@/models/order.model';
import { User } from '@/models/users.model';
import { formatDate } from './helpers';

const basicTransportConfig = MAIL_SERVICE
  ? {
      service: MAIL_SERVICE,
    }
  : {
      host: MAIL_HOST,
      secure: MAIL_SECURE === 'true',
      port: Number(MAIL_PORT),
    };

const transportConfig: any = {
  ...basicTransportConfig,
  auth: {
    user: SENDER_EMAIL_ID,
    pass: SENDER_EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(transportConfig);

const mailTemplate = (title: string, mainContent: string, attachments: any = []) => {
  return {
    html: `<div style='border: 1px solid #024093; border-radius:5px;max-width:600px;margin:auto;overflow:hidden;color:black;'>
  <div style='padding: 5px;background-color: #70aeff;'>
      <h2 style='text-align: center;text-transform:uppercase;'>${title}</h2>
  </div>
  <div style='background-color: #f0f6fe;text-align:center;padding:30px;'>
    <div>
      <img src="cid:logo" style="aspect-ratio:3/2;height:40px;" />
    </div>
    <p>Greetings from Motiba Gems!</p>
    <div style='padding: 15px;'>
      ${mainContent}
      <p style="text-align:left;">
        Regards, <br/>
        The Motiba Gems Team.
      </p>
    </div>
    <p>If you need help or have questions, please send email to ${INFO_EMAIL}</p>
  </div>
  <div style='border-top:1px solid #024093;padding-top: 30px;padding-bottom:15px;background-color: #f0f6fe;'>
    <p style='text-align:center;width:60%;margin:auto;'>${COMPANY_ADDRESS}</p>
    <p style='text-align:center;color:grey;'>© Motiba Gems</p>
  </div>
</div>`,
    attachments: [
      {
        filename: 'logo.png',
        path: COMPANY_LOGO,
        cid: 'logo',
      },
      ...attachments,
    ],
  };
};

export const sendForgotPasswordMail = (email: string, hash: string) => {
  const mailOption = {
    from: `"${SENDER_NAME}" <${SENDER_EMAIL_ID}>`,
    to: email,
    subject: 'Reset Your Password for Motiba Gems',
    ...mailTemplate(
      'Reset Password',
      `<p>It seems you've forgotten your password. No worries - we're here to help you regain access to your account.Please follow the link below to reset your password:<p>
       <p>${APP_URL}/reset-password?email=${email}&hash=${hash}<p>
       <p>If you didn't initiate this request or have any concerns, please disregard this email. Your account security is our priority.<p>`,
    ),
  };

  transporter.sendMail(mailOption, (err: any, info: any) => {
    if (err) {
      logger.error('>>>>>> EMAIL error :: ');
      logger.error(err);
      return;
    }

    logger.info(JSON.stringify(info));
  });
};

export const sendContactUsMail = async ({
  firstName,
  lastName,
  email,
  phone,
  country,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}) => {
  try {
    await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL_ID}>`,
      to: email,
      subject: 'Contact Request',
      ...mailTemplate('REQUEST SENT SUCCESSFULLY', `We have received your request and our team will contact you soon. Thank you for your patience.`),
    });

    await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL_ID}>`,
      to: SUPPORT_EMAIL,
      subject: 'New Contact Request',
      html: `
        <h2>NEW CONTACT REQUEST</h2>
        <p><strong>Name: </strong> ${firstName} ${lastName}</p>
        <p><strong>Email: </strong> ${email}</p>
        <p><strong>Phone: </strong> ${phone || ''}</p>
        <p><strong>Country: </strong> ${country}</p>
        <p><strong>Message: </strong> ${message}</p>
      `,
    });
  } catch (error) {
    logger.error('===========================');
    logger.error('CONTACT US >>> Error while sending mail');
    logger.error(error);
  }
};

export const sendInquiryMail = async ({
  firstName,
  lastName,
  email,
  phone,
  country,
  message,
  companyName,
  diamondType,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  companyName: string;
  diamondType: string;
}) => {
  try {
    await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL_ID}>`,
      to: email,
      subject: 'Inquiry Request',
      ...mailTemplate('REQUEST SENT SUCCESSFULLY', `We have received your request and our team will contact you soon. Thank you for your patience.`),
    });

    await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL_ID}>`,
      to: SUPPORT_EMAIL,
      subject: 'New Inquiry Request',
      html: `
        <h2>NEW INQUIRY REQUEST</h2>
        <p><strong>Name: </strong> ${firstName} ${lastName}</p>
        <p><strong>Email: </strong> ${email}</p>
        <p><strong>Phone: </strong> ${phone || ''}</p>
        <p><strong>Country: </strong> ${country}</p>
        <p><strong>Message: </strong> ${message}</p>
        <p><strong>Company Name: </strong> ${companyName || ''}</p>
        <p><strong>Diamond Type: </strong> ${diamondType ? diamondType.replace('_', ' ').toUpperCase() : ''}</p>
      `,
    });
  } catch (error) {
    logger.error('===========================');
    logger.error('INQUIRY >>> Error while sending mail');
    logger.error(error);
  }
};

export const sendPlacedOrderMail = async ({ user, order, excelBuffer }: { user: User; order: Order; excelBuffer: any }) => {
  try {
    await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL_ID}>`,
      to: user.email,
      subject: `Thanks for your order! Confirmation Pending (Order #${order?.orderNumber})`,
      ...mailTemplate(
        'Order Details',
        `
        <div style="text-align:left;">
        <p>Hello ${user.fullName}, </p>
        <p>Thank you for your order! We've received your request (#${order?.orderNumber}) and it's currently being reviewed.
        Your key account manager will contact you soon in IST.</p>

        <h3><strong>Order Summary:</strong></h3>
        <p><strong>Order Number</strong>: #${order?.orderNumber}</p>
        <p><strong>Total Stones</strong>: ${order.totalStones}</p>
        <p><strong>Total Carats</strong>: ${order.totalCarats}</p>
        <p><strong>Gross Amount</strong>: $${order.grossAmount}</p>
        </div>
      `,
        [
          {
            filename: `Order_${order.orderNumber}_${formatDate(new Date())}.xlsx`,
            content: excelBuffer,
          },
        ],
      ),
    });
  } catch (error) {
    logger.error('===========================');
    logger.error('Order placed success mail >>> Error while sending mail');
    logger.error(error);
  }
};

export const sendChangePasswordMail = (email: string, hash: string) => {
  const mailOption = {
    from: `"${SENDER_NAME}" <${SENDER_EMAIL_ID}>`,
    to: email,
    subject: 'Reset Your Password for Motiba Gems',
    ...mailTemplate(
      'Reset Password',
      `<p>You recently requested to reset your password for your account for Motiba Gems.Please follow the link below to reset your password:<p>
       <p>${APP_URL}/reset-password?email=${email}&hash=${hash}<p>
       <p>If you didn't initiate this request or have any concerns, please disregard this email. Your account security is our priority.<p>`,
    ),
  };

  transporter.sendMail(mailOption, (err: any, info: any) => {
    if (err) {
      logger.error('>>>>>> EMAIL error :: ');
      logger.error(err);
      return;
    }

    logger.info(JSON.stringify(info));
  });
};

export const sendDiamondDataExcelMail = async ({ email, excelBuffer }: { email: string; excelBuffer: any }) => {
  try {
    await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL_ID}>`,
      to: email,
      subject: `Motiba Gems: Stone Details`,
      ...mailTemplate(
        'Stone Details',
        `
        <div style="text-align:left;">
        <p>Hello, </p>
        <p>Kindly find the attachment for stone details.</p>
        </div>
      `,
        [
          {
            filename: `Stone_Details_${formatDate(new Date())}.xlsx`,
            content: excelBuffer,
          },
        ],
      ),
    });
  } catch (error) {
    logger.error('===========================');
    logger.error('Send diamond excel mail >>> Error while sending mail');
    logger.error(error);
  }
};

export const sendSignUpMail = async (user: User) => {
  try {
    await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL_ID}>`,
      to: user.email,
      subject: 'Registration Successful',
      ...mailTemplate(
        'WELCOME',
        `
        <div style="text-align:left;">
        <p>Hello ${user.fullName}, </p>
        <p>Thank you for signing up and your interest in Motiba Gems. We received your signup information and are excited to have you join us.</p>
        <p>To ensure a great experience for everyone, we manually review all new accounts. This allows us to maintain a high level of quality and security within our platform.</p>
        <p>We appreciate your patience during the approval process. In the meantime, if you have any questions, please don't hesitate to reach out to our support team.</p>
        </div>
        `,
      ),
    });
  } catch (error) {
    logger.error('===========================');
    logger.error('SIGN UP >>> Error while sending mail');
    logger.error(error);
  }
};
