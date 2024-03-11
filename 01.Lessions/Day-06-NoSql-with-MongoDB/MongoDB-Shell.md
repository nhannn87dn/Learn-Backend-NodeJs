# MongoDB Shell

## 💛 MongoDB Shell

> TIP: Install extension for VS Code: https://www.mongodb.com/products/vs-code

Một công cụ giúp bạn tương tác với moongoDB không cần đến Model như trên.

### Insert Documents

MongoDB shell cung cấp 2 phương thức để insert documents đến một collection

**Insert a Single Document**

```js
// Select the database to use.
use('api-training');

// The drop() command destroys all data from a collection.
// Make sure you run it against the correct database and collection.
db.movies.drop();

// Insert a few documents into the sales collection.
db.movies.insertOne({
  title: 'The Favourite',
  genres: ['Drama', 'History'],
  runtime: 121,
  rated: 'R',
  year: 2018,
  directors: ['Yorgos Lanthimos'],
  cast: ['Olivia Colman', 'Emma Stone', 'Rachel Weisz'],
  type: 'movie',
});
```

`insertOne()` trả về một document mới kèm theo \_id

**Insert Multiple Documents**

Chèn một lúc nhiều document

```js
use('api-training');
// db.movies.drop();
db.movies.insertMany([
  {
    title: 'Jurassic World: Fallen Kingdom',
    genres: ['Action', 'Sci-Fi'],
    runtime: 130,
    rated: 'PG-13',
    year: 2018,
    directors: ['J. A. Bayona'],
    cast: ['Chris Pratt', 'Bryce Dallas Howard', 'Rafe Spall'],
    type: 'movie',
  },
  {
    title: 'Tag',
    genres: ['Comedy', 'Action'],
    runtime: 105,
    rated: 'R',
    year: 2018,
    directors: ['Jeff Tomsic'],
    cast: ['Annabelle Wallis', 'Jeremy Renner', 'Jon Hamm'],
    type: 'movie',
  },
]);
```

### Update Documents

> Doc: <https://www.mongodb.com/docs/mongodb-shell/crud/update/>

- To update a single document, use
  db.collection.updateOne().

- To update multiple documents, use
  db.collection.updateMany().

- To replace a document, use
  db.collection.replaceOne().

### Delete Documents

> <https://www.mongodb.com/docs/mongodb-shell/crud/delete/>

- To delete multiple documents, use db.collection.deleteMany().

- To delete a single document, use db.collection.deleteOne().

### Query Documents

> <https://www.mongodb.com/docs/mongodb-shell/crud/read/>

Use the db.collection.find() method in the MongoDB Shell to query documents in a collection
