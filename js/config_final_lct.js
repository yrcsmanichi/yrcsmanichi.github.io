const firebaseConfig = {
  apiKey: "AIzaSyAQBdoBDgQ_mKTnwnv6HWEKbv-B60y_scw",
  authDomain: "cakra-c6d7b.firebaseapp.com",
  databaseURL: "https://cakra-c6d7b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cakra-c6d7b",
  storageBucket: "cakra-c6d7b.appspot.com",
  messagingSenderId: "530949308317",
  appId: "1:530949308317:web:a71317d692cb371a853974",
  measurementId: "G-X8VGMPVFX8",
};
const correctAnswers = {
  question1: "b",
  question2: "a",
  question3: "a",
  question4: "c",
  question5: "c",
  question6: "b",
  question7: "c",
  question8: "d",
  question9: "c",
  question10: "c",
  question11: "c",
  question12: "d",
  question13: "b",
  question14: "a",
  question15: "a",
};
const soal = 15;
const score_ = 100 / 15;

const currentTime = new Date();
const startTime = new Date();
const endTime = new Date();

const start = 9; //jam
const sm = 50; //menit

const end = 10; //jam
const endm = 5; //menit
firebase.initializeApp(firebaseConfig);

startTime.setHours(start, 0, 0);
endTime.setHours(end, 0, 0);
