import { DownOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space } from 'antd';
import { useAuthStore } from '../stores/useAuthStore';

export default function UserInfo() {
    const {user, clearTokens, setUser} = useAuthStore();
    const items: MenuProps['items'] = [
        {
          key: '1',
          label: 'My Account',
          disabled: true,
        },
        {
          type: 'divider',
        },
        {
          key: '2',
          label: 'Profile',
          extra: '⌘P',
        },
        {
          key: '3',
          label: 'Billing',
          extra: '⌘B',
        },
        {
          key: 'logout',
          label: 'Logout',
          icon: <SettingOutlined />,
          extra: '⌘S',
        },
      ];

      const onClick: MenuProps['onClick'] = ({ key }) => {
           if(key === 'logout'){
            setUser(null);
            clearTokens();
           }
      };
  return (
    <Dropdown menu={{ items, onClick  }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
      <Avatar icon={<UserOutlined />} /> {user?.first_name}  {user?.last_name}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
  )
}
