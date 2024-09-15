const { scheduleDAO } = require("../data-access");

class ScheduleService {
  async createSchedule(scheduleData) {
    const newSchedule = await scheduleDAO.create(scheduleData);
    return newSchedule;
  }

  async getSchedules() {
    const schedules = await scheduleDAO.find();
    return schedules;
  }

  async getScheduleById(id) {
    const schedule = await scheduleDAO.findById(id);
    return schedule;
  }

  async getScheduleByDate(date) {
    const schedules = await scheduleDAO.findByDate(date);
    return schedules;
  }

  async updateSchedule(id, updateSchedule) {
    const newSchedule = await scheduleDAO.updateSchedule(id, updateSchedule);
    return newSchedule;
  }

  async deleteSchedule(id) {
    const schedule = await scheduleDAO.deleteById(id);
    return schedule;
  }
}

module.exports = new ScheduleService();
