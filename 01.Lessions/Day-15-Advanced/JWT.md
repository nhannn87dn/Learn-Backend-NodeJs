# Json Web Token

- <https://jwt.io/>
- <https://www.npmjs.com/package/jsonwebtoken>

## 💛 Json Web Token là gì?

Giả sử để truyền tin mật từ anh A sang người trong tổ chức A, vậy làm thế nào để nhận biết người B cũng thuộc tổ chức A? Khi đó, tổ chức A nảy ra một ý tưởng, cho anh A một mật mã để trước khi tiếp nhận hay truyền đi thông tin sẽ đưa ra mật mã để định danh đó là anh A. 

![jwt token](img/token-based-authentication.jpg)

Thông qua ví dụ trên, giống như mối quan hệ giữa server và client, anh A sẽ đại diện cho server, tổ chức A tương tự như client và mật mã để định danh anh A gọi là Jwt.



**Về cơ chế hoạt động của access token**

1. Khi đăng nhập thành công server sẽ gửi về cho client 1 access token dưới dạng Jwt.
2. Client lưu token và trong mỗi request tiếp theo sẽ gửi kèm token trên header - tùy vào mỗi cách viết sẽ có cách đặt tên header khác nhau (Jwt-Authorization, JwtAuthorization, ...).

3. Server verify lại access token và trả về response cho client nếu token hợp lệ

## 💛 Jwt gồm những gì?


![jwt token](img/jwt.png)

Theo định nghĩa của Jwt được tạo bởi Auth0, một Jwt token hợp lệ gồm 3 phần: `header`, `payload` và `signature` được phân cách bởi dấu chấm "."

> header.payload.signature

### 🔶 Header

Thông thường gồm có 2 phần chính, 1 là dạng token - Jwt và thuật toán giải mã được sử dụng.

```code
{
    "alg": "HS256",
    "typ": "JWT
}
```

Thông tin sẽ được encode bằng Base64url tạo ra 1 header hoàn chỉnh:

```code
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```


### 🔶 Payload
Là nơi sẽ chứa những thông tin cần thiết để định danh user và thời hạn được access như user_id, role, login_token, exp, ...

```code
{
    "user_id": "1",
    "role": "admin",
    "exp": 1000,
    "iat": 800,
    "login_token": "adsadlasd"
}
```

những giá trị như iat, exp, iss ... chúng ta gọi là claims và có 3 loại chính:

Register claims: Là set các giá trị được định nghĩa từ trước bởi Jwt - chúng không phải bắt buộc nhưng được recommended, ví dụ:
exp: đại điện cho expiration_time.
iat: thời gian user request đăng nhập.
Hiệu số của exp và iat sẽ là khoảng thời gian mà token có hiệu lực (trong ví dụ trên exp - iat = 200).

Public claims: Được xác định bởi cộng đồng sử dụng Jwt - để tránh sự trùng lặp, việc defined các claim được public ở trang IANA JSON Web Token Registry.
Private claims: Được tạo riêng cho một tổ chức, hay một dự án cụ thể được chấp nhận bởi người trong cuộc (Ex: login_token).
Cũng tương tự như header, payload được encode bằng Base64Url để tạo thành phần thứ 2 trong Jwt.

```code
eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTAwMCwiaWF0Ijo4MDAsImxvZ2luX3Rva2VuIjoiYWRzYWRsYXNkIn0
```

Note: Header và payload chỉ được encode bằng Base64Url, nên hạn chế để các thông tin nhạy cảm trừ khi thông tin đó đã được mã hóa (email, password, ...)

### 🔶 Signature

Công cụ giúp chúng ta bảo mật token từ client gửi về server là hợp lệ, được tạo ra từ 3 phần:

```code
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

HMACSHA256 là thuật toán, 2 phần encode của header và payload + 1 secret key được tạo ra từ dự án. Vì signature bao gồm cả header và payload, nhờ vào đó ta xác định được nội dụng message không thay đổi và ai là người gửi đi message đó.

Đặt tất cả vào chung với nhau ta được một Jwt hoàn chỉnh:

```code
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTAwMCwiaWF0Ijo4MDAsImxvZ2luX3Rva2VuIjoiYWRzYWRsYXNkIn0.aIp-Pciwrh23ATqU1CpH8PIZ6_sa7IRZ5hhxUw-iQIM

```


## 💛 Tạo một Token bằng Json Web Token trong NodeJS

1. Cài đặt jsonwebtoken

```bash 
npm install jsonwebtoken
```

2. Import jsonwebtoken và tạo một hàm để tạo token:

```js
const jwt = require('jsonwebtoken');

//Định nghĩa một hàm để tạo token
function generateToken(user) {
  // Thay thế 'your_secret_key' bằng một chuỗi bí mật thực tế
  const secretOrPrivateKey = 'your_secret_key';
  
  // Tạo payload chứa thông tin của người dùng
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };
  
  // Các tùy chọn
  const options = {
    expiresIn: '1h', //Xác định thời gian hết hạn của token
    algorithm: 'RS256' //thuật toán mã hóa
  }
  
  // Tạo token với payload và bí mật
  //jwt.sign(payload, secretOrPrivateKey, options, [callback])

  const token = jwt.sign(
        payload,
        secretKey,
        options
    );

  return token;
}

```

3. Sử dụng hàm generateToken để tạo token

```js
const user = {
  id: 1,
  email: 'example@example.com',
  role: 'admin'
};

const token = generateToken(user);
console.log(token);

```


## 💛 Xác thực Token

Giống như vào khách sạn, người ta đưa bạn một thẻ mở phòng Số 102, 
trong thẻ đó có chứa một token. Thiết bị mở cửa sẽ xác minh thẻ bạn đang dùng có được phép mở cửa không.

```js
const jwt = require('jsonwebtoken');

/**
 * verifyToken
 * Dùng token đã cấp cho bạn trước đó
 * và secretOrPrivateKey
 * Làm đầu vào Để xác minh
 */
function verifyToken(token) {
  // Thay thế 'your_secret_key' bằng cùng một chuỗi bí mật đã sử dụng để tạo token
  const secretOrPrivateKey = 'your_secret_key';

  try {
    // Xác thực tính toàn vẹn và giải mã token
    const decoded = jwt.verify(token, secretOrPrivateKey);
    return decoded;
  } catch (error) {
    // Nếu token không hợp lệ, hoặc đã hết hạn, hoặc chữ ký không chính xác, sẽ xảy ra lỗi
    console.error('Invalid token:', error.message);
    return false;
  }
}

```

Sử dụng hàm verifyToken để xác thực một token:

```js
const token = 'your_token_here';
const decodedToken = verifyToken(token);

if (decodedToken) {
    //Cho mở cửa nếu token đúng
  console.log('Token is valid.');
  console.log('Decoded payload:', decodedToken);
} else {
    //Còn không đúng  thì không mở
  console.log('Token is invalid.');
}

```