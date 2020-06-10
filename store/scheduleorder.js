export const state = () => ({
  schedules: []
})

export const actions = {
  async updateSchedule({ commit }, schedule) {
    await this.$api.scheduleOrder.update(schedule.dept, {
      order: schedule.order
    })
  }
}
