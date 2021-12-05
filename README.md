# Building Micro Frontends with a Team-Based Vertical Architecture

## Bootstrap
Bootstrap is the client-side orchestrator in our vertical micro frontend architecture. 
One of Bootstrap’s core tasks: loading a micro frontend into the current page.

## Finding Micro Frontend Resources
* adjust the (app context) paths at which resources are served in the two micro frontends

> For the React based app add the following in `package.json`:

>      "homepage": "/mfe/music/",


> For the Vue based app add the following in `vue.config.js`:

>       module.exports = {
>         publicPath: '.'
>       }

> and also the *Vue Router* base should be set to `base: 'hello'`:

>       const router = new VueRouter({
>       mode: 'history',
>       base: process.env.VUE_APP_BASE_URL,
>       routes: [
>           ...

> and we can define the env variable in `.env`:

>       VUE_APP_BASE_URL=/hello


* create a `<base>` element (in the index.html file) in order to specify the base path of the resources

> For example, for the React based app the base element looks like

>       <base href="/mfe/music/">

## Public API
A (Boostrap) public API is created and exposed for all Micro Frontends to consume.

The public API is exposed through the Window object at `window.bootstrap`.

### Navigating Between Micro Frontends
When navigating from one Frontend to another, we need to:

* unmount the current Frontend on the page (remove all relevant nodes)
* download and mount the new Frontend
* update the URL on the browser (to reflect the appropriate pathname)

For example, to navigate to the *Music* Micro Frontends use:

    window.boostrap.router.navigateTo('/play')

and to the *Welcome* Micro Frontend use:

    window.boostrap.router.navigateTo('/hello')

### Micro Frontend Lifecycle Eventing
From within a Micro Frontend you can register for getting informed of the different stages 
of the mounting process.

```javascript
window.document.addEventListener(window.boostrap.eventNames.MICRO_FRONTEND_WILL_MOUNT,
  () => console.log('micro frontend WILL mount')
);

window.document.addEventListener(window.boostrap.eventNames.MICRO_FRONTEND_DID_MOUNT,
  () => console.log('micro frontend DID mount')
);

window.document.addEventListener(window.boostrap.eventNames.MICRO_FRONTEND_WILL_UNMOUNT,
  () => console.log('micro frontend WILL unmount')
);

window.document.addEventListener(window.boostrap.eventNames.MICRO_FRONTEND_DID_UNMOUNT,
  () => console.log('micro frontend DID unmount')
);
```
