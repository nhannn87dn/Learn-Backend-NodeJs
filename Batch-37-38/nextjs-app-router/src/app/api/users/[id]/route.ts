const users = [
    {id: 1, name: 'David'},
    {id: 2, name: 'Tom'}
]
//GET api/users/:id
export async function GET(request: Request,
    { params }: { params: { id: string } }) {

    const id = params.id
    console.log('API users/:id',id);
    /**
     * Ở đây bạn có thể liên kết trược tiếp với Dababase
     * Hoặc có thể gọi API
     *  */
    //getById
    if(id){
        const user = users.find(u=> u.id == parseInt(id));
        return Response.json(user)
    }
    return Response.json({
        message: 'ID not undefined'
    })
    
}

//PUT api/users/:id
export async function PUT(request: Request,
    { params }: { params: { id: string } }) {

}

//DELETE api/users/:id
export async function DELETE(request: Request,
    { params }: { params: { id: string } }) {

}