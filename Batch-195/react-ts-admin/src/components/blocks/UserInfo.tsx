import { Button } from 'antd';
import { useAuthStore } from '../../stores/useAuthStore';

const UserInfo = () => {
   const {user, logout} = useAuthStore();
    return (
      <div>
        Hello {user?.fullName}
        <Button onClick={logout} type="primary" style={{ marginLeft: 16 }}>
          Logout
        </Button>
      </div>
    )
}

export default UserInfo