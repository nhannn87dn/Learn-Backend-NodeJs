# NoSql with MongoDB

## 💛 Hoàn thiện các Resources APIs

- Các Models
- Các Services
- Các Controllers
- Các Routes
- Các Validations

## 💛 TEST các Resources APIs

Test hết các Endpoints xem hoạt động OK từng Case một không ?

Điều kiện tiên quyết khi TEST là CHUẨN HÓA dữ liệu đầu ra

- Data Response trả về khi thành công có cấu trúc như thế nào ?
- Data Response trả về khi lỗi có cấu trúc như thế nào ?

Qua đó có sự đồng nhất kết quả trả về giữa tất cả các Endpoints ==> dễ dàng hơn cho Tester, Automation Test


## 💛 Chuẩn hóa định dạng JSON API trả về

Không có bất kỳ quy tắc nào để ràng buộc cách bạn trả về một chuổi JSON có cấu trúc như thế nào cả.

Tuy nhiên dưới đây là một số cách định dạng mà bạn có thể tham khảo:

[JSON API](http://jsonapi.org/) - JSON API covers creating and updating resources as well, not just responses.

[JSend](https://github.com/omniti-labs/jsend) - Simple and probably what you are already doing.

Bạn phải thể hiện được khi có lỗi thì cần trả về gì, khi thành công thì cần trả về cái gì ? Và tất cả các Endpoint API phải có cùng cấu trúc.

Ví dụ: Thành công

```json
{
  "statusCode": "0",
  "message": "Successfully"
}
```

Ví dụ: Thành công có gửi kèm data

```json
{
  "statusCode": "0",
  "message": "Successfully",
  "data": {
    "posts": [
      { "id": 1, "title": "A blog post", "body": "Some useful content" },
      { "id": 2, "title": "Another blog post", "body": "More content" }
    ]
  }
}
```

Trong đó:
- statusCode: là mã code mà bạn tự quy định cho việc xử lý tác vụ
- message: là lời nhắn trả lại cho client
- data: là thông trả lại cho client nếu có

Ví dụ: Thất bại (không có lỗi, chỉ là nó chưa tuân thủ một quy tắc nào đó như là validations)

```json
{
  "statusCode": "400",
  "message": "A title is required"
}
```

Ví dụ: Lỗi (khiến code không thể xử lý)

```json
{
  "statusCode": "500",
  "message": "Can not connect to Datatabase"
}
```

Thông thường người ta tạo ra một bảng danh mục mã lỗi kèm message để đối chiếu khi làm một hệ thống lớn.

| Error Code |    Description     |
| :--------: | :----------------: |
|     0      |    Successfull     |
|     1      |      Pending       |
|    201     | Create new success |
|    404     |   API Not Found    |
|    500     |    Error Server    |

Tạo một file `src\helpers\responseHandler.ts` để handle việc đó

```js
import {Request, Response} from 'express';
const sendJsonSuccess = (res: Response, message = 'Success', code = 200) => {
    return (data: any = null) => {
      const resData = data ? { statusCode: code, message, data} : { statusCode: code, message};
      res.status(code).json(resData);
    };
  };
  
  const sendJsonErrors = (req: Request, res: Response, error: any) => {
    console.log(error);
    return res.status(error.status || 500).json({
      statusCode: error.status || 500,
      message: error.message || 'Unhandled Error',
      error,
    });
  };
  
export {
    sendJsonSuccess,
    sendJsonErrors,
  };


```
