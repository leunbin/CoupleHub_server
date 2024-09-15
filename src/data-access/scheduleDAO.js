const { Schedule } = require("./model");

class ScheduleDAO {
  async create(newData) {
    const schedule = new Schedule(newData);
    await schedule.save();

    return schedule.toObject();
  }

  async find() {
    const schedules = await Schedule.find().lean();
    return schedules;
  }

  async findById(id) {
    const schedule = await Schedule.findById(id).lean();
    return schedule;
  }

  async findByDate(date) {
    const localDate = new Date(date);
    const offset = 9 * 60; 
  
    const startOfDayLocal = new Date(localDate);
    startOfDayLocal.setHours(0, 0, 0, 0);
  
    const endOfDayLocal = new Date(localDate);
    endOfDayLocal.setHours(23, 59, 59, 999);
  
    const startOfDayUTC = new Date(startOfDayLocal.getTime() - offset * 60 * 1000);
    const endOfDayUTC = new Date(endOfDayLocal.getTime() - offset * 60 * 1000);

    const schedules = await Schedule.find({
      date: { $gte: startOfDayUTC, $lt: endOfDayUTC }
    }).lean();
  
    return schedules;
  };
  

  async updateSchedule(id, updateData) {
    const schedule = await Schedule.findByIdAndUpdate(id, updateData).lean();
    return schedule;
  }

  async deleteById(id) {
    const schedule = await Schedule.findByIdAndDelete(id).lean();
    return schedule;
  }
}

module.exports = new ScheduleDAO();
