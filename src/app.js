import './assets/scss/app.scss';
import $ from 'cash-dom';
import 'es6-promise/auto';
import 'isomorphic-fetch';

export class App {
  initializeApp() {
    let self = this;

    $('.load-username').on('click', function (e) {
      let userName = $('.username.input').val();

      fetch('https://api.github.com/users/' + userName)
        .then(response => !response.ok ? Promise.reject(response.statusText) : response.json())
        .then(body => {
          const { name, avatar_url, html_url, login, bio } = body
          self.update_profile(name, avatar_url, html_url, login, bio)
        })
        .catch((error) => {
          console.log(error)
        })

    })

  }

  update_profile(name, avatar_url, html_url, login, bio) {
    $('#profile-name').text(name)
    $('#profile-image').attr('src', avatar_url)
    $('#profile-url').attr('href', html_url).text(login)
    $('#profile-bio').text(bio || '(no information)')
  }
}
