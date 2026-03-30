//Get Single Product bi ID
export async function GET(request: Request, ctx: RouteContext<'/api/v1/products/[id]'>) {
    const id = (await ctx.params).id;
    console.log('<<=== 🚀 id ===>>',id);
    //TODO: gọi đến database để lấy dữ liệu sản phẩm theo ID
        return Response.json({ message: `Get product with ID: ${id}` });
}

//Update Product by ID
export async function PUT(request: Request, ctx: RouteContext<'/api/v1/products/[id]'>) {
    const id = (await ctx.params).id;
    //TODO: gọi đến database để cập nhật dữ liệu sản phẩm theo ID
        return Response.json({ message: `Update product with ID: ${id}` });
}

//Delete Product by ID
export async function DELETE(request: Request, ctx: RouteContext<'/api/v1/products/[id]'>) {
    const id = (await ctx.params).id;
    //TODO: gọi đến database để xóa sản phẩm theo ID
    return Response.json({ message: `Delete product with ID: ${id}` });
}