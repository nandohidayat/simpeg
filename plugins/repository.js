import createRepository from '@/api/repository'

const queryGenerator = (query) => {
  if (Object.entries(query).length === 0 && query.constructor === Object)
    return ''

  const entries = Object.entries(query)
  const arr = []
  for (const [key, value] of entries) {
    arr.push(`${key}=${value}&`)
  }
  return '?' + arr.join('')
}

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)
  const repositories = {
    absen: repositoryWithAxios('absen'),
    akses: repositoryWithAxios('akses'),
    departemen: repositoryWithAxios('departemen'),
    karyawan: repositoryWithAxios('karyawan'),
    pegawai: repositoryWithAxios('pegawai'),
    ruang: repositoryWithAxios('ruang'),
    schedule: {
      ...repositoryWithAxios('schedule'),
      print(query) {
        return ctx.$axios.$get(`schedule/print${queryGenerator(query)}`)
      },
      export(query) {
        return ctx.$axios.$get(`schedule/excel${queryGenerator(query)}`)
      },
    },
    scheduleChange: repositoryWithAxios('schedule/change'),
    scheduleRequest: repositoryWithAxios('schedule/request'),
    scheduleAssessor: repositoryWithAxios('schedule/assessor'),
    scheduleAccess: repositoryWithAxios('schedule/access'),
    scheduleOrder: repositoryWithAxios('schedule/order'),
    shift: repositoryWithAxios('shift'),
    shiftDepartemen: repositoryWithAxios('shift/departemen'),
    job: repositoryWithAxios('job'),
    jobDepartemen: repositoryWithAxios('job/departemen'),
    pendapatanharian: repositoryWithAxios('pendapatan/harian'),
    pendapatanprofil: repositoryWithAxios('pendapatan/profil'),
    pendapatanpeg: repositoryWithAxios('pendapatanpeg'),
    logdepartemen: repositoryWithAxios('log/departemen'),
  }

  inject('api', repositories)
}
