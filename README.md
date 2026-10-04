# url-shortner

A small URL shortener I built to practice Express and MongoDB.

You send it a long URL, it gives back an 8 character id. Opening `localhost:8000/<id>` redirects you to the original URL, and every visit gets saved in the database.

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

`POST /url` - create a short url

```
curl -X POST http://localhost:8000/url \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

returns `{"id": "WzInNznV"}`. If you don't send a url you get a 400.

`GET /:shortId` - redirects to the original url and logs the visit. Unknown ids give a 404.

`GET /url/analytics/:shortId` - shows how many times the link was opened and when

```
{"totalClicks": 2, "analytics": [{"timestamp": 1791097227094, "_id": "..."}, ...]}
```

## Folder structure

```
index.js         server setup and routes
connection.js    connects to MongoDB
routes/          route definitions
controllers/     the actual logic for each route
models/          mongoose schema
```

## Built with

Express, Mongoose, nanoid, dotenv
