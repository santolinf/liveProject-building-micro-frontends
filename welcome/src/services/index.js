import { post } from './http';

export * from './http';

export function login(formData = {}, onSuccess = () => null, onError = () => null) {
  post(process.env.VUE_APP_LOGIN_URL, formData)
    .then(response => {
      console.log(response.data);
      onSuccess(response.data);
    })
    .catch(error => onError(error));
}

export function goToMusicApp() {
  window.boostrap.router.navigateTo(process.env.VUE_APP_MUSIC_URL);
}