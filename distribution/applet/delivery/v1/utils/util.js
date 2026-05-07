const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const copyObjectProperties = (strObj, props) => {
  // var strObj = strObj;
  var _strObj =strObj;
  return props.reduce((obj, key) => {
    if (_strObj.hasOwnProperty(key)) {
      obj[key] = _strObj[key];
    }
    return obj;
  }, {});
}

const factorial = (arr, pid, fieldArr, index, valueIndex, listData=[]) => {
  var newArr = arr.filter(e=>e[fieldArr[0]] === pid);
  if (newArr.length > 0) {
    // console.log(newArr);
    listData[index] = newArr;
    return factorial(arr, listData[index][valueIndex[index]][fieldArr[1]], fieldArr, index+1, valueIndex, listData);
  } else {
    return listData;
  }
}

module.exports = {
  formatTime,
  copyObjectProperties,
  factorial
}


