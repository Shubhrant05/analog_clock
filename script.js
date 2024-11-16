const clock = document.querySelector(".clock");
const minuteHand = document.querySelector(".minute-hand");
const hourHand = document.querySelector(".hour-hand");
const secondHand = document.querySelector(".second-hand");
const gong = document.getElementsByClassName(".gong")

function addNumbers() {
  const clockRadius = window.innerHeight * 0.25; // Radius of the clock in px
  const numberRadius = clockRadius - (0.02 * window.innerHeight); // Adjust radius for number positioning
  const centerX = clockRadius;
  const centerY = clockRadius;

  // for minutes and hours
  for (let i = 1; i <= 60; i++) {
    const angle = i * 6 * (Math.PI / 180); // Convert degrees to radians
    const x = centerX + numberRadius * Math.sin(angle);
    const y = centerY - numberRadius * Math.cos(angle);
    let number = 1;
    if (i % 5 === 0) {
      number = document.createElement("div");
      number.className = "number";
      number.textContent = i / 5;
      number.style.left = `${x}px`;
      number.style.top = `${y}px`;
    } else {
      number = document.createElement("div");
      number.className = "number";
      number.textContent = "∙";
      number.style.left = `${x}px`;
      number.style.top = `${y}px`;
      number.style.bottom = `${y}px`;
    }

    clock.appendChild(number);
  }
}

function updateClock() {
  const now = new Date();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const seconds = now.getSeconds();

  const secondRotaion = (seconds / 60) * 360;
  secondHand.style.transform = `translate(-50%, -100%) rotate(${secondRotaion}deg)`;

  // Calculate the minute hand rotation (0-360 degrees)
  const minuteRotation = ((minutes % 60) / 60) * 360 + (seconds / 60) * 6;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteRotation}deg)`;

  // Calculate the hour hand rotation (0-360 degrees)
  const hourRotation = ((hours % 12) / 12) * 360 + (minutes / 60) * 30; // Account for the hour hand movement with minutes
  hourHand.style.transform = `translate(-50%, -100%) rotate(${hourRotation}deg)`;
}

function addDate() {
  const clockRadius = window.innerHeight * 0.25;
  const dateCenterX = clockRadius - 20;
  const dateCenterY = clockRadius - window.innerHeight * 0.125;

  const currentDate = new Date().getDate();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' }).substring(0, 3);
  
  const date = document.createElement("div");
  date.className = "date";
  date.textContent = currentDate.toString()+' | '+currentMonth.toString();
  date.style.left = `${dateCenterX}px`;
  date.style.top = `${dateCenterY}px`;
  date.style.position = "absolute";
  date.style.color = "white";
  document.querySelector(".clock").appendChild(date);
}

setInterval(() => {
  gong.style.animation = 'none'; // Reset animation
  gong.offsetHeight; // Trigger a reflow to restart the animation
  gong.style.animation = 'pendulum-swing 1s infinite ease-in-out'; // Apply animation again
}, 1000);


addNumbers();
addDate();
setInterval(updateClock, 1000);
updateClock();
