require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  const EMAIL_APP = process.env.EMAIL_APP;
  const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: EMAIL_APP,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"TanIT 👻" <tntan.20it3@vku.udn.vn>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin lịch khám bệnh ✔",
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    <p>Nếu thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới 
    để xác nhận và hoàn tất thủ tục khám bệnh
    </p>
    <div><a href =${dataSend.redirectLink}  target="_blank">Click here</a></div>
    <div>Xin chân thành cảm ơn!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <p>You received this email because you booked an online medical appointment on Booking Care</p>
    <p>Information on scheduling medical examinations:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    
    <p>If the above information is true, please click on the link below to confirm and complete the medical examination procedure
    </p>
    <div><a href =${dataSend.redirectLink}  target="_blank">Click here</a></div>
    <div>Sincerely thank!</div>
    `;
  }
  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care thành công</p>
    <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.</p>
    
    <div>Xin chân thành cảm ơn!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <p>You received this email because you booked an online medical appointment on Booking Care</p>
    <p>Information on scheduling medical examinations:</p>
    
    <div>Sincerely thank!</div>
    `;
  }
  return result;
};
let sendAttachment = async (dataSend) => {
  const EMAIL_APP = process.env.EMAIL_APP;
  const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: EMAIL_APP,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"TanIT 👻" <tntan.20it3@vku.udn.vn>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Kết quả lịch khám bệnh ✔",
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: [
      {
        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        content: dataSend.imgBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};
module.exports = {
  sendSimpleEmail,
  sendAttachment,
};
