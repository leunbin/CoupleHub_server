const { scheduleService } = require('../service');

const scheduleController = {
  async getSchedules (req,res,next) {
    try{
      const schedules = await scheduleService.getSchedules();
      res.status(200).json({
        success: true,
        message: "find all schedules 😊",
        data: schedules,
      });
    }catch(error) {
      next(error)
    }
  },
  
  async getScheduleById(req,res,next) {
    try{
      const {id} = req.params;
      const schedule = await scheduleService.getScheduleById(id);
      res.status(200).json({
        success: true,
        message: "find schedule by id 😊",
        data: schedule,
      });
    } catch (error) {
      next(error);
    }
  },

  async getScheduleByDate(req,res,next) {
    try{
      const { date } = req.query;
      console.log(date);
      const schedules = await scheduleService.getScheduleByDate(date);
      res.status(200).json({
        success: true,
        message: "find schedules by date 😊",
        data: schedules,
      })
    } catch (error) {
      next(error);
    }
  },

  async putSchedule(req,res,next) {
    try{
      const { id } = req.params;
      const newData= req.body;
      const updateSchedule = await scheduleService.updateSchedule(id, newData);

      if (!updateSchedule) {
        return res.status(404).json({
          success: false,
          message: "Schedule not found 😢",
        });
      }

      res.status(200).json({
        success: true,
        message: "update schedule successfully 😊",
        data: updateMemo,
      });
    } catch(error) {
      next(error);
    }
  },

  async postSchedule(req,res,next) {
    try{
      const newData = req.body;
      const newSchedule = await scheduleService.createSchedule(newData);

      res.status(200).json({
        success: true,
        message: "create new schedule 😊",
        data: newSchedule,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteSchedule(req,res,next) {
    try{
      const {id} = req.params;
      const schedule = await scheduleService.deleteSchedule(id);

      res.status(200).json({
        success: true,
        message: "delete schedule successfully 😊",
        data: schedule,
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = scheduleController;