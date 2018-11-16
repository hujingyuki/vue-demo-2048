const NUM = 4; //4*4格子
let doPut = false; //全局控制是否放置棋子

/* 初始化数组数据 */
export function initData() {
  let data = [];
  for (let i = 0; i < NUM; i++) {
    data.push([]);
    for (let j = 0; j < NUM; j++) {
      data[i].push(0);
    }
  }
  let index = 0;
  while (index < 2) {
    putRandomNum(data);
    index++;
  }
  return data;
}

/* 遍历是否存在空的格子 */
function checkEmpty(data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] == 0) {
        return true;
      }
    }
  }
  return false;
}

/* 生成两数之间的随机数 */
export function randomBetween(min, max) {
  return min + Math.round((max - min) * Math.random());
}

/* 在空白位置随机放置一个2或者4 */
function putRandomNum(data) {
  let row = randomBetween(0, NUM - 1);
  let col = randomBetween(0, NUM - 1);
  if (data[row][col] == 0) {
    data[row][col] = randomBetween(1, 2) * 2;
  } else {
    if (checkEmpty(data)) {
      putRandomNum(data);
    }
  }
}

/* 计算分数 */
export function calScore(data) {
  let count = 0; //棋子的数量
  let score = 0; //计分值
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] > 0) {
        score += data[i][j];
        count++;
      }
    }
  }
  //初始值不计分
  if (count <= 2) {
    return 0;
  } else {
    return score;
  }
}

/* 判断游戏是否结束 */
function gameOver(data) {
  // 遍历棋盘是否有空格子
  let isEmpty = checkEmpty(data);
  // 判断棋盘是否摆满棋子
  if (!isEmpty) {
    // 当棋盘摆满棋子时，遍历所有棋子看其与相邻的棋子数值是否相等，一旦有相等的就跳出循环
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        console.log(i, j);
        if ((data[i][j + 1] && data[i][j] == data[i][j + 1]) || (data[i + 1][j] && data[i][j] == data[i + 1][j])) {
          isEmpty = true;
          break;
        }
      }
    }
    // 当遍历所有棋子后与相邻位置棋子数值都不相等，游戏结束
    if (!isEmpty) {
      // 获取当前得分
      alert("潇洒人生，极限挑战。游戏结束！");
      // 点击确定按钮后初始化游戏
      initData();
    }
  }
}

/* 矩阵逆时针旋转算法 */
function rotate(arr, n) {
  n = n % 4;
  if (n === 0) {
    return arr;
  }
  let tmp = Array.from(Array(NUM)).map(() => Array(NUM).fill(undefined));
  for (let i = 0; i < NUM; i++) {
    for (let j = 0; j < NUM; j++) {
      tmp[NUM - 1 - i][j] = arr[j][i];
    }
  }
  if (n > 1) {
    tmp = rotate(tmp, n - 1);
  }
  return tmp;
}

/**
 *  @desc 单元格合并操作 
 *  @param i 0向左 1向下 2向右 3向上 
 */
export function move(i, data) {
  //转置
  let tmpArr = rotate(data, i);
  //合并
  tmpArr = merge(tmpArr);

  //转置回去，把数据还原
  data = rotate(tmpArr, 4 - i);

  //判断游戏是否结束
  gameOver(data);
  //如果移动过就放置一个数
  doPut && putRandomNum(data);
  return data;
}

/* 单行向左合并操作 */
function merge(tmp) {
  doPut = false;
  tmp.forEach((item) => {
    //记录是否合并过
    let hasCombin = Array(item.length).fill(undefined);
    item.forEach((num, j) => {
      while (j && num) {
        if (item[j - 1] === 0) { //当前位置的前一位置为空,交换俩位置
          item[j - 1] = item[j];
          item[j] = 0;
          doPut = true;
          if (hasCombin[j]) {
            hasCombin[j - 1] = true;
            hasCombin[j] = false;
          }
        } else if (item[j - 1] === item[j] && !hasCombin[j] && !hasCombin[j - 1]) {
          //当前位置与前一位置数字相同，合并到前一位置，然后清空当前位置
          item[j] *= 2;
          item[j - 1] = item[j];
          item[j] = 0;
          doPut = true;
          hasCombin[j - 1] = true; //记录合并位置
        } else {
          break;
        }
        j--;
      }
    })
  });
  return tmp;
}

export default {
  initData,
  move,
  calScore
}