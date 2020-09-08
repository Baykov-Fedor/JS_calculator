export const countArr = (arr) => {
  let res = 0;
  let copyArr = [...arr];
  let negIndex = copyArr.indexOf("-");

  //Заменяем идущие рядом "оператор" и "минус" на "оператор" и "число со знаком минусом"
  if (negIndex !== -1) {
    if (typeof copyArr[negIndex - 1] === "string") {
      copyArr.splice(negIndex, 2, -copyArr[negIndex + 1]);
    }
  }

  if (copyArr.length === 1) {
    return copyArr[0];
  } else if (copyArr.indexOf("*") !== -1) {
    const index = copyArr.indexOf("*");
    res = copyArr[index - 1] * copyArr[index + 1];
    copyArr.splice(index - 1, 3, res);
    return countArr(copyArr);
  } else if (copyArr.indexOf("/") !== -1) {
    const index = copyArr.indexOf("/");
    res = copyArr[index - 1] / copyArr[index + 1];
    copyArr.splice(index - 1, 3, res);
    return countArr(copyArr);
  } else if (
    (copyArr.indexOf("+") !== -1 &&
      copyArr.indexOf("-") !== -1 &&
      copyArr.indexOf("+") < copyArr.indexOf("-")) ||
    (copyArr.indexOf("+") !== -1 && copyArr.indexOf("-") === -1)
  ) {
    const index = copyArr.indexOf("+");
    res = copyArr[index - 1] + copyArr[index + 1];
    copyArr.splice(index - 1, 3, res);
    return countArr(copyArr);
  } else if (copyArr.indexOf("-") !== -1) {
    const index = copyArr.indexOf("-");
    res = copyArr[index - 1] - copyArr[index + 1];
    copyArr.splice(index - 1, 3, res);
    return countArr(copyArr);
  }
};
