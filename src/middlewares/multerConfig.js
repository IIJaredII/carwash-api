const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../datos/imagenes_de_perfil"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, "perfil_" + uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    console.log(file);  // Log del archivo recibido
    const fileTypes = /jpeg|jpg|png|mp4/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
        return cb(null, true);
    } else {
        return cb(new Error("Solo se permiten imágenes PNG, JPG y archivos MP4"));
    }
};


const upload = multer({ storage, fileFilter });


module.exports = upload;