# Find Your Art

Find Your Art is a search engine and marketplace for teachers, educators, and facilitators to identify thematically relevant arts content that matches their classrooms, curricula, and curiosities. Arts events (performances and exhibits) and workshops are intended to complement teaching and learning and hosted by partner Arts Organizations and Teaching Artists.

Our goal is to connect educators with valuable artistic experiences for their students and provide access to the arts for all. We seek to promote inclusivity and diversity within the educational community and empower educators to offer enriched artistic experiences to their students.

## Getting started

### Installation

This project uses [Firestore](https://firebase.google.com/docs/firestore) and [Firebase Authentication](https://firebase.google.com/docs/auth) as main services.

We recommend opening your own [Firebase project](https://firebase.google.com/docs/guides), then use your config in `.env` as follows:

```
VITE_MODE=dev
VITE_BASE_URL=http://localhost:5173
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_ID=
VITE_MESSAGE_ID=
VITE_APP_ID=
```

### Upload sample database (optional)

Upload the sample database to your own Firebase project in order to run some components. Currently we import directly `db/categories.json` for some components, but will migrate categories data to Firestore in future work.

1. Go to your Firebase console -> Project settings -> Service accounts -> Generate new private key
2. Save your service account key as `serviceAccountKey.json` and put in `db` directory
3. Open the terminal at the root of the repository

```
$ cd db
$ python upload.py
```

5. Check sample database in Firestore
6. Change to production mode in `.env`

```
VITE_MODE=prod
```

### Run project

1. Clone this repository from branch `main`
2. Install dependencies with `npm install`
3. Run the app with `npm run dev`

## Contributing

1. Pull the latest `main`
2. Create a new branch from `main`
3. Make local changes and commit
4. Run `npm run format`
5. Issue a pull request

## Contact

- CHANGE Arts: Matt Freeman
- Email: info@changearts.org
- Website: changearts.org
- Instagram: [@changeartsusa](https://www.instagram.com/changeartsusa/)
