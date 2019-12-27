import createRepository from '@/api/repository'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)
  const repositories = {
    karyawan: repositoryWithAxios('karyawan'),
    departemen: repositoryWithAxios('departemen'),
    ruang: repositoryWithAxios('ruang'),
    schedule: repositoryWithAxios('schedule'),
    shift: repositoryWithAxios('shift'),
    akses: repositoryWithAxios('akses')
  }

  inject('api', repositories)
}
