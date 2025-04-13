const admin = require("firebase-admin");
const serviceAccount = require("../../secreto.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function enviarNotificacion(tokenDispositivo, titulo, cuerpo) {
  const mensaje = {
    notification: {
      title: titulo,
      body: cuerpo,
    },
    token: tokenDispositivo,
  };

  try {
    const respuesta = await admin.messaging().send(mensaje);
    console.log("Notificación enviada correctamente:", respuesta);
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
  }
}

module.exports = {enviarNotificacion}
