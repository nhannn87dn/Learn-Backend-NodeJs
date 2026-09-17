'use client'

const Button = () => {
    console.log('Client Button');
  return (
    <div>
        <button onClick={()=>{
            console.log('Login');
        }}>Login</button>
    </div>
  )
}

export default Button