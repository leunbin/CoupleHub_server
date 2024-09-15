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

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
  
    const notes = await Note.find({
      dueDate: { $gte: startOfDay, $lt: endOfDay }
    }).lean();
  
    const checklists = await Checklist.find({
      dueDate: { $gte: startOfDay, $lt: endOfDay }
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
