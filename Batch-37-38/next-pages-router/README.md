 Khi nào thì dùng getStaticProps, getServerSideProps

 1. getStaticProps: 
 - Nội dung rất lâu mới thay đổi 1 lần. thì ko cần cấu hình revalidate
 - Nội dung thay đổi hàng ngày. Cấu hình thêm revalidate

2. getServerSideProps: 
- Cần nội dung cập nhật tức thì: chứng khoán


Cần nắm các khái niệm Render

- SSR (server side rendering) là gì
- SSG (site static generate) là gì
- CSR (client slide rendering) là gì

getStaticPath() để làm gì?
getStaticPath --> luôn đi cùng getStaticProps