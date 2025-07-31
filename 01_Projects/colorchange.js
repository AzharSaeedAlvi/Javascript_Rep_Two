// Storing the DOM elements in variables.
const buttons = document.querySelectorAll('.button');    // Stores all the elements with class button
const body = document.querySelector('body');             // Stores the value inside the CSS-style element <body>

// Executing a callback function to ensure, all the elements with the class 'button' are selected.
buttons.forEach(function (button) {
  console.log(button);
  // Listen if the a button class element has been clicked, followed by a callback function.
  button.addEventListener('click', function (e) {
    console.log(e);
    console.log(e.target); // Informs us as to where the click came from.
    if (e.target.id === 'grey') {
      body.style.backgroundColor = e.target.id;
    }
  });
});
