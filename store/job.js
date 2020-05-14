export const state = () => ({
  jobs: [],
  departemen: []
})

export const mutations = {
  SET_JOBS(state, jobs) {
    state.jobs = jobs
  },
  ADD_JOB(state, job) {
    state.jobs.push(job)
  },
  EDT_JOB(state, job) {
    state.jobs = state.jobs.map((s) => (s.id_job !== job.id_job ? s : job))
  },
  DEL_JOB(state, id) {
    state.jobs = state.jobs.filter((b) => b.id_job !== id)
  },
  SET_DEPARTEMEN(state, job) {
    state.departemen = job.map((i) => parseInt(i))
  }
}

export const actions = {
  async fetchJobs({ commit }) {
    const res = await this.$api.job.index()
    commit('SET_JOBS', res.data)
  },
  async fetchJob({ commit }, id) {
    const res = await this.$api.job.show(id)
    commit('SET_DEPARTEMEN', res.data)
  },
  async createJob({ commit }, job) {
    const res = await this.$api.job.create(job)
    commit('ADD_JOB', res.data)
  },
  async updateJob({ commit }, job) {
    await this.$api.job.update(job.id_job, job)
    commit('EDT_JOB', job)
  },
  async deleteJob({ commit }, job) {
    await this.$api.job.delete(job.id_job)
    commit('DEL_JOB', job.id_job)
  },
  async fetchDepartemen({ commit }, id) {
    const res = await this.$api.jobDepartemen.show(id)
    commit('SET_DEPARTEMEN', res.data)
  },
  async updateDepartemen({ commit }, { departemen, job }) {
    await this.$api.jobDepartemen.update(departemen, { job })
  }
}

export const getters = {
  fJob: (state) => {
    const job = state.jobs.filter((j) =>
      state.departemen.includes(parseInt(j.id_job))
    )
    return [{ id: undefined, job: undefined, color: 'white' }, ...job]
  },
  getColor: (state) => (id) => {
    const job = state.jobs.find((j) => parseInt(j.id_job) === parseInt(id))
    return job ? job.color : 'white'
  }
}
