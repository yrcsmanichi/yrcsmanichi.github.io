function getUser() {
  var username = document.getElementById("username").value;
  var asal = document.getElementById("asal").value;
  var ketuaTeam = document.getElementById("ketuaTeam").value;
  var anggota = document.getElementById("anggota").value;
  var score = 0;
  var peserta = ['01', '02', '03', '04']
  if (currentTime >= startTime && currentTime <= endTime) {
    if (username && asal && ketuaTeam && anggota) {
      if (!username.startsWith("0")) {
        alert("GUNAKAN 0, contohnya 01");
        return;
      }
      var timRef = firebase.database().ref(`${username}/info`);
      var dataToSave = {
        asal: asal,
        ketuaTim: ketuaTeam,
        username: username,
        anggota: anggota.split("\n"),
      };

      // Simpan data ke Firebase
      timRef
        .set(dataToSave)
        .then(function () {
          console.log("Data berhasil disimpan ke Firebase!");
        })
        .catch(function (error) {
          console.error(
            "Terjadi kesalahan saat menyimpan data ke Firebase: ",
            error
          );
        });

      document.getElementById("quiz-form").style.display = "block";
      document.getElementById("loginned").style.display = "none";
      document.getElementById("ceknilai").style.display = "none";
      var jawabanRef = firebase.database().ref(`${username}`);
      var quizCompletedRef = firebase
        .database()
        .ref(`${username}/quizCompleted`);
      var userAnswersRef = firebase.database().ref(`${username}/jawaban`);

      if (new Date() >= endTime) {
        quizCompletedRef.on("value", function (snapshot) {
          quizCompleted = snapshot.val() || false;

          if (quizCompleted) {
            document.getElementById("text-h").innerText =
              "SOAL TES PENGETAHUAN LOMBA CERDAS TANGKAS CAKRA 2023 \n KAMU SUDAH MENGERJAKAN TES INI, JIKA ERROR SILAHKAN HUBUNGI PANITIA";
            document.getElementById("ceknilai").innerText =
              "KAMU SUDAH MENGERJAKAN TES INI, JIKA ERROR SILAHKAN HUBUNGI PANITIA";
            alert(
              "KAMU SUDAH MENGERJAKAN TES INI, JIKA ERROR SILAHKAN HUBUNGI PANITIA"
            );
            document.getElementById("btn-submit").style.display = "none";

            var radioButtons = document.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(function (radioButton) {
              radioButton.disabled = true;
            });

            userAnswersRef.once("value").then(function (snapshot) {
              var score = 0;
              var userAnswers = snapshot.val();
              for (var question in userAnswers) {
                if (userAnswers.hasOwnProperty(question)) {
                  if (userAnswers[question] === correctAnswers[question]) {
                    score += score_;
                  }
                }
              }

              var skorContainer = document.getElementById("done");
              skorContainer.innerHTML = `
<div class="card column mt-3" style="display: block">
<div class="card-header">
<h2 class="text-center">SKOR</h2>
</div>
<div class="card-body">
<ul>
<li>Nama Tim: ${username}</li>
<li>Asal Sekolah: ${asal}</li>
<li>Ketua Tim: ${ketuaTeam}</li>
<li>Anggota Tim: <br>-${anggota.split("\n").join("<br>-")}</li>
<li>SKOR: ${score}</li>
</ul>
</div>
</div>`;
            });

            jawabanRef.on("value", function (snapshot) {
              var jawabanData = snapshot.val();
              if (jawabanData) {
                Object.keys(jawabanData).forEach(function (question) {
                  var answer = jawabanData[question];

                  var radioButtons = document.querySelectorAll(
                    'input[type="radio"][name="' + question + '"]'
                  );
                  for (var i = 0; i < radioButtons.length; i++) {
                    if (radioButtons[i].value === answer) {
                      radioButtons[i].checked = true;
                      break;
                    }
                  }
                  console.log("Pertanyaan " + question + ": " + answer);
                });
              }
            });
          } else {
            document.getElementById("btn-submit").click();
          }
        });

        jawabanRef.on("value", function (snapshot) {
          var jawabanData = snapshot.val();
          if (jawabanData) {
            Object.keys(jawabanData).forEach(function (question) {
              var answer = jawabanData[question];
              var radioButtons = document.querySelectorAll(
                'input[type="radio"][name="' + question + '"]'
              );
              for (var i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].value === answer) {
                  radioButtons[i].checked = true;
                  break;
                }
              }
            });
          }
        });
      } else {
        quizCompletedRef.on("value", function (snapshot) {
          quizCompleted = snapshot.val() || false;

          if (quizCompleted) {
            document.getElementById("text-h").innerText =
              "SOAL TES PENGETAHUAN LOMBA CERDAS TANGKAS CAKRA 2023 \n KAMU SUDAH MENGERJAKAN TES INI, JIKA ERROR SILAHKAN HUBUNGI PANITIA";
            document.getElementById("ceknilai").innerText =
              "SOAL TES PENGETAHUAN LOMBA CERDAS TANGKAS CAKRA 2023 \n KAMU SUDAH MENGERJAKAN TES INI, JIKA ERROR SILAHKAN HUBUNGI PANITIA";
            alert(
              "KAMU SUDAH MENGERJAKAN TES INI, JIKA ERROR SILAHKAN HUBUNGI PANITIA"
            );
            document.getElementById("btn-submit").style.display = "none";
            var radioButtons = document.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(function (radioButton) {
              radioButton.disabled = true;
            });
            userAnswersRef.once("value").then(function (snapshot) {
              var userAnswers = snapshot.val();
              var score = 0;
              for (var question in userAnswers) {
                if (userAnswers.hasOwnProperty(question)) {
                  if (userAnswers[question] === correctAnswers[question]) {
                    score += score_;
                  }
                }
              }
              var skorContainer = document.getElementById("done");
              skorContainer.innerHTML = `
<div class="card column mt-3" style="display: block">
<div class="card-header">
<h2 class="text-center">SKOR</h2>
</div>
<div class="card-body">
<ul>
<li>Nama Tim: ${username}</li>
<li>Asal Sekolah: ${asal}</li>
<li>Ketua Tim: ${ketuaTeam}</li>
<li>Anggota Tim: <br>-${anggota.split("\n").join("<br>-")}</li>
<li>SKOR-FLOAT: ${score}</li>
</ul>
</div>
</div>`;
            });
          }

          var inputElements = document.querySelectorAll('input[type="radio"]');
          inputElements.forEach(function (input) {
            input.addEventListener("change", function () {
              if (!quizCompleted) {
                var questionNumber = input.name.replace("question", "");
                var answer = input.value;
                var quizRef = firebase
                  .database()
                  .ref(`${username}/question${questionNumber}`);
                quizRef.set(answer);
              }
            });
          });

          jawabanRef.on("value", function (snapshot) {
            var jawabanData = snapshot.val();
            if (jawabanData) {
              Object.keys(jawabanData).forEach(function (question) {
                var answer = jawabanData[question];
                var radioButtons = document.querySelectorAll(
                  'input[type="radio"][name="' + question + '"]'
                );
                for (var i = 0; i < radioButtons.length; i++) {
                  if (radioButtons[i].value === answer) {
                    radioButtons[i].checked = true;
                    break;
                  }
                }
                console.log("Pertanyaan " + question + ": " + answer);
              });
            }
          });

          document
            .getElementById("quiz-form")
            .addEventListener("submit", function (e) {
              e.preventDefault();

              if (!quizCompleted) {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                document.getElementById("canvas").style.display = "block";
                var answers = {};
                for (var i = 1; i <= 50; i++) {
                  var selectedInput = document.querySelector(
                    'input[name="question' + i + '"]:checked'
                  );
                  if (selectedInput) {
                    answers["question" + i] = selectedInput.value;
                  }
                }

                var score = 0;
                for (var question in answers) {
                  if (answers.hasOwnProperty(question)) {
                    if (answers[question] === correctAnswers[question]) {
                      score += score_;
                    }
                  }
                }

                const now = new Date();
                const hour = String(now.getHours()).padStart(2, "0");
                const minute = String(now.getMinutes()).padStart(2, "0");
                const second = String(now.getSeconds()).padStart(2, "0");

                var timeRef = firebase.database().ref(`${username}/time`);
                timeRef.set(hour + ":" + minute + ":" + second);

                var skorContainer = document.getElementById("done");
                skorContainer.innerHTML = `
<div class="card column mt-3" style="display: block">
<div class="card-header">
<h2 class="text-center">SKOR</h2>
</div>
<div class="card-body">
<ul>
<li>Nama Tim: ${username}</li>
<li>Asal Sekolah: ${asal}</li>
<li>Ketua Tim: ${ketuaTeam}</li>
<li>Anggota Tim: <br>-${anggota.split("\n").join("<br>-")}</li>
<li>SKOR: ${score}</li>
<li>TIME: ${hour}:${minute}:${second}</li>
</ul>
</div>
</div>`;

                var quizRef = firebase.database().ref(`${username}/jawaban`);
                quizRef.set(answers);
                quizCompletedRef.set(true);
                var radioButtons = document.querySelectorAll(
                  'input[type="radio"]'
                );
                radioButtons.forEach(function (radioButton) {
                  radioButton.disabled = true;
                });
              }
            });
        });

        function updateTimer() {
          const currentTime_ = new Date();
          const startTime_ = new Date();
          const endTime_ = new Date();
          // Declare start time and end time
          startTime_.setHours(start, 0, 0);
          endTime_.setHours(end, 0, 0);

          var timeLeft = endTime_ - currentTime_;
          var hours = Math.floor(timeLeft / 3600000);
          var minutes = Math.floor((timeLeft % 3600000) / 60000);
          var seconds = Math.floor((timeLeft % 60000) / 1000);
          var formattedTime = hours + ":" + minutes + ":" + seconds;
          document.getElementById("timer").textContent =
            "Sisa waktu: " + formattedTime;

          if (timeLeft <= 0) {
            document.getElementById("btn-submit").click();
          }
        }

        setInterval(updateTimer, 1000);
      }
    }
  } else {
    if (currentTime < startTime) {
      alert("Waktu belum dimulai");
    } else {
      alert("Waktu sudah selesai");
    }
  }
}

function CekNIlai() {
  let user_nilai = document.getElementById("cek-nilai-user").value;
  let score = 0;

  if (user_nilai) {
    var quizCompletedRef = firebase
      .database()
      .ref(`${user_nilai}/quizCompleted`);
    var userAnswersRef = firebase.database().ref(`${user_nilai}/jawaban`);

    if (quizCompletedRef && userAnswersRef) {
      quizCompletedRef.on("value", function (snapshot) {
        quizCompleted = snapshot.val() || false;

        if (quizCompleted) {
          document.getElementById("btn-submit").style.display = "none";
          var radioButtons = document.querySelectorAll('input[type="radio"]');
          radioButtons.forEach(function (radioButton) {
            radioButton.disabled = true;
          });
          userAnswersRef.once("value").then(function (snapshot) {
            var userAnswers = snapshot.val();
            console.log(userAnswers);

            var totalPoin = 0;
            var salah = 0;
            var benar = 0;
            var terjawab = 0;
            for (const question in userAnswers) {
              const answer = userAnswers[question];
              terjawab += 1
              console.log(`Pertanyaan ${question}: Jawaban: ${answer}`);
              if (answer === correctAnswers[question]) {
                totalPoin += 100 / 15; // Jika jawaban benar, tambahkan 2 poin
                benar += 1
              } else {
                salah += 1
              }
            }
            console.log(totalPoin);

            // for (var question in userAnswers) {
            //   if (userAnswers.hasOwnProperty(question)) {
            //     if (userAnswers[question] === correctAnswers[question]) {
            //       console.log(
            //         correctAnswers[question] + "=" + userAnswers[question]
            //       );
            //       score += 2;
            //       console.log("benar");
            //     } else {
            //       console.log("salah");
            //     }
            //   }
            // }
            let time;
            firebase
              .database()
              .ref(`${user_nilai}/time`)
              .on("value", function (snap) {
                time = snap.val();

                const bobotSoal = 100 / soal;
                const nilai = (benar * bobotSoal).toFixed(1);

                var skorContainer = document.getElementById("done");
                skorContainer.innerHTML = `
<div class="card column mt-3" style="display: block">
<div class="card-header">
<h2 class="text-center">SKOR</h2>
</div>
<div class="card-body">
<ul>
<li>Nama Tim: ${user_nilai}</li>
<li>SKOR: ${nilai}</li>
<li>SKOR-FLOAT: ${totalPoin}</li>
<li>TIME: ${time}</li>
<li>SALAH: ${salah}</li>
<li>BENAR: ${benar}</li>
<li>TERJAWAB: ${terjawab}</li>
<li>TIDAK TERJAWAB: ${soal - terjawab}</li>
</ul>
</div>
</div>`;
              });

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          });
        } else {
          alert("not found/tes belum selesai, tunggu rekap nilai dari panitia");
        }
      });
    } else {
      alert("not found");
    }
  }
}
