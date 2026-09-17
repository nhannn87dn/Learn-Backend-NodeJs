import { NextRequest } from "next/server"

// GET http://localhost:3000/api/v1/categories/:id
export async function GET(_req: NextRequest, ctx: RouteContext<'/api/v1/categories/[id]'>) {
    //route params
    const { id: bala } = await ctx.params
    const data = [
        {id: 1, name: 'Laptop'},
        {id: 2, name: 'Mobile'},
    ]
    return Response.json({ data: data.find((c) => c.id === Number(bala)) })
}


//PUT http://localhost:3000/api/v1/categories/id


//DELETE http://localhost:3000/api/v1/categories/id