// FLOW for Unlimited Background Color Project
/* 
1. Generate a function to create hexcode for random numbers
2. Create 2 functions 
    a)Which listens and start changing the color of the background as soon as we click on the start button whose id = "Start"
    b)Which listens and stops changing the color of the background as soon as we clikc on the stop button whose id = "Stop"
3. Edge case that we need to ensure is covered is that, if we click on start twice it doesn't start twice. Also, we need to ensure that 
   if we click on start after clicking on stop it should start again. 
*/

/* Logic behind creating the random colors:
    1. We are going to store all the 16 values of hexcode in a single string.
    2. We will run a loop from 1 to 6 and keep adding the value infront of a '#' in string format
    3. The loop that will be running from 1 to 6 will be picking a random value each time and which will be picked up from the hexcode set we initially provided. 
    4. Once we have the hexcode, we will return a color value, which will go into the iteration for startChangingColor
*/

// Storing functions in variables is called 'function expressions'

const randomColor = () => {
  const hexCodeValues = '0123456789ABCDEF';
  color = '#';
  for (let i = 0; i < 6; i++) {
    color += hexCodeValues[Math.floor(Math.random() * 16)];
  }
  return color;
};

let intervalId; // Defined in global scope to be accessed in stopChaingingColor's scope.

function changeBgColor() {
  document.body.style.backgroundColor = randomColor();
}

let startChangingColor = () => {
  if (!intervalId) {
    // ensures that it doesn't starts again unless stop has been pressed.
    intervalId = setInterval(changeBgColor, 1000);
  }
};

let stopChainingColor = () => {
  clearInterval(intervalId);
  intervalId = null; // To ensure we could restart the color change process
};

// Listens for click on the start and stop button and calls the startChaingColor and stopChainingColor object accordingly.
document.querySelector('#start').addEventListener('click', startChangingColor);
document.querySelector('#stop').addEventListener('click', stopChainingColor);
