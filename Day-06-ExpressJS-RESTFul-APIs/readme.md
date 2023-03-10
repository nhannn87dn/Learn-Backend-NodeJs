# Project structure Express and Node.Js

Xây dựng cấu trúc dự án RESTFul-APIs với Node.Js và Express CHUẨN đi làm

> Tiếp tục maintenance project theo Follow

## 💛 Làm tiếp RESTFul-APIs

- Categories
- Products
- Order
- Customer

## 💛 Advanceds

Sử dụng một số thư viện nâng cao

- passportjs
- Upload files
- Redis Cache

## 💛 MongoDB Shell

> Install extension for VS Code: https://www.mongodb.com/products/vs-code

### Insert Documents

**The MongoDB shell provides the following methods to insert documents into a collection:**

- To insert a single document, use db.collection.insertOne() .

- To insert multiple documents, use db.collection.insertMany() .

#### Insert a Single Document

`db.collection.insertOne()` inserts a single document into a collection. If the document does not specify an \_id field, MongoDB adds the \_id field with an ObjectId value to the new document.

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

`insertOne()` returns a document that includes the newly inserted document's \_id field value.

#### Insert Multiple Documents

`db.collection.insertMany()` can insert multiple documents into a collection. Pass an array of documents to the method. If the documents do not specify an \_id field, MongoDB adds the \_id field with an ObjectId value to each document.

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

#### Update Documents

> https://www.mongodb.com/docs/mongodb-shell/crud/update/

The MongoDB shell provides the following methods to update documents in a collection:

- To update a single document, use db.collection.updateOne().

- To update multiple documents, use db.collection.updateMany().

- To replace a document, use db.collection.replaceOne().

#### Delete Documents

> https://www.mongodb.com/docs/mongodb-shell/crud/delete/

The MongoDB shell provides the following methods to delete documents from a collection:

- To delete multiple documents, use db.collection.deleteMany().

- To delete a single document, use db.collection.deleteOne().

#### Query Documents

> https://www.mongodb.com/docs/mongodb-shell/crud/read/

Use the `db.collection.find()` method in the MongoDB Shell to query documents in a collection.

### Query & Aggregation

Using MongoDB query & aggregation

Populate
