import authApi from '@/api/auth'

export default (ctx, inject) => {
  const authAxios = authApi(ctx.$axios)
  inject('authModul', authAxios())
}
