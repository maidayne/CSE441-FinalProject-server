const express = require("express");
const {
  validateGetUserProfile,
  validateUpdateUserProfile,
  validateGetBoardsInforByUserId,
} = require("../middleware/userMiddleware");
const {
  GetUserProfile,
  UpdateUserProfile,
  GetBoardsBasicInfoByUserId,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/getProfile", validateGetUserProfile, GetUserProfile);
userRouter.post("/updateProfile", validateUpdateUserProfile, UpdateUserProfile);
userRouter.post("/getBasicBoardInfoByUserId", validateGetBoardsInforByUserId,GetBoardsBasicInfoByUserId)

module.exports = userRouter;