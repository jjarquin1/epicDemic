const logout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert('already logged out');
    document.location.replace('/login');
  }
};

const logoutForm = document
if(logoutForm) document.querySelector('#logout').addEventListener('click', logout);
