import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { apiClientPublic } from '../libs/axiosClient';


interface IUser {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  active: boolean;
  roles: string[];
  fullName: string;
  access_token: string;
  refresh_token: string;
}

type TAuthStore ={
  user: null | IUser;
  isAuthenticated: boolean;
  setUser: (user: IUser | null)=>void;
  login: (email: string, password: string, callback: ()=>void) => void,
  logout: ()=>void
}

export const useAuthStore = create<TAuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        setUser: (user: IUser |  null)=>{
          set({ user });
        },
        login: async(email: string, password: string, callback: ()=>void)=>{
            try {
              const responseLogin = await apiClientPublic.post('/v1/auth/login', {
                email,
                password
              })
              console.log('<<=== 🚀 responseLogin ===>>',responseLogin);
              const accessToken = responseLogin.data.data.accessToken;
                console.log('<<=== 🚀 accessToken ===>>',accessToken);
              if(responseLogin.status == 200){
                
                //gọi tiếp api thứ 2 để lấy profile
                const responseProfile = await apiClientPublic.get('/v1/auth/get-profile', {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              //set state user
              set({user: {
                ...responseProfile.data.data,
                access_token: responseLogin.data.data.accessToken,
                refresh_token: responseLogin.data.data.refreshToken
              }, isAuthenticated: true})
                console.log('<<=== 🚀 responseProfile ===>>',responseProfile);
              //chuyen trang
              callback()
              }
            } catch (error) {
              console.log('<<=== 🚀 error ===>>',error);
            }
        },
        logout: ()=>{
          set({user: null, isAuthenticated: false})
        }
      }),
      {
        name: 'auth-storage', // unique name
        storage: createJSONStorage(() => localStorage), // use local storage
      }
    )
  )
);