# Quizzer App

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Create a src/firebase-config.js
example: import firebase from 'firebase'
```
const config = {
  apiKey: "xxxxxxxxxx",
  authDomain: "xxxxxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxx.firebaseio.com",
  projectId: "xxxxxxx",
  storageBucket: "xxxxx.appspot.com",
  messagingSenderId: "xxxxxxxxx"
};

export const db = firebase.initializeApp(config).database();
```
