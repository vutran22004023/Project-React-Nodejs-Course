import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const authAdmin = (req, res, next) => {
  const authHeader = req.headers.token;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'ERR',
      message: 'Token không hợp lệ hoặc không có token',
    });
  }
  const token = req.headers.token.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        status: 'ERR',
        message: 'Token không đúng',
      });
    }
    if (user?.isAdmin === true) {
      next();
    } else {
      return res.status(404).json({
        status: 'ERR',
        message: 'Tài khoản không có quyền admin',
      });
    }
  });
};

const authUser = (req, res, next) => {
  const authHeader = req.headers.token;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'ERR',
      message: 'Token không hợp lệ hoặc không có token',
    });
  }
  const token = req.headers.token.split(' ')[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        status: 'ERR',
        message: 'Token không đúng',
      });
    }
    if ((user?.isAdmin === true || user?.isAdmin === false) && user?.id === userId) {
      req.user = user;
      next();
    } else {
      return res.status(404).json({
        status: 'ERR',
        message: 'Tài khoản không có quyền admin',
      });
    }
  });
};

const verifyResetToken = (token) => {
  return jwt.verify(token, process.env.RESET_TOKEN);
};

export default {
  verifyResetToken,
  authAdmin,
  authUser,
};
