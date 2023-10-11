
//Tìm all SP có brand = Apple
//SQL: SELECT * FROM products WHERE brand = 'Apple'
// find({brand: 'Apple'})

//SQL: SELECT * FROM products WHERE price > 40
// find({price: {$gt: 40}})

//SQL: SELECT * FROM products WHERE price > 40 AND price < 300
// find({price: {$gt: 40}, price: {$lt: 300}})
// find({ $and: [ { price: {$gt: 40} }, { price:  {$lt: 300} } ] })

//SQL: SELECT * FROM products WHERE brand = 'Apple' OR brand = 'Samsung'
//find({ $or: [ { brand: "Apple" }, { brand:  'Samsung' } ] })

//SQL SELECT name, price, discount, stock FROM product