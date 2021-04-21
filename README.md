## Basic Kanban Board 
<h3 align="center">Basic kanban board using react, firebase and hooks</h3>
  <p align="center">
    <a href="https://kanban-board-875ad.web.app/">Live Demo</a>
    ·
    <a href="https://github.com/nicolit/tasks-app-demo/issues">Report Bug</a>
    ·
    <a href="https://github.com/nicolit/tasks-app-demo/issues">Request Feature</a>
      ·
    <a href="https://github.com/nicolit/tasks-app-server">Server Repo</a>
  </p>

### Built with :
Kanbab Board demo requires **React 16.8.0 or later** and **Firebase v8.0.0 or later**.
This project assumes that you’re using the [npm](https://npmjs.com) or [yarn](https://yarnpkg.com/) package managers with a module bundler like [Webpack](https://webpack.js.org/).
<br>
 - [REACTJS](https://reactjs.org/)
 - [Firebase](https://firebase.google.com/)
 - This project was bootstrapped with [Create React App](https://www.npmjs.com/create-react-app)

### Prerequisites

Following dependencies should be installed before getting started.
* npm
```sh
npm install npm@latest -g
```
* create react app
```sh
npm i create-react-app
```

### Installation

1. Clone the repo
      ```sh
      git clone https://github.com/nicolit/tasks-app-demo.git
      ```

2. Install NPM packages
```sh
npm install
```
3. Import project in some editor like VSCode and create a config.js file. Replace all the `<YOUR_API_KEY>` with you firebase API keys.
```sh
    var config = {
      API_KEY : <YOUR_API_KEY>,
      SENDER_ID : <YOUR_SENDER_ID>,
      APP_ID : <YOUR_APP_ID>,
      DOMAIN: <YOUR_DOMAIN>,
      DB_URL: <YOUR_DB_URL>,
      PROJECT_ID: <YOUR_PROJECT_ID>,
      STORAGE_BUCKET: <YOUR_BUCKET>,
    }
```
  
 4. Run `npm start`.

### Available Scripts

Within the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes so it's ready for deployment.

#### `npm run eject`

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

### What to expect in future ?

  - Add more boards
  - Elaborated task form with: user, due date, more text area, tagging of users
  - Allow tasks dragging between board lanes
  - Allow authentication with Google or other sign-in providers
  - Better styling, custom loading spinner
  - Any suggestion is heartly welcomed
  
### License
- See [LICENSE](/LICENSE)

### Contact
- Yael Nicole - @nicolit - yaelisad@gmail.com
