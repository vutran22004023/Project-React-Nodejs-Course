import {UserModel} from '../../models/index.js'
import {TokenMiddleware} from '../../middlewares/index.js'
import sendEmailResetPassword from '../../emails/EmailforgotPassword.js'
import bcrypt from "bcrypt";
const LoginIn = async(user) => {
    try {
        const { email, password } = user;
        const checkUser = await UserModel.findOne({
            email: email,
          });
          if (checkUser === null) {
            return {
                status: "ERR",
                message: "Tài khoản không tồn tại",
            };
          }

          const comparePasswords = bcrypt.compareSync(password,checkUser.password)
          if(!comparePasswords) {
            return {
              status: "ERR",
              message: "Mật khẩu không đúng"
            }
          }

          if(checkUser) {
            const access_Token =await TokenMiddleware.generateAccessToken({
              id: checkUser._id,
              isAdmin: checkUser.isAdmin
            })
            const refresh_Token = await TokenMiddleware.generateRefreshToken({
              id: checkUser._id,
              isAdmin: checkUser.isAdmin
            })
            return {
              status: 200,
              message: "Đăng nhập thành công",
              id: checkUser._id,
              access_Token,
              refresh_Token
            };
          }
         else {
            return res.status(404).json({
                message: "Đăng nhập không thành công"
            })
          }
    }catch(err) {
        return res.status(404).json({
            message: err
        })
    }
}

const Register = async(user) => {
    try {
      const { name, email, password } = user;
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS)
      );
      const checkUser = await UserModel.findOne({
        email: email,
      });
      if (checkUser !== null) {
        return {
          status: "ERR",
          message: "Tài Khoản đã tồn tại",
        };
      }
      const createdUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });
      if (createdUser) {
        return {
          status: 200,
          message: "Đăng ký thành công",
          data: {
            ...createdUser._doc,
            password: "not password",
          },
        };
      } else {
        throw new Error("Tạo người dùng thất bại.");
      }
    }catch(err) {
      return res.status(404).json({
        message: err
    })
    }
}

const forgotPassword = async (email) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
            status: 'ERR',
            message: 'Email không tồn tại',
        });
    }

    const resetToken  =await TokenMiddleware.generateAccessTokenResetPassword({
      id: user._id,
    })

    await sendEmailResetPassword(user, resetToken);
    }catch(err) {
      return res.status(404).json({
        message: err
    })
    }
}

const resetPassword = async(token,newPassword) =>  {
  try {
    const decoded = TokenMiddleware.verifyResetToken(token);
    const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Người dùng không tồn tại',
            });
        }
    const hashedPassword = bcrypt.hashSync(newPassword, 10); 
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      status: 'OK',
      message: 'Đặt lại mật khẩu thành công',
  });
  }catch(err) {
    return res.status(404).json({
      message: err
  })
  }
}

export default {
    LoginIn,
    Register,
    forgotPassword,
    resetPassword
}