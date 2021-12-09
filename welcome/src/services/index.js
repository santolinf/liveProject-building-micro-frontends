import { post } from './http';
import { setToken } from '../bootstrap';

export * from './http';

export function login(formData = {}, onSuccess = () => null, onError = () => null) {
  post(process.env.VUE_APP_LOGIN_URL, formData)
    .then(response => {
      console.log(response.data);
      setToken(response.data.token);
      onSuccess(response.data);
    })
    .catch(error => onError(error));
}
