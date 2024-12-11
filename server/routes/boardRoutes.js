const express = require("express");
const {
    validateCreateBoard,
    validateGetBoard,
    validateUpdateBoard,
    validateDeleteBoard,
    validateGetBoardsByUserId,
    validateGetCompleteBoardsByUserId
} = require("../middleware/boardMiddleware");
const {
    CreateBoard,
    GetBoard,
    UpdateBoard,
    DeleteBoard,
    GetAllBoardByUserId,
    GetAllCompleteBoardByUserId
} = require("../controllers/boardController");

const boardRouter = express.Router();

boardRouter.post("/createBoard", validateCreateBoard, CreateBoard);
boardRouter.post("/getBoard", validateGetBoard, GetBoard);
boardRouter.post("/updateBoard", validateUpdateBoard, UpdateBoard);
boardRouter.post("/deleteBoard", validateDeleteBoard, DeleteBoard);
boardRouter.post("/getBoardsByUserId", validateGetBoardsByUserId, GetAllBoardByUserId);
boardRouter.post("/getCompleteBoardsByUserId", validateGetCompleteBoardsByUserId, GetAllCompleteBoardByUserId);

module.exports = boardRouter;
