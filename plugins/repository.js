import createRepository from '@/api/repository'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)
  const repositories = {
    absen: repositoryWithAxios('absen'),
    akses: repositoryWithAxios('akses'),
    departemen: repositoryWithAxios('departemen'),
    karyawan: repositoryWithAxios('karyawan'),
    ruang: repositoryWithAxios('ruang'),
    schedule: {
      ...repositoryWithAxios('schedule'),
      export(id) {
        return ctx.$axios.$get(`schedule/export/${id}`)
      }
    },
    shift: repositoryWithAxios('shift'),
    shiftDepartemen: repositoryWithAxios('shift/departemen'),
    pendapatanharian: repositoryWithAxios('pendapatanharian')
  }

  inject('api', repositories)
}
