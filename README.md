# tylers-weekly-planner
A simple weekly and daily planner that fits the way I like to plan my weeks.'

To set up firebase create a file in `frontend` called `.env` or alternativly a `.env.production` and a `.env.development` and fill in the following
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

Change firebase rules to 
```
{
    "rules": {
        ".read": true,
        ".write": true
    }
}
```
