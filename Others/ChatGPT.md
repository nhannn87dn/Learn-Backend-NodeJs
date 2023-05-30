
Để lưu trữ các biến thể sản phẩm với khả năng khác giá bán trong MongoDB, ta có thể sử dụng một mảng để lưu trữ thông tin về giá bán của mỗi biến thể sản phẩm.

Ví dụ, ta có thể tạo schema cho model Product như sau:

```
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  variants: [{
    name: String,
    attributes: [{
      name: String,
      value: String
    }],
    prices: [{
      option: String,
      price: Number
    }]
  }]
});
```

Trong schema này, thuộc tính variants của model Product được định nghĩa dưới dạng một mảng các đối tượng, mỗi đối tượng đại diện cho một biến thể sản phẩm. Mỗi đối tượng này chứa các thông tin về tên biến thể sản phẩm (name), các thuộc tính của biến thể sản phẩm (attributes) và giá bán của biến thể sản phẩm (prices).

Ví dụ, ta có thể tạo một sản phẩm iPhone 14 như sau:

```
{
  name: "iPhone 14",
  description: "A new iPhone model from Apple",
  variants: [
    {
      name: "Red - 16GB",
      attributes: [
        { name: "Color", value: "Red" },
        { name: "Storage", value: "16GB" }
      ],
      prices: [
        { option: "Default", price: 10 }
      ]
    },
    {
      name: "Red - 32GB",
      attributes: [
        { name: "Color", value: "Red" },
        { name: "Storage", value: "32GB" }
      ],
      prices: [
        { option: "Default", price: 20 }
      ]
    },
    {
      name: "Gold - 16GB",
      attributes: [
        { name: "Color", value: "Gold" },
        { name: "Storage", value: "16GB" }
      ],
      prices: [
        { option: "Default", price: 20 }
      ]
    },
    {
      name: "Gold - 32GB",
      attributes: [
        { name: "Color", value: "Gold" },
        { name: "Storage", value: "32GB" }
      ],
      prices: [
        { option: "Default", price: 40 }
      ]
    }
  ]
}
```

Trong đoạn mã này, ta đã tạo một sản phẩm iPhone 14 với 4 biến thể sản phẩm khác nhau, mỗi biến thể sản phẩm đại diện cho một kết hợp khác nhau của màu sắc và dung lượng lưu trữ. Mỗi biến thể sản phẩm chứa các thông tin về tên biến thể sản phẩm (name), các thuộc tính của biến thể sản phẩm (attributes) và giá bán của biến thể sản phẩm (prices). Trong mỗi mảng prices, ta lưu trữ thông tin về option (tùy chọn) và giá bán của tùy chọn đó.

Khi ta cần truy vấn dữ liệu để lấy các sản phẩm có một thuộc tính cụ thể của biến thể sản phẩm, ta có thể sử dụng các truy vấn MongoDB để tìm kiếm các sản phẩm có thuộc tính đó trong mảng attributes của các biến thể sản phẩm. Ví dụ, nếu ta muốn tìm các sản phẩm có màu sắc là "Red" và dung lượng lưu trữ là "16GB", ta có thể sử dụng câu lệnh sau:

```
Product.find({ "variants.attributes": { $all: [ { name: "Color", value: "Red" }, { name: "Storage", value: "16GB" } ] } }, (err, products) => {
  if (err) {
    // Xử lý lỗi
    console.log(err);
  } else {
    // Hiển thị danh sách sản phẩm tìm thấy
    console.log(products);
  }
});
```

Trong truy vấn này, ta sử dụng phương thức find của đối tượng model Product để tìm kiếm các sản phẩm có màu sắc là "Red" và dung lượng lưu trữ là "16GB" trong mảng attributes của các biến thể sản phẩm.

Tương tự, ta cũng có thể sử dụng các truy vấn MongoDB để tìm kiếm các sản phẩm theo giá bán của các biến thể sản phẩm. Ví dụ, nếu ta muốn tìm các sản phẩm có giá bán của biến thể sản phẩm là 20 USD, ta có thể sử dụng câu lệnh sau:

```
Product.find({ "variants.prices": { $elemMatch: { price: 20 } } }, (err, products) => {
  if (err) {
    // Xử lý lỗi
    console.log(err);
  } else {
    // Hiển thị danh sách sản phẩm tìm thấy
    console.log(products);
  }
});
```

Trong truy vấn này, ta sử dụng phương thức find của đối tượng model Product để tìm kiếm các sản phẩm có giá bán của biến thể sản phẩm là 20 USD trong mảng prices của các biến thể sản phẩm. Ta sử dụng phương thức $elemMatch để đảm bảo rằng giá bán phù hợp với điều kiện tìm kiếm.

Tóm lại, để lưu trữ các biến thể sản phẩm với khả năng khác giá bán trong MongoDB, ta có thể sử dụng một mảng để lưu trữ thông tin về giá bán của mỗi biến thể sản phẩm. Khi truy vấn dữ liệu để lấy các sản phẩm có một thuộc tính cụ thể của biến thể sản phẩm, ta có thể sử dụng các truy vấn MongoDB để tìm kiếm cácsản phẩm có giá trị của thuộc tính cụ thể trong mảng attributes của các biến thể sản phẩm. Ta cũng có thể sử dụng các truy vấn MongoDB để tìm kiếm các sản phẩm theo giá bán của các biến thể sản phẩm.

Trong ví dụ iPhone 14 đã nêu ở trên, ta có thể tạo ID sản phẩm riêng cho mỗi biến thể sản phẩm bằng cách kết hợp thông tin về tên sản phẩm, màu sắc và dung lượng lưu trữ của mỗi biến thể sản phẩm. Ví dụ, ta có thể tạo ID sản phẩm bằng cách kết hợp tên sản phẩm "iPhone 14" với màu sắc và dung lượng lưu trữ của mỗi biến thể sản phẩm.

Để tạo ID sản phẩm cho mỗi biến thể sản phẩm, ta có thể sửa lại schema cho model Product như sau:

```
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  variants: [{
    id: String,
    name: String,
    attributes: [{
      name: String,
      value: String
    }],
    prices: [{
      option: String,
      price: Number
    }]
  }]
});
```

Trong schema này, ta đã thêm một thuộc tính mới là "id" vào trong mỗi đối tượng biến thể sản phẩm. Thuộc tính này sẽ chứa ID sản phẩm riêng cho mỗi biến thể sản phẩm.

Để tạo ID sản phẩm cho mỗi biến thể sản phẩm, ta có thể sử dụng hàm hash để tạo ra một chuỗi duy nhất dựa trên các thuộc tính của biến thể sản phẩm. Ví dụ, ta có thể sử dụng hàm hash như sau để tạo ID sản phẩm cho mỗi biến thể sản phẩm trong ví dụ iPhone 14:

```
const crypto = require('crypto');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  variants: [{
    id: String,
    name: String,
    attributes: [{
      name: String,
      value: String
    }],
    prices: [{
      option: String,
      price: Number
    }]
  }]
});

productSchema.pre('save', function(next) {
  const product = this;

  product.variants.forEach(variant => {
    const hash = crypto.createHash('md5').update(`${product.name}_${variant.attributes[0].value}_${variant.attributes[1].value}`).digest('hex');
    variant.id = hash;
  });

  next();
});
```

Trong đoạn mã này, ta sử dụng phương thức pre('save') của schema để tạo ID sản phẩm cho mỗi biếnthể sản phẩm trước khi lưu vào cơ sở dữ liệu. Trong hàm này, ta sử dụng hàm hash md5 để tạo ra một chuỗi duy nhất dựa trên thông tin về tên sản phẩm và các thuộc tính của biến thể sản phẩm, bao gồm màu sắc và dung lượng lưu trữ. Ta gán chuỗi này cho thuộc tính "id" của mỗi đối tượng biến thể sản phẩm.

Khi ta tạo một đối tượng sản phẩm mới và lưu vào cơ sở dữ liệu, hàm pre('save') sẽ được gọi tự động và tạo ID sản phẩm cho mỗi biến thể sản phẩm trong mảng variants.

Ví dụ, khi ta tạo một sản phẩm iPhone 14 với các biến thể sản phẩm như đã nêu ở trên, ta sẽ có các ID sản phẩm riêng cho mỗi biến thể sản phẩm như sau:

```
{
  name: "iPhone 14",
  description: "A new iPhone model from Apple",
  variants: [
    {
      id: "4c5d1a0d7f5Trong ví dụ iPhone 14 đã nêu ở trên, ta có thể tạo ID sản phẩm riêng cho mỗi biến thể sản phẩm bằng cách kết hợp thông tin về tên sản phẩm, màu sắc và dung lượng lưu trữ của mỗi biến thể sản phẩm. Ví dụ, ta có thể tạo ID sản phẩm bằng cách kết hợp tên sản phẩm "iPhone 14" với màu sắc và dung lượng lưu trữ của mỗi biến thể sản phẩm.

Để tạo ID sản phẩm cho mỗi biến thể sản phẩm, ta có thể sửa lại schema cho model Product như sau:

```
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  variants: [{
    id: String,
    name: String,
    attributes: [{
      name: String,
      value: String
    }],
    prices: [{
      option: String,
      price: Number
    }]
  }]
});
```

Trong schema này, ta đã thêm một thuộc tính mới là "id" vào trong mỗi đối tượng biến thể sản phẩm. Thuộc tính này sẽ chứa ID sản phẩm riêng cho mỗi biến thể sản phẩm.

Để tạo ID sản phẩm cho mỗi biến thể sản phẩm, ta có thể sử dụng hàm hash để tạo ra một chuỗi duy nhất dựa trên các thuộc tính của biến thể sản phẩm. Ví dụ, ta có thể sử dụng hàm hash như sau để tạo ID sản phẩm cho mỗi biến thể sản phẩm trong ví dụ iPhone 14:

```
const crypto = require('crypto');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  variants: [{
    id: String,
    name: String,
    attributes: [{
      name: String,
      value: String
    }],
    prices: [{
      option: String,
      price: Number
    }]
  }]
});

productSchema.pre('save', function(next) {
  const product = this;

  product.variants.forEach(variant => {
    const hash = crypto.createHash('md5').update(`${product.name}_${variant.attributes[0].value}_${variant.attributes[1].value}`).digest('hex');
    variant.id = hash;
  });

  next();
});
```

Trong đoạn mã này, ta sử dụng phương thức pre('save') của schema để tạo ID sản phẩm cho mỗi biếnể sản phẩm trước khi lưu vào cơ sở dữ liệu. Trong hàm này, ta sử dụng hàm hash md5 để tạo ra một chuỗi duy nhất dựa trên thông tin về tên sản phẩm và các thuộc tính của biến thể sản phẩm, bao gồm màu sắc và dung lượng lưu trữ. Ta gán chuỗi này cho thuộc tính "id" của mỗi đối tượng biến thể sản phẩm.

Khi ta tạo một đối tượng sản phẩm mới và lưu vào cơ sở dữ liệu, hàm pre('save') sẽ được gọi tự động và tạo ID sản phẩm cho mỗi biến thể sản phẩm trong mảng variants.

Ví dụ, khi ta tạo một sản phẩm iPhone 14 với các biến thể sản phẩm như đã nêu ở trên, ta sẽ có các ID sản phẩm riêng cho mỗi biến thể sản phẩm như sau:

```
{
  name: "iPhone 14",
  description: "A new iPhone model from Apple",
  variants: [
    {
      id: "4c5d1a0d7f5eĐã xảy ra lỗi khi trả lời câu hỏi trước đó. Để trả lời câu hỏi của bạn, ta có thể tạo ID sản phẩm cho mỗi biến thể trong sản phẩm iPhone 14 bằng cách kết hợp thông tin về tên sản phẩm, màu sắc, dung lượng và các thuộc tính khác của biến thể. Ví dụ, ta có thể tạo ID sản phẩm bằng cách kết hợp tên sản phẩm "iPhone 14" với màu sắc, dung lượng và các thuộc tính khác của từng biến thể.

Ví dụ về cách tạo ID sản phẩm cho mỗi biến thể sản phẩm trong sản phẩm iPhone 14:

- Biến thể 1: iPhone 14 màu đen, dung lượng 64GB
  + Tên sản phẩm: iPhone 14
  + Màu sắc: Đen
  +



  Để tạo mới một sản phẩm với các biến thể sản phẩm có ID riêng, ta cần định nghĩa đối tượng sản phẩm với các thuộc tính tương ứng, bao gồm tên sản phẩm, mô tả, và một mảng các biến thể sản phẩm.

Ví dụ, ta có thể định nghĩa đối tượng sản phẩm theo cách variants ID như sau:

```
const Product = {
  name: 'iPhone 14',
  description: 'A new iPhone model from Apple',
  variants: [
    {
      id: '4c5d1a0d7f5e1b9d8f1c7b3a2e6d0f8',
      name: 'iPhone 14 - Black - 64GB',
      attributes: [
        {
          name: 'color',
          value: 'black'
        },
        {
          name: 'storage',
          value: '64GB'
        }
      ],
      prices: [
        {
          option: 'default',
          price: 999
        }
      ]
    },
    {
      id: 'c7b3a2e6d0f84c5d1a0d7f5e1b9d8f1',
      name: 'iPhone 14 - White - 128GB',
      attributes: [
        {
          name: 'color',
          value: 'white'
        },
        {
          name: 'storage',
          value: '128GB'
        }
      ],
      prices: [
        {
          option: 'default',
          price: 1199
        }
      ]
    }
  ]
};
```

Trong đoạn mã này, ta định nghĩa đối tượng sản phẩm "iPhone 14" với mô tả là "A new iPhone model from Apple". Để tạo biến thể sản phẩm với ID riêng, ta sử dụng các thuộc tính "id", "name", "attributes" và "prices" cho mỗi biến thể sản phẩm.

Thuộc tính "id" chứa ID riêng cho mỗi biến thể sản phẩm, được tạo bằng cách sử dụng một thuật toán hash như đã mô tả trong câu trả lời trước. Thuộc tính "name" chứa tên đầy đủ của biến thể sản phẩm, được tạo bằng cách kết hợp tên sản phẩm, màu sắc và dung lượng lưu trữa của biến thể đó. Thuộc tính "attributes" chứa một mảng các thuộc tính của biến thể sản phẩm, bao gồm màu sắc và dung lượng lưu trữ. Thuộc tính "prices" chứa một mảng các tùy chọn giá của biến thể sản phẩm, trong trường hợp này chỉ có một tùy chọn giá mặc định.

Khi muốn tạo mới một biến thể sản phẩm, ta cần tạo một đối tượng mới với các thuộc tính tương ứng, bao gồm tên, thuộc tính và giá. Sau đó, ta sử dụng thuật toán hash để tạo ID mới cho biến thể sản phẩm, và đưa biến thể sản phẩm mới vào mảng các biến thể của sản phẩm.

Ví dụ, ta có thể tạo một biến thể sản phẩm mới với màu sắc "blue" và dung lượng lưu trữ "256GB" như sau:

```
const crypto = require('crypto');

const newVariant = {
  name: 'iPhone 14 - Blue- 256GB',
  attributes: [
    {
      name: 'color',
      value: 'blue'
    },
    {
      name: 'storage',
      value: '256GB'
    }
  ],
  prices: [
    {
      option: 'default',
      price: 1399
    }
  ]
};

const attributesString = `${Product.name}_${newVariant.attributes[0].value}_${newVariant.attributes[1].value}`;
const id = crypto.createHash('md5').update(attributesString).digest('hex');
newVariant.id = id;

Product.variants.push(newVariant);
```

Trong đoạn mã này, ta định nghĩa một đối tượng `newVariant` mới với các thuộc tính tương ứng. Ta sử dụng thuật toán hash MD5 để tạo ID mới cho biến thể sản phẩm bằng cách tạo một chuỗi các thuộc tính và đưa chuỗi đó vào hàm `update()` của `crypto.createHash()`. Sau đó, ta gán ID mới cho thuộc tính `id` của biến thể sản phẩm mới và đưa biến thể sản phẩm mới vào mảng các biến thể của sản phẩm bằng cách sử dụng phương thức `push()`.