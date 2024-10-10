// const fs = require("fs");

// fs.open("file.txt", "r", (err, fd) => {
//   if (err) {
//     return console.error("Có lỗi xảy ra khi mở file:", err);
//   }
//   console.log("File đã được mở thành công.");

//   const buffer = Buffer.alloc(1024); // Tạo một buffer để chứa dữ liệu đọc được
//   fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead, buffer) => {
//     if (err) {
//       return console.error("Có lỗi xảy ra khi đọc file:", err);
//     }
//     console.log(`Đã đọc được ${bytesRead} byte từ file.`);

//     // Chuyển đổi buffer thành chuỗi và in ra nội dung đã đọc
//     const content = buffer.slice(0, bytesRead).toString();
//     console.log("Nội dung của file:", content);

//     // Đóng file sau khi hoàn thành thao tác
//     fs.close(fd, (err) => {
//       if (err) {
//         console.error("Lỗi khi đóng file:", err);
//       }
//       console.log("File đã được đóng lại.");
//     });
//   });
// });

const fs = require("fs");
// COmbo 3 ham tren
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    return console.error("Có lỗi xảy ra khi đọc file:", err);
  }
  console.log("Nội dung của file:", data);
});
