//GetALL products
export async function GET(request: Request) {
    //TODO: gọi đến database để lấy dữ liệu sản phẩm
     return Response.json({ message: "Get all products" });
}

//create a new product
export async function POST(request: Request) {
    return Response.json({ message: "Create a new product" });
}