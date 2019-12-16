import createRepository from '@/api/repository'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)
  inject('karyawanApi', repositoryWithAxios('/karyawan'))
  inject('departemenApi', repositoryWithAxios('/departemen'))
  inject('ruangApi', repositoryWithAxios('/ruang'))
}
