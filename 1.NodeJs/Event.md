# Event và EventEmitter

Node.js dựa trên kiến trúc hướng sự kiện không đồng bộ trong đó một số đối tượng nhất định được gọi là emitters định kỳ phát ra (emit) các sự kiện (Events) khiến các Listener Object được gọi.

Khi đối tượng EventEmitter phát ra một sự kiện, tất cả các hàm được gắn vào sự kiện cụ thể đó được gọi một cách đồng bộ.

Mỗi hành động trên máy tính đều được coi là 1 sự kiện, ví dụ như : ghi file, đọc file, kết nối đến cơ sở dữ liệu, đọc cơ sở dữ liệu, lấy dữ liệu ra từ cơ sở dữ liệu, ...

Để sử dụng event trong nodejs, trước tiên chúng ta cần phải sử dụng một module có sẵn trong nodejs đó là events. Tất cả các phương thức hay thuộc tính của event đều là 1 biểu hiện của EventEmitter, do đó để sử dụng các phương thức hay thuộc tính này, chúng ta cần tạo 1 đối tượng EventEmitter.

```js
var events = require('events');
var eventEmitter = new events.EventEmitter();
```

Trong NodeJS, Listener là một hàm, nó sẽ được gọi để thực thi khi sự kiện xẩy ra. Có thể có 0, 1 hoặc nhiều Listener đang được gắn (bind) với sự kiện đó.

```js
eventEmitter.on('clicked', function () {
  console.log('Something is clicked!');
});

eventEmitter.addListener('clicked', function () {
  console.log('Something is clicked!');
});
```

Lưu ý: Phương thức on và addListener là hoàn toàn tương tự nhau

## Các phương thức của lớp EventEmitter

## Ví dụ về Event và EventEmitter

eventEmitter.on('clicked', function() {
console.log('Something is clicked!');
})

eventEmitter.emit('clicked');

Phương thức emit sẽ kích hoạt event clicked và nó sẽ gọi đến event clicked đang được lắng nghe bằng phương thức on

eventEmitter.on('clicked', function(button) {
console.log(button + ' is clicked!');
})

eventEmitter.emit('clicked', 'button 1');

Chúng ta cũng có thể truyền cái đối số vào callback khi event được kích hoạt, như ví dụ trên thì chương trình sẽ in ra dòng chữ button 1 is clicked.

Chúng ta cũng có thể truyền nhiều đối số vào event tương ứng với số lượng mà chúng ta truyền vào phương thức emit

eventEmitter.on('clicked', function(button, a, b, c) {
console.log(button + ' is clicked!');
})

eventEmitter.emit('clicked', 'button 1', '1', '2', '3');

Các biến a, b, c sẽ tương ứng là '1', '2', '3'.

Giới thiệu về phương thức inherits
Có một cách để các Object khác cũng có thể sử dụng các phương thức của event đó là sử dụng inherits trong module util (cũng là 1 module có sẵn của nodejs)

var events = require('events');
var util = require('util');

var Students = function(name) {
this.name = name;
}

util.inherits(Students, events.EventEmitter);

var max = new Students('max');

max.on('scored', function(marks) {
console.log(max.name + ' scores '+ marks+ ' marks');
})

max.emit('scored', 95);

var tom = new Students('tom');

tom.on('scored', function(marks) {
console.log(tom.name + ' scores '+ marks+ ' marks');
})

tom.emit('scored', 60);

Và kết quả:
