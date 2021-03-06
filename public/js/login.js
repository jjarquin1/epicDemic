const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log(data)

    if (response.ok) {
      // If successful, redirect the browser to the game page
      alert("SUCESSFULLY LOGGED IN!")
      document.location.replace('/game');
    } else {
      alert("WRONG EMAIL OR PASSWORD, TRY AGAIN!");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  alert("REGISTRATION COMPLETE!")
  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/user/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log(data)
    // if (response.ok) {
    //   document.location.replace('/profile');
    // } else {
    //   alert(response.statusText);
    // }
  }
};

const loginForm = document
  .querySelector('.form-group');
if (loginForm) loginForm.addEventListener('submit', loginFormHandler);

const registerForm = document
  .querySelector('.form-detail');
if (registerForm) registerForm.addEventListener('submit', signupFormHandler);

