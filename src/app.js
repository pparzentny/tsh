import './assets/scss/app.scss';
import $ from 'cash-dom';
import 'es6-promise/auto';
import 'isomorphic-fetch';
import {Template} from "./template";

export class App {
  initializeApp() {
    let self = this;

    $('.load-username').on('click', function (e) {
      const userName = $('.username.input');

      if(self.validation_field(userName)) {
        fetch('https://api.github.com/users/' + userName.val())
          .then(response => !response.ok ? Promise.reject(response.statusText) : response.json())
          .then(body => {
            const { name, avatar_url, html_url, login, bio } = body
            self.update_profile(name, avatar_url, html_url, login, bio)
          })
          .then(() => {
            fetch('https://api.github.com/users/' + userName.val() + '/events/public')
              .then(response => !response.ok ? Promise.reject(response.statusText) : response.json())
              .then(body => {
                $('#user-timeline').empty()
                body.forEach(event => {
                    self.update_history(event)
                })
              })
          })
          .catch((error) => {
            console.log(error)
          })
      }

    })

  }

  update_profile(name, avatar_url, html_url, login, bio) {
    $('#profile-name').text(name)
    $('#profile-image').attr('src', avatar_url)
    $('#profile-url').attr('href', html_url).text(login)
    $('#profile-bio').text(bio || '(no information)')
  }

  update_history(event) {
    const template = new Template()
    const html_template = template.loader(event)
    if(html_template) {
      $('#user-timeline').append(html_template)
    }
  }

  validation_field(userName) {
    userName.removeClass('is-danger')
    
    let regEx = /^[a-z0-9_-]+$/
    if(!regEx.test(userName.val())) {
      userName.addClass('is-danger')
      return false
    }

    return true
  }
}
