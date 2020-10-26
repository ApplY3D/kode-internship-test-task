const getObjectProperty = (obj, path, defaultValue) => {
  const pathArr = path.split(".");
  let tempObj = { ...obj };

  for (let i = 0; i < pathArr.length; i++) {
    let pathItem = pathArr[i];

    try {
      if (typeof tempObj[pathItem] === undefined) {
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }

    if (i === pathArr.length - 1) {
      return tempObj[pathItem];
    } else {
      tempObj = tempObj[pathItem];
    }
  }
};
