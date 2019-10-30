var eq, deepEq;
eq = function(a, b, aStack, bStack) {
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  if (a == null || b == null) return false;
  if (a !== a) return b !== b;
  var type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
  return deepEq(a, b, aStack, bStack);
};

deepEq = function(a, b, aStack, bStack) {
  if (a instanceof _) a = a._wrapped;
  if (b instanceof _) b = b._wrapped;
  var className = toString.call(a);
  if (className !== toString.call(b)) return false;
  switch (className) {
  case '[object RegExp]':
  case '[object String]':
    return '' + a === '' + b;
  case '[object Number]':
    if ( + a !== +a) return + b !== +b;
    return + a === 0 ? 1 / +a === 1 / b: +a === +b;
  case '[object Date]':
  case '[object Boolean]':
    return + a === +b;
  case '[object Symbol]':
    return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
  }

  var areArrays = className === '[object Array]';
  if (!areArrays) {
    if (typeof a != 'object' || typeof b != 'object') return false;

    var aCtor = a.constructor,
    bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
  }

  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;
  while (length--) {
    if (aStack[length] === a) return bStack[length] === b;
  }

  aStack.push(a);
  bStack.push(b);

  if (areArrays) {
    length = a.length;
    if (length !== b.length) return false;
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    var keys = _.keys(a),
    key;
    length = keys.length;
    if (_.keys(b).length !== length) return false;
    while (length--) {
      key = keys[length];
      if (! (_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
};

_.isEqual = function(a, b) {
  return eq(a, b);
};
