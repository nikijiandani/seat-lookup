function displayResult({ first_name, floor, seat }) {
  resultContainer.innerHTML = `
    <p>${first_name} is seated on</p>
    <p>Floor ${floor}</p>
    <p>Seat ${seat}</p>
  `;
}

function displayError(firstName = '', lastName = '') {
  if (firstName.length > 10 || lastName.length > 10) {
    resultContainer.innerHTML = `
      <p id="error">Sorry, cannot find</p>
      <p id="error">${truncateString(firstName)} in the system</p>
    `;
  } else {
    resultContainer.innerHTML = `
      <p id="error">Sorry, cannot find</p>
      <p id="error">${firstName} ${lastName} in the system</p>
    `;
  }
}

function truncateString(str) {
  return str.slice(0, 9) + '...';
}

async function fetchResults(firstName, lastName) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/people?firstName=${firstName}&lastName=${lastName}`
    );
    const myJson = await response.json();
    return myJson;
  } catch (err) {
    console.log(err);
  }
}

function handleChange(e) {
  if (e.key === 'Enter') {
    const nameArr = e.target.value.split(' ');
    fetchResults(nameArr[0], nameArr[1]).then(data => {
      if (data.length > 0) displayResult(data[0]);
      else displayError(nameArr[0], nameArr[1]);
    });
  }
}

function handleClick() {
  let nameArr = document.querySelector('.search').value.split(' ');
  fetchResults(nameArr[0], nameArr[1]).then(data => {
    if (data.length > 0) displayResult(data[0]);
    else displayError(nameArr[0], nameArr[1]);
  });
}

const input = document.querySelector('.search');
const button = document.querySelector('#button');
const resultContainer = document.querySelector('#seat-location-container');
input.addEventListener('keydown', handleChange);
button.addEventListener('click', handleClick);
