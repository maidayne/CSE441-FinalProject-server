const User = require("../models/User");
const Board = require("../models/Board");
const logger = require("../utils/logger");
const { sendSuccess, sendError } = require("../utils/response");

async function GetUserProfile(req, res) {
  const reqGetProfile = req.body;
  try {
    let user = await User.findById(reqGetProfile.user_id);
    if (!user) {
      return sendError(res, 401, "Unauthorized", {
        details: "User is not registered",
      });
    } else {
      return sendSuccess(res, "Get user data success", user);
    }
  } catch (error) {
    return sendError(res, 500, "Error getting user profile", error);
  }
}

async function UpdateUserProfile(req, res) {
  try {
    const { user_update_details, user_id } = req.body;

    // Kiểm tra object user_update_details có rỗng không
    if (!user_update_details || Object.keys(user_update_details).length === 0) {
      return sendError(res, 400, "No data to update", {
        details: "No valid fields provided",
      });
    }

    // Tìm user
    const user = await User.findById(user_id);

    if (!user) {
      return sendError(res, 404, "User not found", {
        details: "User not registered yet",
      });
    }

    // Chỉ cập nhật các trường hợp lệ
    const allowedFields = ["user_full_name", "user_avatar_url", "user_email"];

    // Cập nhật các trường hợp lệ
    let hasUpdated = false;

    for (const key in user_update_details) {
      if (
        allowedFields.includes(key) &&
        user[key] !== user_update_details[key]
      ) {
        user[key] = user_update_details[key];
        hasUpdated = true;
      }
    }

    if (!hasUpdated) {
      return sendError(res, 400, "No fields were updated", {
        details: "Nothing to update, values are the same",
      });
    }

    user.updated_at = Date.now();

    // Lưu thay đổi vào CSDL
    const updatedUser = await user.save();
    // await updatedBoard
    //     .populate("created_by", "user_full_name user_email")
    //     .populate(
    //         "board_collaborators.board_collaborator_id",
    //         "user_full_name user_email"
    //     )
    //     .populate("board_lists.list_id")
    //     .execPopulate();

    // Trả về thành công
    return sendSuccess(res, "User updated successfully", updatedUser);
  } catch (error) {
    logger.error(`Error with UpdateUser: ${error}`);
    return sendError(res, 500, "Internal Server Error", {
      details: error.message,
    });
  }
}

async function GetBoardsBasicInfoByUserId(req, res) {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      logger.error("User ID is missing");
      return sendError(res, 400, "User ID is required");
    }

    const totalBoardsCount = await Board.countDocuments({
      created_by: user_id,
    });
    const completedBoardsCount = await Board.countDocuments({
      created_by: user_id,
      isCompleted: true,
    });

    logger.info("Get information complete");
    return sendSuccess(res, "Information retrieved successfully", {
      totalBoards: totalBoardsCount,
      completedBoards: completedBoardsCount,
    });
  } catch (error) {
    logger.error(`Error in GetBoardsBasicInfoByUserId: ${error.message}`, {
      stack: error.stack,
    });

    return sendError(res, 500, "Internal Server Error", {
      details: error.message,
    });
  }
}

module.exports = {
  GetUserProfile,
  UpdateUserProfile,
  GetBoardsBasicInfoByUserId,
};
