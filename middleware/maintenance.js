export default function ({ redirect, route }) {
  const isMaintenance = true
  if (isMaintenance) {
    return redirect('/maintenance')
  }
  if (isMaintenance === false && route.path === '/maintenance') {
    return redirect('/')
  }
}
