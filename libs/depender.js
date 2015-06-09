export default class Depender {
  constructor() {
    this.deps = {}
  }

  define(name, fn) {
    this.deps[name] = fn
    return this
  }

  get(name) {
    return this.deps[name]
  }

  remove(name) {
    const exist = this.get(name)

    if (!exist)
      return

    delete this.deps[name]
    return this
  }

  use(fn) {
    if (typeof(fn) !== 'function')
      return

    fn.apply(
      fn, 
      splitArguments(fn)
        .map(item => this.get(trim(item)))
    )

    return this
  }
}

function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, '')
}

function splitArguments(fn) {
  const left = fn.toString().split(')')[0]

  return left.substr(left.indexOf('(') + 1).split(',')
}
