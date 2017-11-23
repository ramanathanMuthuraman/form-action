(function () {
  const apiCall = (url, options = {}) => {
    return fetch(url, options);
  };
  const showError = () => {
    document.getElementById('error-message').classList.remove('hide');
    document.getElementById('success-message').classList.add('hide');
  };

  const hideError = () => {
    document.getElementById('error-message').classList.add('hide');
    document.getElementById('success-message').classList.remove('hide');
  };

  const submitSong = (songURL) => {
    apiCall('api/songs', {
      method: "POST",
      body: JSON.stringify({songURL}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(
      () => {
        hideError();
      }
    ).catch((err) => {
      showError();
      console.log('Fetch Error', err);
    });
  };
  const isValid = (songURL) => {
    return !!songURL;
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const songURL = document.getElementById('song-url').value;
    isValid(songURL) ? submitSong(songURL) : showError();
  };
  document.getElementById('next').addEventListener('click', formSubmit);
})();