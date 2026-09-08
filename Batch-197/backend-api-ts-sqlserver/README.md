# Chạy MongoDB Qua docker

Khởi chạy bằng lệnh từ thư mục gốc dự án :

```bash
docker compose up -d
```

Dừng container giữ nguyên dữ liệu bằng lệnh:

```bash
docker compose down
```

Dừng container và xóa dữ liệu bằng lệnh:

```bash
docker compose down -v
```


Kết nối với nodejs bằng cú pháp

```
mongodb://admin:secret@localhost:27017/
```

- với admin là username
- secret là password