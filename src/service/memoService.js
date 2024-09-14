const { memoDAO } = require('../data-access');

class MemoService {
  async createMemo (memoData) {
    const newMemo = await memoDAO.create(memoData);
    return newMemo;
  }

  async getMemoRecent() {
    const memos = await memoDAO.find();
    return memos;
  }

  async getMemoById(id) {
    const memo = await memoDAO.findById(id);
    return memo;
  }

  async getMemoByDuedate(date) {
    const memos = await memoDAO.findByDueDate(date);
    return memos;
  }

  async updateMemo(id, updateData) {
    const newMemo = await memoDAO.updateMemo(id,updateData);
    return newMemo;
  }

  async deleteMemo(id) {
    const memo = await memoDAO.deleteById(id);
    return memo;
  }
}

module.exports = new MemoService();