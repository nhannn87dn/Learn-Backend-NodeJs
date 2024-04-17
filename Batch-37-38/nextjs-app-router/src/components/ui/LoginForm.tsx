'use client'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { signIn, useSession } from 'next-auth/react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
  .required()

const callbackUrl = '/customers'
/**
 * 
 * Được hiểu ngầm định là Server component
 */
const LoginForm = ({csrfToken}: {csrfToken: string | undefined}) => {
    const [error, setError] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] =  useState(false)

    const { status } = useSession()

    //Nếu đã login rồi, thì chuyển hướng sang callbackUrl
    useEffect(()=>{
        if (status  === 'authenticated') {
        router.push(callbackUrl);
    }
    },[status,router,callbackUrl])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
       
        const res = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
            csrfToken,
            callbackUrl: callbackUrl, //nếu login thanh cong thi chuyen huong
          });
        ///
        console.log(res);
        //check nếu login thành công thì chuyển hướng
        if(res && res.ok){
            router.push(callbackUrl);
        }else{
            setError('invalid email or password');
        }

        setIsLoading(false);

    } catch (error: any) {
        console.log('error',error);
        setIsLoading(false);
        setError(error?.message)
    }
    
  }

  return (
    <div>
         <div className="login_wrapper max-w-[300px] rou mx-auto p-5">
            <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
                {error && <p className="text-center bg-red-300 py-4 my-3 rounded">{error}</p>}
                <div>
                    <input placeholder="Enter your email" {...register("email")} />
                    <p>{errors.email?.message}</p>
                </div>
                <div>
                <input placeholder="Enter your password" {...register("password")} />
                <p>{errors.password?.message}</p>
                </div>
                <button disabled={isLoading} type="submit" className="btn btn-primary">
                    {isLoading ? 'Processing...' : 'Login'}
                </button>
                
            </form>
            <button onClick={()=>{
                  console.log('gg');
                  const res = signIn('google', {redirect: true,callbackUrl})
                  console.log('res google', res);
                }}  type="button" className="btn block w-full mt-4">
                    Login with Google
                </button>
         </div>
    </div>
  )
}

export default LoginForm