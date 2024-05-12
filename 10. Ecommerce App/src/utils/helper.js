import firebaseAdmin from "firebase-admin";
import {createRequire} from "module";
const require = createRequire(import.meta.url);
const firebaseConfig = require("../../firebaseConfig.json");

const fireAdmin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseConfig),
    storageBucket: "gs://apni-dukaan-bucket.appspot.com"
})


const storageRef = fireAdmin.storage().bucket("gs://apni-dukaan-bucket.appspot.com");

const uploadFile = async (path, fileNameWithFileDestination) =>{
    return storageRef.upload(path, {
        public: true,
        destination: fileNameWithFileDestination,
    })
}


function formatDate(date) {
    // Get day, month, year, hours, minutes, seconds
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    let year = String(date.getFullYear()).slice(-2); // Extract last two digits
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    // Combine date and time components
    let formattedDate = `${day}-${month}-${year} ${hours}-${minutes}-${seconds}`;

    return formattedDate;
}

export {uploadFile, formatDate}
