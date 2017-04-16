export default { info, error }

export function info () {
  console.log.apply(console, arguments)
}

export function error () {
  console.error.apply(console, arguments)
}
