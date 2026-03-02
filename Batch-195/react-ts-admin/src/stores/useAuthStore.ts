import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { apiClientPublic } from '../libs/axiosClient';


interface IUser {
  _id: string;
  email: string;
  active: boolean;
  roles: string[];
  fullName: string;
  access_token: string;
  refresh_token: string;
}

type TAuthStore ={
  user: null | IUser; //lưu trữ thông tin user đã đăng nhập
  isAuthenticated: boolean; // đã login chưa
  setUser: (user: IUser | null)=>void;
  isLoading: boolean;
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
        isLoading: false,
        login: async(email: string, password: string, callback: ()=>void)=>{
            try {
              set({ isLoading: true });
              const responseLogin = await apiClientPublic.post('/v1/auth/login', {
                email,
                password
              })
              console.log('<<=== 🚀 responseLogin ===>>',responseLogin);
              const accessToken = responseLogin.data.data.accessToken;
                console.log('<<=== 🚀 accessToken ===>>',accessToken);
              if(responseLogin.status == 200){
                set({ isLoading: false });
                //gọi tiếp api thứ 2 để lấy profile
                const responseProfile = await apiClientPublic.get('/v1/auth/profile', {
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
              set({ isLoading: false });
              console.log('<<=== 🚀 error ===>>',error);
            }
        },
        logout: ()=>{
          set({user: null, isAuthenticated: false})
          //remove accessToken from localStorage
          localStorage.removeItem('auth-storage-195');
        }
      }),
      {
        name: 'auth-storage-195', // unique name
        storage: createJSONStorage(() => localStorage), // use local storage
      }
    )
  )
);