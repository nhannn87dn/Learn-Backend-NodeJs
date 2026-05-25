import { ENV } from "../config/env";
import staffsService from "./staffs.service";
import jwt from "jsonwebtoken";

const login = async (email: string, password: string) => {
  //.1 Xác thực thông tin đăng nhập của nhân viên
  const staff = await staffsService.verifyStaffCredentials(email, password);
  //2. Tạo tokens (access token và refresh token)

  const payload = {
    sub: staff._id,
    email: staff.email,
    role: staff.role,
  };

  const accessToken = jwt.sign(
    payload,
    ENV.JWT_SECRET,
    {
      expiresIn: "1h", //thời gian hết hạn của access token, 1 giờ
    },
  );
    const refreshToken = jwt.sign(
    payload,
    ENV.JWT_SECRET,
    {
      expiresIn: "7d", //thời gian hết hạn của refresh token, 7 ngày
    },
  );

  return {
    accessToken,
    refreshToken,
  }
};

export default {
  login,
};
