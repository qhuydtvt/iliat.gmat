import _ from 'lodash';

export function checkFields(obj, paths) {
  if (typeof(paths) === 'string') {
    return _.get(obj, paths) && true;
  }
  else {
    return paths.reduce((currentCheck, path) => {
      return _.get(obj, path) && currentCheck;
    }, true);
  }
}