function first() {
  // Mô phỏng delay code
  setTimeout(function () {
    console.log("Một");
  }, 5000);
}
function second() {
  console.log("Hai");
}
// first();
// second();

function doHomework(subject, callback) {
  console.log(`Bắt đầu làm bài tập ${subject}.`);
  callback();
}

// doHomework("Toán", () => {
//   console.log("Làm bài tập xong!");
// });

const sum = (a, b) => {
  if (typeof a === "string" || typeof b === "string") {
    throw new Error("Doi so khong hop le");
  }
  return a + b;
};

const t = sum("2", 4);
console.log(t);
