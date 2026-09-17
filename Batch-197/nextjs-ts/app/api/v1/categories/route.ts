
// GET http://localhost:3000/api/v1/categories?page=2

import { NextRequest } from "next/server"

//https://nextjs.org/docs/app/api-reference/file-conventions/route
export async function GET(request: NextRequest) {
    //Query string
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page')

    const data = [
        {id: 1, name: 'Laptop'},
        {id: 2, name: 'Mobile'},
    ]
    return Response.json({ data, page })
}

//POST http://localhost:3000/api/v1/categories
export async function POST(request: Request) {
    //body string
    const res = await request.json()
    return Response.json({ message: 'POST', data: res })
}