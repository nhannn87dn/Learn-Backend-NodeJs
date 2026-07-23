console.log("Start"); // Bước 1

setTimeout(() => {
  console.log("Timeout callback"); // Bước 5 (thực thi sau 2 giây)
}, 2000);

setImmediate(() => {
  console.log("Immediate callback"); // Bước 4 (chạy ngay sau poll phase)
});

console.log("End"); // Bước 2