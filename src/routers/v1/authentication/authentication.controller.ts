import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import _size from "lodash/size";

import {AppError, catchAsync} from "utils/error.util";

import UserModel from "../user/user.model";
import {STATUS_CODE} from "constants/common.constants";

const MILLISECOND_EXPIRES_TIME = 24 * 60 * 60 * 1000;

const signToken = ({res, user}: any) => {
   const token = jwt.sign({email: user.email, id: user._id}, "iloveyou", {
      expiresIn: "2h",
   });

   const cookieOptions: any = {expires: new Date(Date.now() + MILLISECOND_EXPIRES_TIME)};

   // if (process.env.NODE_ENV === "production") {
   // }
   cookieOptions.secure = true;
   cookieOptions.httpOnly = true;

   const {_id, email, name} = user;

   res.cookie("UFO", token, cookieOptions);
   res.status(200).json({
      status: "success",
      token,
      data: {user: {_id, email, name}},
   });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const {email, password} = req.body;

      const user = await UserModel.findOne({email}).select("+password");

      if (!user) {
         res.status(StatusCodes.UNAUTHORIZED).json({
            status: "false",
            message: {email: "Email not exist"},
         });
         return;
      }

      const correctPassword = await user.correctPassword(password, user.password);
      if (!correctPassword) {
         res.status(StatusCodes.UNAUTHORIZED).json({
            status: "false",
            message: {password: "Password not correct"},
         });
         return;
      }

      const secretKey = "iloveyou";
      if (!secretKey) {
         res.end();
         return;
      }
      signToken({user, res});
   } catch (err) {
      next(err);
   }
};

export const forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const {email} = req.body;
   const user = await UserModel.findOne({email});
   if (!user) {
      return next(new AppError("Opps! There is no user with email address", STATUS_CODE.UNAUTHORIZED));
   }
   // 2. Generate random token
   // const resetToken = user.createPasswordResetToken();
   await user.save();
   // 3. Send an email
   res.json(user);
});

export const updatePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   // Get
   //@ts-ignore
   const user: any = await UserModel.findById(req.user._id).select("+password");
   // Check password
   const correct = await user?.correctPassword(req.body.passwordCurrent, user.password);
   if (!correct) {
      return next(new AppError("Your current password is wrong.", STATUS_CODE.UNAUTHORIZED));
   }
   user.password = req.body.password;
   user.passwordConfirm = req.body.passwordConfirm;
   await user.save();
   signToken({res, user});
});
