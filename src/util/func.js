
function func() {
  Array.prototype._find = function (callback /* , thisArg*/) {
    if (this == null) {
      throw new TypeError('null or undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('callback is not a function');
    }
    const oldArr = Object(this);
    const len = oldArr.length >>> 0;
    const thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    let k = 0;
    while (k < len) {
      if (k in oldArr) {
        const val = oldArr[k];
        if (callback.call(thisArg, val, k, oldArr)) {
          return val;
        }
      }
      k++;
    }
    return undefined;
  };
  Array.prototype._findIndex = function (predicate) {
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }
    const o = Object(this);
    const len = o.length >>> 0;
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    const thisArg = arguments[1];
    let k = 0;
    while (k < len) {
      const kValue = o[k];
      if (predicate.call(thisArg, kValue, k, o)) {
        return k;
      }
      k++;
    }
    return -1;
  };
  Array.prototype._includes = function (valueToFind, fromIndex) {
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }
    const o = Object(this);
    const len = o.length >>> 0;
    if (len === 0) {
      return false;
    }
    const n = fromIndex | 0;
    let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    function sameValueZero(x, y) {
      return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
    }
    while (k < len) {
      if (sameValueZero(o[k], valueToFind)) {
        return true;
      }
      k++;
    }
    return false;
  };

  Array.prototype._indexOf = function (searchElement, fromIndex) {
    let k;
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }
    const O = Object(this);
    const len = O.length >>> 0;
    if (len === 0) {
      return -1;
    }
    let n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
      n = 0;
    }
    if (n >= len) {
      return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

export default func;