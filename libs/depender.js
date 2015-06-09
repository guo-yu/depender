export default class Depender() {
  constructor() {
    this.modules = {}
  }

  define(name, fn) {
    this.modules[name] = fn
    return this.modules[name]
  }

  fetch(arguments) {
    var funcs = []

    arguments.forEach(argument => {
      var name = trim(argument)
      funcs.push(this.modules[name] || undefined)
    })

    return funcs
  }

  get(name) {
    return this.modules[name] || null
  }

  use(fn) {
    if (typeof(fn) === 'string')
      return this.get(fn)

    if (typeof(fn) === 'function')
      return fn.apply(fn, this.fetch(splitArguments(fn)))

    return false
  }

  destory(name) {
    const exist = name && this.modules[name]

    if (!exist)
      return false

    delete this.modules[name]
    return true
  }
}

function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, '')
}

function splitArguments(fn) {
  let left = fn.toString().split(')')[0]
  let params = left.substr(left.indexOf('(') + 1)
  let arguments = params.split(',')

  return arguments
}
