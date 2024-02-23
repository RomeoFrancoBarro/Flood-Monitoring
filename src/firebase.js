// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";


function StartFirebase() {
    

    const firebaseConfig = {
    apiKey: "AIzaSyApsW5ajQp_66QUwhiij6kra6jFxx7xMuM",
    authDomain: "flood-monitoring-85596.firebaseapp.com",
    databaseURL: "https://flood-monitoring-85596-default-rtdb.firebaseio.com",
    projectId: "flood-monitoring-85596",
    storageBucket: "flood-monitoring-85596.appspot.com",
    messagingSenderId: "321889982248",
    appId: "1:321889982248:web:217e58abe18af05b98a21d",
    measurementId: "G-TQW8JRBNRC"
    };

    const app = initializeApp(firebaseConfig);
    return getDatabase(app);

}

export default StartFirebase;
