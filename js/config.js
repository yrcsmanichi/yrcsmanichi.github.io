const firebaseConfig = {
  apiKey: "AIzaSyBEVGasd-9VY524jx9tQL4Rkzi0Zwq7mn8",
  authDomain: "fasilitators.firebaseapp.com",
  databaseURL:
    "https://fasilitators-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fasilitators",
  storageBucket: "fasilitators.appspot.com",
  messagingSenderId: "744679241873",
  appId: "1:744679241873:web:36a5342acc3242789fa730",
  measurementId: "G-MLH54WLRWC",
};
const correctAnswers = {
  question1: "a", //
  question2: "b", //
  question3: "b",//
  question4: "c",//
  question5: "b",//
  question6: "d",//
  question7: "a",//
  question8: "b",//
  question9: "c", //
  question10: "b",//
  question11: "a",//
  question12: "c",//
  question13: "b",//
  question14: "b",//
  question15: "d",//
  question16: "b",//
  question17: "a",//
  question18: "d",//
  question19: "b",//
  question20: "d",//
  question21: "d", //gambaer
  question22: "a", //22
  question23: "a",
  question24: "c",
  question25: "a",
  question26: "b",
  question27: "a",
  question28: "d",
  question29: "a",
  question30: "c",
  question31: "a",
  question32: "b",
  question33: "c",
  question34: "c",
  question35: "c",
  question36: "b",
  question37: "c",
  question38: "b",
  question39: "b",
  question40: "c",
  question41: "a",
  question42: "a",
  question43: "d",
  question44: "b",
  question45: "d",
  question46: "b",
  question47: "d",
  question48: "c",
  question49: "d",
  question50: "b",
};
const soal = 50;
const score_ = 2;
const currentTime = new Date();
const startTime = new Date();
const endTime = new Date();
const start = 11;
const end = 24;
firebase.initializeApp(firebaseConfig);

startTime.setHours(start, 0, 0);
endTime.setHours(end, 0, 0);
