// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    // 0
    const value = object[key];
    if (!value) {
      delete result[key];
    }
  });
  return result;
};
