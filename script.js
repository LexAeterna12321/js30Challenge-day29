let CountdownInterval;
const timerDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time");

// funkcja timer oblicza ile sekund ma odliczac timer i wyświetlanie tego poprzez wywołanie funkcji wewnątrz
function timer(seconds) {
  clearInterval(CountdownInterval); // Jeżeli jest jakiś aktywny interval już w użyciu wyczyści go przed wstawieniem nowego. Zapobiega to nakładaniu się odliczania czasu.
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  CountdownInterval = setInterval(() => {
    let secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(CountdownInterval);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// ponieważ setInterval wykonuje się dopiero po pierwszej sekundzie(pierwszym ustawionym timerze) powstała funkcja displayTimeLeft, która pokazuje stan przed pierwszym ticknięciem zegara w setInterval. Wstawiona jest w dwóch miejsach powyżej;
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  timerDisplay.textContent = `${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
  document.title = timerDisplay.textContent;
}

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();

  endTimeDisplay.textContent = `Your timer will end at:
  ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function setTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}
buttons.forEach(button => button.addEventListener("click", setTimer));
// < !--jeżeli jakiś element ma atrubut name w js można się do niego odwołać poprzez document.name, np.document.customForm. Jeżeli w nim zagnieżdżony jest kolejny element możemy się do niego dalej odwoływać np. document.customForm.minutes-- >
// console.log(document.customForm.minutes);
document.customForm.addEventListener("submit", function(e) {
  e.preventDefault();
  //   console.log(this.minutes.value); // odwołanie do węzła z atrybutem name pozwala dostać się do dziecka z this. Super sprawa.
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
