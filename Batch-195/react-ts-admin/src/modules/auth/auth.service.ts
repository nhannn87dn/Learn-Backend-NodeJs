import axios from "axios"

export const authLogin = async({
    email,
    password
}: {
    email: string,
    password: string
})=>{
    const response = await axios.post('/api/v1/auth/login',{
        email,
        password
    })
    return response.data
}