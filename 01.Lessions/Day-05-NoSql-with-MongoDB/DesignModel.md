# When to use embedded vs reference schema in Mongoose


When creating a MongoDB schema in Mongoose, your decision boils down into 2 main choices: embedding or referencing. You can choose to embed like this:

```js
const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: AddressSchema,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

```

Notice how the address schema is embedded into the user schema. The other option you can do is to reference; however, there are 2 ways to reference:

Reference by a single value
Use an array of references
I’ll give you an example based on a movie web app I’m working on. Here is an example of referencing by a single value:

```js

// user.model.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    authId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",  // Auth model has 2 fields: username and password
        required: [true, "Please provide authId"],
        unique: [true, "The authId already exists"]
    },
    watchList: [Number]
    ratings: {
        type: Map,
        of: Number,
        default: new Map(),
    },
});

module.exports = mongoose.model.User || mongoose.model("User", UserSchema);
```

```js
// favorites.model.js
const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movieId: {
        type: Number,
        required: true,
        index: true
    },
    genre: {
        type: [String]
    },
    imageUrl: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now(),
        index: true
    },
});

FavoritesSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model.Favorites || mongoose.model("Favorites", FavoritesSchema);

```
In the code, we used a single reference in the Favorites schema for userId to point to the _id of a User document. We also used a single reference in the User schema for userId to point to the _id of a Auth document, but either way, focus on the one in the Favorites schema.

Another way to do it is by using an array of references:

```js
// user.model.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    authId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",  // Auth model has 2 fields: username and password
        required: [true, "Please provide authId"],
        unique: [true, "The authId already exists"]
    },
    watchList: [Number]
    ratings: {
        type: Map,
        of: Number,
        default: new Map(),
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Favorites",
        unique: [true, "Already added to favorite"]
    }],
});

module.exports = mongoose.model.User || mongoose.model("User", UserSchema);
// favorites.model.js
const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema({
    movieId: {
        type: Number,
        required: true,
        index: true
    },
    genre: {
        type: [String]
    },
    imageUrl: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now(),
        index: true
    },
});

module.exports = mongoose.model.Favorites || mongoose.model("Favorites", FavoritesSchema);
```

Notice how instead of having the userId in the Favorites schema, we add an array of references of Favorites.

As I was designing this schema, I chose to not embed the favorites directly and instead have its own collection because I wanted to provide statistics about the current movie. For example, % of users favorited this movie, x amount of users favorited this movie, etc. If I chose to embed the favorites, that would mean I would have to look through each User document in order to access all the favorites to perform queries on them, which is inefficient. Since I need to do basic CRUD as well as perform queries on the favorites as a whole, I chose to reference the favorites. As in the article “MongoDB Schema Design Best Practices” by Joe Karlsson, he states:

“Needing to access an object on its own is a compelling reason not to embed it.”

As for the watchlist, I don’t plan on adding any public statistics on those, meaning I don’t have to perform queries on the total watchlist of every single person. All I need to do is simply read from it, and edit it. I also just need to store a list of numbers in there. Since I just need to do basic CRUID on the watchlist, I chose to embed it directly. Its easier and faster to access.

“Favor embedding unless there is a compelling reason not to.”

So you may be wondering, I understand why we need to reference it, so then which way of referencing should I use: single or array?

After much thought and scavenging the web (as well as some ChatGPT), I decided to go with the single reference for my movie app. Here’s why.

Notice in the favorites schema, each favorite document will be unique even if the movieId is the same.

```js
// favorites.model.js
const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema({
    movieId: {
        type: Number,
        required: true,
        index: true
    },
    genre: {
        type: [String]
    },
    imageUrl: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now(),
        index: true
    },
});

module.exports = mongoose.model.Favorites || mongoose.model("Favorites", FavoritesSchema);

```

A movieId maps to a movie, so that means a movieId will have the same genre and imageUrl for all Favorite documents; however, there is 1 important field that shows why we prefer the single reference over an array of references to favorites: dateAdded

With the dateAdded field, it means that we can’t just have 1 favorite object for all users, since we need the time the user added it to favorites. You could get around this by maybe holding a list of objects that includes both the user and the timestamp, but what if I added it so that you could add personalized notes for each favorite movie (which can branch out if you categorize these notes), your favorite timestamps, etc. We need to design for extensibility and flexibility.

If there is user specific information that correlates to a document, its better to have separate documents for each user to maintain the individual user-specific information (thus single reference), rather than managing it in a single document to represent it for all users.

Now, here's an example on when to use an array of references:

```js
const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  partno: String,
  name: String,
  price: Number
});

const Part = mongoose.model('Part', partSchema);

const productSchema = new mongoose.Schema({
  name: String,
  manufacturer: String,
  catalog_number: String,
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }]
});

const Product = mongoose.model('Product', productSchema);

```

Say we have an ecommerce app, where the products are machines. Each machine has parts. Each part is not product specific. Each part doesn’t have unique attributes based on the product. A part is standardized and consistent so that each product can share the same part, such as a flat head screw, flange head screw, internal hex screw, etc. It would be really bad if these screws were made differently from one another.

Thus, its more preferable to have a single Part document for all the Products that use it, as opposed to having multiple Part documents for the same parts for all the Products that use it (which is redundant. As a result, we are able to store all the references of the parts in an array in the Products.