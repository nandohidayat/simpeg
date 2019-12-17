import createRepository from '@/api/repository'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)
  const repositories = {
    karyawan: repositoryWithAxios('karyawan'),
    departemen: repositoryWithAxios('departemen'),
    ruang: repositoryWithAxios('ruang')
  }

  inject('api', repositories)
}
