'use client';
/***
 * https://github.com/wpcodevo/nextauth-nextjs13-prisma
 */
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';



export const LoginForm = ({csrfToken}: {csrfToken: string | undefined}) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/customers';
  
  const { status } = useSession()

  React.useEffect(()=>{
    if (status  === 'authenticated') {
      router.push(callbackUrl);
  }
  },[status,router,callbackUrl])


  const [loading, setLoading] = useState({
    accLoading: false,
    googleLoading: false,
    facebookLoading: false
  });
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');



  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading({
        ...loading,
        accLoading: true,
      });
      setFormValues({ email: 'john@mail.com', password: 'changeme' });

      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        csrfToken,
        callbackUrl,
      });

      setLoading({
        ...loading,
        accLoading: false,
      });

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('invalid email or password');
      }
    } catch (error: any) {
      setLoading({
        ...loading,
        accLoading: false,
      });
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLoginProvider = async (provider: string) => {
    try {
      setLoading({
        ...loading,
        googleLoading: provider === 'google',
        facebookLoading: provider === 'facebook'
      });
      const res = await signIn(provider, {redirect: false,callbackUrl});
      console.log('handleLoginProvider',res);
      //TODO: add new usser Account after then login Provider
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('invalid email or password');
      }
  } catch (error: any) {
    setLoading({
      ...loading,
      googleLoading: false,
      facebookLoading: false
    });
    setError(error);
  }
   

    
  }

  return (
    <form onSubmit={onSubmit} className="text-center">
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <h2 className="text-2xl mb-3">Login Form</h2>
      {error && <p className="text-center bg-red-300 py-4 my-3 rounded">{error}</p>}
      <div className="mb-2">
        <input required type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="Email address" />
        <p className='text-left text-xs text-slate-500 my-1'>Email test: john@mail.com</p>
      </div>
      <div className="mb-2">
        <input required type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Password" />
        <p className='text-left text-xs text-slate-500 my-1'>Password test: changeme</p>
      </div>
      <button className="w-full" type="submit" disabled={loading.accLoading}>
        {loading.accLoading ? 'loading...' : 'Sign In'}
      </button>

      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center mx-4 mb-0">OR</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <button disabled={loading.googleLoading} type='button' className="btn w-full" onClick={() => handleLoginProvider('google')} role="button">
        {loading.googleLoading ? 'loading...' : 'Continue with Google'}
        </button>
        <button disabled={loading.facebookLoading} type='button' className="btn w-full" onClick={() => handleLoginProvider('google')} role="button">
        {loading.facebookLoading ? 'loading...' : 'Continue with Facebook'}
        </button>
      </div>
    </form>
  );
};
