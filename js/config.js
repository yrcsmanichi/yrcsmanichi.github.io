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
  question1: "c",
  question2: "d",
  question3: "c",
  question4: "a",
  question5: "d",
  question6: "d",
  question7: "a",
  question8: "a",
  question9: "d",
  question10: "b",
  question11: "d",
  question12: "c",
  question13: "c",
  question14: "b",
  question15: "b",
  question16: "c",
  question17: "a",
  question18: "c",
  question19: "a",
  question20: "c",
  question21: "b",
  question22: "b",
  question23: "b",
  question24: "b",
  question25: "b",
  question26: "d",
  question27: "c",
  question28: "a",
  question29: "b",
  question30: "b",
};
const soal = 30;
const score_ = 3.3;
const currentTime = new Date();
const startTime = new Date();
const endTime = new Date();
const start = 11;
const end = 24;
firebase.initializeApp(firebaseConfig);

startTime.setHours(start, 0, 0);
endTime.setHours(end, 0, 0);