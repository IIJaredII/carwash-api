const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para puerto 465, false para otros
  auth: {
    user: process.env.IMAIL_USER,
    pass: process.env.IMAIL_PASSWORD,
  },
});


const enviarCorreo = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Carwash El Catracho" <elcatrachocarwash@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    console.log(`✅ Correo enviado con éxito: ${info.messageId}`);
    return { success: true, messageId: info.messageId, accepted: info.accepted, rejected: info.rejected };
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { enviarCorreo };