import nodemailer from "nodemailer";

const transport = {
  host: "localhost",
  port: 1025,
  secure: false, // true for 465, false for other ports
};

const transporter = nodemailer.createTransport(transport);

export const sendMail = (content) => {
    transporter.sendMail(content, function (err) {
    if (err) throw err;
  });
};

export const checkTransporter = () => {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
};
