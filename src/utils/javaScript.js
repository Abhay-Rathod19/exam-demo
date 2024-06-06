export const ternary = (test, isTrue, isFalse) => {
  return test ? isTrue : isFalse;
};

export const objectKeys = (object) => {
  return Object.keys(object);
};

export const objectValues = (object) => {
  return Object.values(object);
};

export const setToLocalStorage = (key, dataValue) => {
  return localStorage.setItem(key, dataValue);
};

export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const rmvFromLclStorage = (key) => {
  return localStorage.removeItem(key);
};

export const areEqual = (value1, value2) => {
  return value1 === value2;
};

export const findRepeated = (arr) => {
  const repeated = {};
  arr?.forEach((ele, index) => {
    if (ele) {
      if (arr?.indexOf(ele) !== arr?.lastIndexOf(ele)) {
        if (!repeated[ele]) {
          repeated[ele] = [index];
        } else {
          repeated[ele]?.push(index);
        }
      }
    }
  });
  const values = objectValues(repeated)?.flat(Infinity);
  return values;
};
