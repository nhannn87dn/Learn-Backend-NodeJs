```js
const { performance } = require('perf_hooks');

// Tính toán trường ảo bằng cách sử dụng plugin mongoose-lean-virtuals
const start1 = performance.now();
const result1 = await Product.find({}).lean().populate('category').select('name price discount salePrice');
const end1 = performance.now();
console.log(`Plugin mongoose-lean-virtuals: ${end1 - start1} ms`);

// Tính toán trường ảo bằng cách sử dụng phương thức toJSON()
const start2 = performance.now();
const result2 = await Product.find({}).populate('category');
const result2Json = result2.map(doc => doc.toJSON());
const end2 = performance.now();
console.log(`Phương thức toJSON(): ${end2 - start2} ms`);
```
