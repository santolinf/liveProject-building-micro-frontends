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

