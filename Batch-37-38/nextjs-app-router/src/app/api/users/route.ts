
const users = [
    {id: 1, name: 'David'},
    {id: 2, name: 'Tom'}
]
//GET api/users
export async function GET() {
    /**
     * Ở đây bạn có thể liên kết trược tiếp với Dababase
     * Hoặc có thể gọi API
     *  */
   
    //getAll
    return Response.json(users)
}

//POST api/users

export async function POST(request: Request) {
    const body = await request.json();
    return Response.json(body)
}



