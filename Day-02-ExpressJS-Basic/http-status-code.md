# HTTP Status Code

Status-Code HTTP là có thể co giãn và ứng dụng HTTP không được yêu cầu để hiểu ý nghĩa của tất cả các mã trạng thái được đăng ký. Một danh sách của tất cả các mã trạng thái đã được cung cấp trong một chương riêng biệt cho bạn tham khảo.

## I. 1xx Infomation (Thông tin)

- 100 Continue: Chỉ một phần của Request được nhận bởi Server (có thể là header và Client cần gửi tiếp body), nhưng miễn là nó không bị loại bỏ, Client nên tiếp tục với Request.
  101 Switching Protocols: Requester đã hỏi Server về việc thanh đổi Protocol và Server đã chấp nhận điều đó
  II. 2xx Success (Thành công)

- 200 OK: Request đã được tiếp nhận và xử lý thành công. Các Response thực tế trả về sẽ phụ thuộc vào phương thức HTTP của Request. Trong một GET Request, Response sẽ chứa một thực thể tương ứng với các tài nguyên yêu cầu, trong một POST Request, Response sẽ chứa một thực thể mô tả hoặc chứa các kết quả của các action.
- 201 Created: Request đã được xử lý, kết quả của việc xử lý tạo ra một resource mới.
- 202 Accepted: Request được chấp nhận cho xử lý, nhưng việc xử lý chưa hoàn thành.
- 203 Non-authoritative Information (Xuất hiện từ HTTP/1.1): Server là nơi chuyển đổi proxy (ví dụ một Web accelerator) đã nhận được 200 OK nhưng nó trả về một phiên bản thay đổi (có thể là header) của Response nguyên gốc.
- 204 No Content: Server đã xử lý thành công request nhưng không trả về bất cứ content nào.
- 205 Reset Content: Server đã xử lý thành công request nhưng không trả về bất cứ content nào. Không giống với 204 No Content Response này yêu cầu phía Client phải thiết lập lại document view.
- 206 Partial Content: Server chỉ trả về một phần của resouce(dạng byte) do một range header được gửi bởi phía Client. Các Range Header được sửa dụng bởi Client để cho phép nối lại các phần của file download bị dán đoạn hoặc chia thành nhiều luồng download.

## III. 3xx Redirection (Sự chuyển hướng lại)

- 300 Multiple Choices: Một danh sách các link. Người sử dụng có thể chọn một link và tới vị trí đó. Tối đa 5 địa chỉ. Ví dụ: List các file video với format khác nhau
- 301 Moved Permanently: Request hiện tại và các request sau được yêu cầu di chuyển tới một URI mới.
- 302 Found: Đây là một ví dụ cho thấy sự mâu thuẫn giữa thực tiễn và quy chuẩn. Ở phiên bản HTTP/1.0 nó có nghĩa là yêu cầu Client chuyển hướng đến một URL tạm thời (tương tự như là 301 Moved Permanently) nhưng phần lớn các browser lại thực hiện nó với ý nghĩa của 303 See Other(sẽ nói sau đây). Do đó từ phiên bản HTTP/1.1 có thêm hai mã 303 và 307 để phân biệt rõ hành vi, nhưng một số ứng dụng web và framework vẫn sử dụng 302 như thể là 303.
- 303 See Other (Xuất hiện từ HTTP/1.1): Response trả về của Request có thể tìm thấy ở một URL khác bằng cách sử dụng phương thức GET.
- 304 Not Modified: Đây là Status-Code tới một If-Modified-Since hoặc If-None-Match header, nơi mà URL không được chỉnh sửa từ ngày cụ thể.
- 305 Use Proxy: Tài nguyên yêu cầu chỉ có sẵn thông qua một proxy, địa chỉ mà được cung cấp trong các Response. Nhiều HTTP Client (như Mozilla và Internet Explorer) không xử lý một cách chính xác phản ứng với mã trạng thái này, chủ yếu là vì các lý do an ninh.
- 306 Switch Proxy: Mã này hiện không còn được sử dụng, ý nghĩa ban đầu của nó là "Các Request tiếp theo nên sử dụng các proxy được chỉ định".
- 307 Temporary Redirect (xuất hiện từ HTTP/1.1): Trong trường hợp này, Request hiện tại cần được lặp lại một URI khác nhưng các Request trong tương lai vẫn sử dụng URI gốc.

## IV. 4xx: Client Error (Lỗi Client)

- 400 Bad Request: Server không thể xử lý hoặc sẽ không xử lý các Request lỗi của phía client (ví dụ Request có cú pháp sai hoặc Request lừa đảo định tuyến ...)
- 401 Unauthorized: Tương tự như 403 Forbidden nhưng được sử dụng khi yêu cầu xác thực là bắt buộc và đã không thành công. Các Response bắt buộc phải có thành phần WWW-Authenticate chứa các thách thức với tài nguyên được yêu cầu. Một số trang web vấn đề HTTP 401 khi một địa chỉ IP bị cấm từ các trang web (thường là các tên miền trang web) và địa chỉ cụ thể là từ chối quyền truy cập một trang web.
- 402 Payment Required: Hiện tại mã này chưa được sử dụng và nó được dự trữ cho tương lai. Mục đích ban đầu là mã này có thể được sử dụng như là một phần của đề án tiền mặt hoặc micropayment kỹ thuật số, nhưng điều đó đã không xảy ra, và mã này thường không được sử dụng. Google API sử dụng Status-Code này nếu một nhà phát triển đặc biệt đã vượt quá giới hạn số lần yêu cầu.
- 403 Forbidden: Request là hợp lệ nhưng server từ chối đáp ứng nó. Nó có nghĩa là trái phép, người dùng không có quyền cần thiết để tiếp cận với các tài nguyên.
- 404 Not Found: Các tài nguyên hiện tại không được tìm thấy nhưng có thể có trong tương lai. Các request tiếp theo của Client được chấp nhận.
- 405 Method Not Allowed: Request method không được hỗ trợ cho các tài nguyên được yêu cầu. Ví dụ Một GET request đến một POST resource, PUT Request gọi đến một tài nguyên chỉ đọc.
- 406 Not Acceptable: Server chỉ có thể tạo một Response mà không được chấp nhận bởi Client.
- 407 Proxy Authentication Required: Bạn phải xác nhận với một Server ủy quền trước khi Request này được phục vụ.
- 408 Request Timeout: Request tốn thời gian dài hơn thời gian Server được chuẩn bị để đợi.
- 409 Conflict: Request không thể được hoàn thành bởi vì sự xung đột, ví dụ như là xung đột giữa nhiều chỉnh sửa đồng thời.
- 410 Gone: Các resource được yêu cầu không còn nữa và sẽ không có sẵn một lần nữa, khi gặp mã lỗi này Client không nên có gắng tìm kiếm các tài nguyên này ở những lần sau.
- 411 Length Required: Content-Length không được xác định rõ. Server sẽ không chấp nhận Request nào không có nó.
- 412 Precondition Failed: Server sẽ không đáp ứng một trong những điều kiện tiên quyết của Client trong Request.
- 413 Payload Too Large: Server sẽ không chấp nhận yêu cầu, bởi vì đối tượng yêu cầu là quá rộng. Trước đây nó gọi là "Request Entity Too Large".
- 414 URI Too Long: URI được cung cấp là quá dài để Server xử lý, thường là kết quả của quá nhiều dữ liệu được mã hóa như là một truy vấn chuỗi của một GET Request, trong trường hợp đó nó phải được chuyển đổi sang một POST Request. Trước đây được gọi là "Request-URI Too Long"
- 415 Unsupported Media Type: Server sẽ không chấp nhận Request, bởi vì kiểu phương tiện không được hỗ trợ. Ví dụ khi Client upload một ảnh có định dạng image/svg+xml, nhưng server yêu cầu một định dạng khác.
- 416 Range Not Satisfiable: Client yêu cầu một phần của tập tin nhưng server không thể cung cấp nó. Trước đây được gọi là "Requested Range Not Satisfiable"
- 417 Expectation Failed: Máy chủ không thể đáp ứng các yêu cầu của trường Expect trong header.

## V. 5xx: Server Error (Lỗi Server)

- 500 Internal Server Error: Một thông báo chung chung, được đưa ra khi Server gặp phải một trường hợp bất ngờ, Message cụ thể là không phù hợp.
- 501 Not Implemented: Server không công nhận các Request method hoặc không có khả năng xử lý nó.
- 502 Bad Gateway: Server đã hoạt động như một gateway hoặc proxy và nhận được một Response không hợp lệ từ máy chủ nguồn.
- 503 Service Unavailable: Server hiện tại không có sẵn (Quá tải hoặc được down để bảo trì). Nói chung đây chỉ là trạng thái tạm thời.
- 504 Gateway Timeout: Server đã hoạt động như một gateway hoặc proxy và không nhận được một Response từ máy chủ nguồn.
- 505 HTTP Version Not Supported: Server không hỗ trợ phiên bản “giao thức HTTP”.
  Trên đây là danh sách các Status-Code phổ biến nhất, ngoài ra còn nhiều các Status-Code tiêu chuẩn đã được nhưng nghĩa như : 418, 421, 506, 507, 508, 511 ... Cám ơn các bạn đã theo dõi
