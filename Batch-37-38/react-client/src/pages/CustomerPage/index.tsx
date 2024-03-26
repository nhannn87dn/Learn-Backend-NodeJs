import { Outlet, Link } from 'react-router-dom';

const CustomerPage = () => {
 
  return (
    <div className='container mx-auto'>
    <h1 className='py-5'>Customer Page</h1>
      <div className="grid grid-cols-12">
          <div className="col-span-4">
            <ul>
              <li><Link to={'/customer'}>Dashboard</Link></li>
              <li><Link to={'/customer/orders'}>Danh sách đơn hàng</Link></li>
              <li><Link to={'/customer/profile'}>Thông tin cá nhân</Link></li>
              <li>
                <button type='button'>Đăng Xuất</button>
              </li>
            </ul>
          </div>
          <div className="col-span-8">
            <Outlet />
          </div>
      </div>
    </div>
  )
}

export default CustomerPage