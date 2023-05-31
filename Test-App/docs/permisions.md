Để thiết kế User Schema cho ứng dụng có nhiều modules như sản phẩm và tin tức và phân quyền thêm mới, sửa, xóa cho user, bạn có thể sử dụng các trường dữ liệu như sau:

```
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  permissions: {
    type: [{
      module: String,
      action: String
    }],
    default: []
  }
});

module.exports = mongoose.model('User', userSchema);
```


Ví dụ, để cho phép user có role là 'user' thêm mới sản phẩm và tin tức, bạn có thể định nghĩa `permissions` như sau:

```
{
  permissions: [
    { module: 'product', action: 'create' },
    { module: 'news', action: 'create' }
  ]
}
```

Tương tự, để cho phép user có role là 'admin' có quyền thêm mới, sửa hoặc và xóa sản phẩm và tin tức, bạn có thể định nghĩa `permissions` như sau:

```
{
  permissions: [
    { module: 'product', action: 'create' },
    { module: 'product', action: 'update' },
    { module: 'product', action: 'delete' },
    { module: 'news', action: 'create' },
    { module: 'news', action: 'update' },
    { module: 'news', action: 'delete' }
  ]
}
```

Ngoài các trường dữ liệu trên, bạn cũng có thể thêm các trường dữ liệu khác tùy thuộc vào yêu cầu của dự án và thiết kế của ứng dụng. Khi sử dụng User Schema này, bạn có thể dễ dàng kiểm tra quyền của user trước khi thực hiện các thao tác CRUD trên các module sản phẩm và tin tức tương ứng.

Để kiểm tra quyền của user trước khi thực hiện các thao tác CRUD trên các module sản phẩm và tin tức, bạn có thể sử dụng middleware trong ExpressJS. Middleware sẽ xác định quyền của user dựa trên `role` và `permissions` của user trong User Schema, và chỉ cho phép user thực hiện các thao tác CRUD nếu user có quyền tương ứng.

Bạn có thể sử dụng middleware như sau:

```
const checkPermission = (module, action) => {
  return (req, res, next) => {
    const user = req.user;
    const hasPermission = user.permissions.some(p => p.module === module && p.action === action);

    if (!hasPermission) {
      const error = new Error(`You do not have permission to ${action} ${module}.`);
      error.status = 403;
      return next(error);
    }

    next();
  };
};
```

Trong đó:

- `module`: Tên của module (ví dụ: 'product', 'news').
- `action`: Tên của action (ví dụ: 'create', 'update', 'delete').

Middleware này sẽ kiểm tra quyền của user dựa trên `role` và `permissions`trong User Schema, và chỉ cho phép user thực hiện các thao tác CRUD nếu user có quyền tương ứng. Nếu user không có quyền, middleware sẽ trả về một lỗi với mã trạng thái 403 và thông báo lỗi tương ứng.

Bạn có thể sử dụng middleware này như sau:

```
const express = require('express');
const router = express.Router();

const checkPermission = (module, action) => {
  return (req, res, next) => {
    const user = req.user;
    const hasPermission = user.permissions.some(p => p.module === module && p.action === action);

    if (!hasPermission) {
      const error = new Error(`You do not have permission to ${action} ${module}.`);
      error.status = 403;
      return next(error);
    }

    next();
  };
};

// Route để sửa sản phẩm
router.put('/products/:id', checkPermission('product', 'update'), (req, res) => {
  // Xử lý thao tác sửa sản phẩm
});

// Route để xóa sản phẩm
router.delete('/products/:id', checkPermission('product', 'delete'), (req, res) => {
  // Xử lý thao tác xóa sản phẩm
});

// Route đểthêm mới tin tức
router.post('/news', checkPermission('news', 'create'), (req, res) => {
  // Xử lý thao tác thêm mới tin tức
});

// Route để sửa tin tức
router.put('/news/:id', checkPermission('news', 'update'), (req, res) => {
  // Xử lý thao tác sửa tin tức
});

// Route để xóa tin tức
router.delete('/news/:id', checkPermission('news', 'delete'), (req, res) => {
  // Xử lý thao tác xóa tin tức
});
```

Trong ví dụ trên, middleware `checkPermission` được sử dụng để kiểm tra quyền của user trước khi thực hiện các thao tác CRUD trên module sản phẩm và tin tức tương ứng. Middleware này được truyền vào các route tương ứng và sẽ kiểm tra quyền của user trước khi thực hiện các thao tác CRUD tương ứng. Nếu user không có quyền, middleware sẽ trả về một lỗi với mã trạng thái 403 và thông báo lỗi tương ứng.


Để thêm nhiều permissions cho một user role, bạn có thể sử dụng phương thức `findOneAndUpdate()` của Mongoose để cập nhật trường `permissions` trong Schema User.

===================


Dưới đây là ví dụ về cách thêm nhiều permissions cho một user role:

```
const User = require('./userModel');

// Thêm nhiều permissions cho một user role
User.findOneAndUpdate(
  { email: 'user@example.com' }, // Cập nhật user có email này
  { $push: { 
      permissions: {
        $each: [
          { module: 'module_1', action: 'action_1' },
          { module: 'module_2', action: 'action_2' },
          { module: 'module_3', action: 'action_3' }
        ]
      }
    }
  }, // Thêm một mảng các permissions mới vào trường permissions của user
  { new: true }, // Trả về document user đã được cập nhật
  (err, user) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(user);
  }
);
```

Trong ví dụ này, chúng ta sử dụng phương thức `findOneAndUpdate()` của model `User`để cập nhật các permissions cho một user có email là `user@example.com`. Toán tử `$push` được sử dụng để thêm một mảng các permissions mới vào trường `permissions` của user. Toán tử `$each` được sử dụng để thêm nhiều permissions cùng một lúc. Mỗi object trong mảng đại diện cho một permission mới, với trường `module` chỉ định tên của module mà user có quyền truy cập và trường `action` chỉ định tên của hành động mà user có quyền thực hiện.

Tùy chọn `{ new: true }` được sử dụng để trả về document user đã được cập nhật.

Chú ý rằng trong trường hợp này, chúng ta sử dụng `$push` để thêm một mảng các permissions mới vào trường `permissions` của user. Nếu bạn chỉ muốn thêm một permission mới, bạn có thể sử dụng `$addToSet` thay vì `$push`. Toán tử `$addToSet` sẽ thêm một permission mới vào trường `permissions` của user nếu permission đó chưatồn tại trong mảng `permissions`. 

Ví dụ:

```
const User = require('./userModel');

// Thêm một permission mới cho một user role
User.findOneAndUpdate(
  { email: 'user@example.com' }, // Cập nhật user có email này
  { $addToSet: { permissions: { module: 'module_name', action: 'new_action' } } }, // Thêm một permission mới vào trường permissions của user
  { new: true }, // Trả về document user đã được cập nhật
  (err, user) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(user);
  }
);
```

Trong ví dụ này, chúng ta sử dụng toán tử `$addToSet` để thêm một permission mới vào trường `permissions` của một user có email là `user@example.com`. Permission mới được chỉ định bởi trường `module` là tên của module mà user có quyền truy cập, và trường `action` là tên của hành động mà user có quyền thực hiện.

Tùy chọn `{ new: true }` được sử dụng để trả về document user đã được cập nhật.

Lưuý rằng cách thêm nhiều permissions cùng một lúc bằng `$push` và `$each` hoặc thêm một permission mới bằng `$addToSet` đều có thể được sử dụng tùy thuộc vào nhu cầu của bạn.

============

Để xóa một permission của một user role, bạn có thể sử dụng phương thức `findOneAndUpdate()` của Mongoose để cập nhật trường `permissions` trong Schema User.

Dưới đây là ví dụ về cách xóa một permission của một user role:

```
const User = require('./userModel');

// Xóa một permission của một user role
User.findOneAndUpdate(
  { email: 'user@example.com' }, // Cập nhật user có email này
  { $pull: { permissions: { module: 'module_name', action: 'action_name' } } }, // Xóa permission có module_name và action_name trong trường permissions của user
  { new: true }, // Trả về document user đã được cập nhật
  (err, user) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(user);
  }
);
```

Trong ví dụ này, chúng ta sử dụng phương thức `findOneAndUpdate()` của model `User`để cập nhật các permissions cho một user có email là `user@example.com`. Toán tử `$pull` được sử dụng để xóa permission có `module` là tên của module mà user không còn quyền truycập và `action` là tên của hành động mà user không còn quyền thực hiện trong trường `permissions` của user.

Tùy chọn `{ new: true }` được sử dụng để trả về document user đã được cập nhật.

Lưu ý rằng trong trường hợp này, chúng ta sử dụng `$pull` để xóa một permission có `module` và `action` nhất định trong trường `permissions` của user. Nếu bạn muốn xóa tất cả các permissions của một user role, bạn có thể sử dụng `$unset` để xóa trường `permissions` hoặc sử dụng `$pull` để xóa toàn bộ mảng `permissions`.

Ví dụ:

```
const User = require('./userModel');

// Xóa tất cả các permissions của một user role
User.findOneAndUpdate(
  { email: 'user@example.com' }, // Cập nhật user có email này
  { $unset: { permissions: '' } }, // Xóa trường permissions của user
  { new: true }, // Trả về document user đã được cập nhật
  (err, user) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(user);
  }
);
```

Trong ví dụ này, chúng ta sử dụng toán tử `$unset` để xóa trường `permissions` của một user có email là `user@example.com`. Trường `permissions` sẽ bị xóa hoàn toàn khỏi document của user.

Tùy chọn `{ new: true }` được sử dụng để trả về document user đã được cập nhật.

Lưu ý rằng việc xóa tất cả các permissions của một user role bằng cách xóa trường `permissions` hoặc sử dụng `$pull` để xóa toàn bộ mảng `permissions` sẽ xóa hết tất cả các quyền của user role đó. Bạn nên cân nhắc cẩn thận trước khi thực hiện hành động này.