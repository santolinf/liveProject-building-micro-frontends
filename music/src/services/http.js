import { getToken } from '../boostrap';

export function get(url) {
  return fetch(url, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
