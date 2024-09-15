const { Note, Checklist } = require("./model");

class memoDAO {
  async create(memoData) {
    if (memoData.type === "Note") {
      const memo = new Note(memoData);
      await memo.save();
      return memo.toObject();
    } else if (memoData.type === "Checklist") {
      const memo = new Checklist(memoData);
      await memo.save();
      return memo.toObject();
    }
  }

  async find() {
    const notes = await Note.find().lean();
    const checklists = await Checklist.find().lean();
    const allMemos = [...notes, ...checklists];
    return allMemos.sort(
      (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
    );
  }

  async findById(id) {
    try {
      return await Note.findById(id).orFail();
    } catch {
      return await Checklist.findById(id).orFail();
    }
  }

  async findByDueDate(date) {
    const localDate = new Date(date);
    const offset = 9 * 60; // KST는 UTC+9, 즉 540분
  
    // KST 시간으로 시작과 끝 날짜 생성
    const startOfDayLocal = new Date(localDate);
    startOfDayLocal.setHours(0, 0, 0, 0);
    
    const endOfDayLocal = new Date(localDate);
    endOfDayLocal.setHours(23, 59, 59, 999);
    
    // KST에서 UTC로 변환
    const startOfDayUTC = new Date(startOfDayLocal.getTime() - offset * 60 * 1000);
    const endOfDayUTC = new Date(endOfDayLocal.getTime() - offset * 60 * 1000);
    
    // UTC 시간대로 쿼리
    const notes = await Note.find({
      dueDate: { $gte: startOfDayUTC, $lt: endOfDayUTC }
    }).lean();
    
    const checklists = await Checklist.find({
      dueDate: { $gte: startOfDayUTC, $lt: endOfDayUTC }
    }).lean();
    
    const allMemoes = [...notes, ...checklists];
    
    return allMemoes.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }
  

  async updateMemo(id, updateData) {
    if (updateData.type === "Note") {
      const result = await Note.findByIdAndUpdate(id, updateData, {
        new: true,
      }).orFail();
      return result;
    } else if (updateData.type === "Checklist") {
      const result = await Checklist.findByIdAndUpdate(id, updateData, {
        new: true,
      }).orFail();
      return result;
    } else {
      throw new Error("Invalid type 😢");
    }
  }

  async deleteById(id) {
    try {
      return await Note.findByIdAndDelete(id).orFail();
    } catch {
      return await Checklist.findByIdAndDelete(id).orFail();
    }
  }
}

module.exports = new memoDAO();
