var Depender = function() {
    this.modules = {};
}

Depender.prototype.define = function(name, func) {
    this.modules[name] = func;
    return this.modules[name];
}

Depender.prototype.argument = function(func) {
    var left = func.toString().split(')')[0],
        params = left.substr(left.indexOf('(') + 1),
        arguments = params.split(',');
    return arguments;
}

Depender.prototype.trim = function(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

Depender.prototype.fetch = function(arguments) {
    var self = this,
        funcs = [];
    arguments.forEach(function(argument) {
        var name = self.trim(argument);
        if (self.modules[name]) {
            funcs.push(self.modules[name])
        } else {
            funcs.push(undefined);
        }
    });
    return funcs;
}

Depender.prototype.get = function(name) {
    if (this.modules[name]) {
        return this.modules[name];
    } else {
        return null;
    }
}

Depender.prototype.use = function(use) {
    if (typeof(use) === 'string') {
        return this.get(use);
    } else {
        if (typeof(use) === 'function') {
            return use.apply(use, this.fetch(this.argument(use)));
        } else {
            return false;
        }
    }
}

Depender.prototype.destory = function(name) {
    if (name && this.modules[name]) {
        delete this.modules[name];
        return true;
    } else {
        return false;
    }
}

exports = module.exports = Depender;