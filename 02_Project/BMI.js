const form = document.querySelector('form');
// Will Store an empty value in height since the script is executed as soon as we execute the code.
// const height = pareseInt(document.querySelector('#height').value);

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevents the default action to occur | By default the submit event type refreshes the page for a 'from' object.
  // The reason for storing these DOM elements inside a variable inside the EventListner, is because we want to check what value is being stored.
  // Once the user has clicked on the Submit button.
  // .value gives the value stored in the DOM element.
  // parseInt is used, since the .value would have stored the value in string format.
  const height = parseInt(document.querySelector('#height').value);
  const weight = parseInt(document.querySelector('#weight').value);
  const result = document.querySelector('#results');
  const value = document.querySelector('#val');

  // To prevent exception error.

  if (height === '' || height < 0 || isNaN(height)) {
    result.innerHTML = `Please enter a valid height`;
  } else if (weight === '' || weight < 0 || isNaN(weight)) {
    result.innerHTML = `Please enter a valid weight`;
  } else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2); // To ensure it give value upto 2 decimal points
    result.innerHTML = `<span> ${bmi} </span>`;
    if (bmi > 24.6) {
      value.innerHTML = `Fatty`;
    } else if (bmi < 18.6) {
      value.innerHTML = `skinny`;
    } else if (bmi < 24.6 && bmi > 18.6) {
      value.innerHTML = `Fit`;
    }
  }
});
