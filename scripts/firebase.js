// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDpfAkyyKRdP73BdPiO8LgXSf8NYGBqGDc",
    authDomain: "portfolio-c59d9.firebaseapp.com",
    databaseURL: "https://portfolio-c59d9.firebaseio.com",
    projectId: "portfolio-c59d9",
    storageBucket: "portfolio-c59d9.appspot.com",
    messagingSenderId: "281560417786",
    appId: "1:281560417786:web:ccafea5752522ae9b71043",
    measurementId: "G-HF2TFRRJP0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
// var storage = firebase.storage();