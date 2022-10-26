const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./public/upload");
    },
    filename: function (req, file, cb) {
        const mimeExtension = {
            'image/jpeg': '.jpeg',
            'image/jpg': '.jpg',
            'image/png': '.png'
        }
        cb(null, file.originalname + '-' + Date.now() + mimeExtension[file.mimetype]);
    }
});

const uploadImage = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg'||
        file.mimetype === 'image/jpg'||
        file.mimetype === 'image/png'){
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});
// module.exports = (multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, "./public/upload");
//         },
//         filename: (req, file, cb) => {
//             cb(null, Date.now().toString() + "_" + file.originalname);
//         }
//     }),
//     fileFilter: (req, file, cb) => { //extensoes permitidas
//         const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg']
//             .find(formatoAceito => formatoAceito == file.mimetype)
//         if(extensaoImg) {
//             return cb(null, true);
//         }
//         return cb(null, false);
//     }

// }));
module.exports = uploadImage;
