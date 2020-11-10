export default function ({ redirect, route }) {
  const isMaintenance = false
  if (isMaintenance) {
    return redirect('/maintenance')
  }
  if (isMaintenance === false && route.path === '/maintenance') {
    return redirect('/')
  }
}
