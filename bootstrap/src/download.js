/**
 * We use {@link XMLHttpRequest} to download index.html of the micro frontend.
 * To parse the HTML we must set <code>xhr.responseType = "document"</code>
 * and must be an asynchronous call.
 */
function download(microFrontendName) {

  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        resolve(this.response);
      }

      xhr.onerror = function(error) {
        reject(error);
      }

      xhr.open('GET',  `/mfe/${microFrontendName}/index.html`);
      xhr.responseType = "document";
      xhr.send();
    }
  );
}

export default download;
