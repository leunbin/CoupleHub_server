const { memoService } = require("../service");

const memoController = {
  async getAllMemos(req, res, next) {
    try {
      const memos = await memoService.getMemoRecent();
      res.status(200).json({
        success: true,
        message: "find all memos😊",
        data: memos,
      });
    } catch (error) {
      next(error);
    }
  },

  async getMemosById(req, res, next) {
    try {
      const { id } = req.params;
      const memo = await memoService.getMemoById(id);
      res.status(200).json({
        success: true,
        message: "find memo by id 😊",
        data: memo,
      });
    } catch (error) {
      next(error);
    }
  },

  async getMemosByDuedate(req, res, next) {
    try {
      const { date } = req.query;
      const memos = await memoService.getMemoByDuedate(date);
      res.status(200).json({
        success: true,
        message: "find memo by duedate 😊",
        data: memos,
      });
    } catch (error) {
      next(error);
    }
  },

  // update memo
  async putMemo(req, res, next) {
    try {
      const { id } = req.params;
      const newData = req.body;
      const updateMemo = await memoService.updateMemo(id, newData);

      if (!updateMemo) {
        return res.status(404).json({
          success: false,
          message: "Memo not found 😢",
        });
      }

      res.status(200).json({
        success: true,
        message: "update memo successfully 😊",
        data: updateMemo,
      });
    } catch (error) {
      next(error);
    }
  },

  //create memo
  async postMemo(req, res, next) {
    try {
      const newdata = req.body;
      const newMemo = await memoService.createMemo(newdata);

      res.status(200).json({
        success: true,
        message: "create new memo 😊",
        data: newMemo,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteMemo(req, res, next) {
    try {
      const { id } = req.params;
      const memo = await memoService.deleteMemo(id);

      res.status(200).json({
        success: true,
        message: "delete memo successfully 😊",
        data: memo,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = memoController;
