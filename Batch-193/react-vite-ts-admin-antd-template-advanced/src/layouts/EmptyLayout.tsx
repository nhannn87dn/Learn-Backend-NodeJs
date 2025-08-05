import { Outlet } from 'react-router'
import {  message } from 'antd';
import { useAppMessage } from '../stores/useAppMessage';
import { useEffect } from 'react';
const EmptyLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();
    const {msg, type, clearMessage} = useAppMessage();
  
    useEffect(()=>{
      if (msg) {
        messageApi.info({
          content: msg,
          type: type,
          duration: 3,
          onClose: ()=> clearMessage(),
        });
      }
    }, [msg,type, messageApi, clearMessage]);
  return (
    <main className='empty-layout'>
    <Outlet />
      {contextHolder}
    </main>
  )
}

export default EmptyLayout