const clock = document.querySelector('#clock');  // Stores the DOM element with id="clock" in the constant clock
// setInterval is an inbuilt function in Js, the 'function' you pass is the code that will run after every interval.
setInterval(function(){
let date = new Date();  // Creates a new 'Date' object that stores the current date and time when the line is executed
    clock.innerHTML = date.toLocaleTimeString();   // Converts the date to readable local time string and updates the clock element's content.

}, 1000);