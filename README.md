# url-shortner

A small URL shortener I built to practice Express and MongoDB.

Open `localhost:8000`, paste a long URL into the form and you get back a short link like `localhost:8000/url/WzInNznV`. Opening that link redirects you to the original URL, and every visit gets saved in the database. The home page also lists all the links you've made with their click counts.

## Setup

You need Node.js and MongoDB running locally.

```
npm install
cp .env.example .env
npm start
```

Put your own MongoDB connection string in `.env`.

`npm start` runs the server with nodemon so it restarts when you change a file.

## Routes

`GET /` - home page with the form and a table of all short urls

`POST /url` - create a short url. Takes a `url` field (from the form or as JSON) and redirects back to the home page. If you don't send a url you get a 400.

```
curl -X POST http://localhost:8000/url -d "url=https://example.com"
```

`GET /url/:shortId` - redirects to the original url and logs the visit. Unknown ids give a 404.

`GET /url/analytics/:shortId` - shows how many times the link was opened and when

```
{"totalClicks": 2, "analytics": [{"timestamp": 1791097227094, "_id": "..."}, ...]}
```

## Folder structure

```
index.js         server setup and routes
connection.js    connects to MongoDB
routes/          route definitions (url.js for the api, staticRouter.js for pages)
controllers/     the actual logic for each route
models/          mongoose schema
views/           ejs templates
```

## Built with

Express, EJS, Mongoose, nanoid, dotenv
