<!-- @format -->

<template>
  <div>
    <header>
      <h1 class="game_name">挑战2048</h1>
      <p class="score">得分：<span>{{score}}</span> 分</p>
    </header>
    <main>
      <div class="box">
        <div class="row"
             v-for="(row, index) in dataList"
             :key="index">
          <div :class="['col', 'n-' + col]"
               v-for="(col, index2) in row"
               :key="index2">{{col ? col : ' '}}</div>
        </div>
      </div>
      <a class="restart"
         @click="reset">重新开始</a>
      <p class="score"
         v-if="highestScore">历史最高分：<span>{{highestScore}}</span> 分</p>
    </main>
    <footer class="tip">
      <p class="pc">电脑：请用键盘方向键操作游戏</p>
      <p class="phone">手机：请滑动手机屏幕操作游戏</p>
    </footer>
  </div>
</template>

<script>
import {
  initData,
  move,
  calScore
} from '@/utils/move';
export default {
  name: 'index',
  mounted () {
    this.bindEvent();
  },
  methods: {
    /**
     * @desc 重新开始游戏初始化游戏数据
     */
    reset() {
      this.dataList = initData();
    },
    /**
     * @desc 绑定事件
     */
    bindEvent(){
      document.addEventListener('keyup', this.pcMove);
      document.querySelector('.box').addEventListener('touchstart', this.touchStart);
      document.querySelector('.box').addEventListener('touchend', this.touchEnd);
      //document上获取touchmove事件 如果是由.box触发的 则禁止屏幕滚动
      document.addEventListener('touchmove', e=>{
          e.target.classList.contains('box') && e.preventDefault();
      });
      this.reset();
    },
    /* pc端移动函数 */
    pcMove(e) {
      //左上右下 分别转置0 3 2 1 次
      console.log(e.keyCode);
      const keyMap = {
        37: 0,
        38: 1,
        39: 2,
        40: 3
      };
      if (!(e.keyCode in keyMap)) return;
      this.toggleArray(move(keyMap[e.keyCode],this.dataList));
    },

    /* 手机端移动函数 */
    touchStart(e) {
      this.start['x'] = e.changedTouches[0].pageX;
      this.start['y'] = e.changedTouches[0].pageY;
    },
    touchEnd(e) {
      let curPoint = e.changedTouches[0],
        x = curPoint.pageX - this.start.x,
        y = curPoint.pageY - this.start.y,
        xx = Math.abs(x),
        yy = Math.abs(y),
        i = 0;
      //移动范围太小 不处理
      if (xx < 50 && yy < 50) return;
      if (xx >= yy) { //横向滑动
        i = x < 0 ? 0 : 2;
      } else { //纵向滑动
        i = y < 0 ? 3 : 1;
      }
      this.toggleArray(move(i,this.dataList));
    },
    /* 更新数组 */
    toggleArray(data){
      data.forEach((arr, i) => {
        this.$set(this.dataList,i,arr);
      });
      //计算得分
      this.score = calScore(this.dataList);
      //存储进度
      localStorage.setItem('score', this.score);
    }
  },
  data() {
    return {
      score: 0, //总得分
      highestScore: localStorage.getItem('score'), //历史最高分
      dataList: [],//存放数据的二维数组
      start: {} //起始位置
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*头部样式*/
header {
  display: block;
  margin: 0 auto;
  text-align: center;
}

header h1 {
  font-size: 1.5em;
}

.score {
  font-size: 16px;
}

.score span {
  color: #f8563d;
  font-size: 24px;
}

.restart {
  display: block;
  width: 100px;
  padding: 10px;
  background: #7da962;
  color: #fff;
  border-radius: 10px;
  text-decoration: none;
  margin: 10px auto;
}

.box {
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #bfc0bb;
  display: inline-block;
}

.row {
  padding: 8px 8px 0 0;
}

.row:last-of-type {
  padding-bottom: 8px;
}

.col {
  display: inline-block;
  margin-left: 8px;
  width: 70px;
  height: 70px;
  line-height: 70px;
  border-radius: 10px;
  transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -webkit-transition: all 0.2s ease-out;
  overflow: hidden;
}

.tip {
  height: 50px;
  line-height: 1.8;
  font-size: 12px;
  color: #656565;
}

.pc {
  border-top: 1px dotted #bfc0bb;
}
.phone {
  border-bottom: 1px dotted #bfc0bb;
}

/* 格子背景色 */
.n-0 {
  background-color: #d3d3d3;
  color: #6e6f71;
}
.n-2 {
  background-color: #fef4f2;
  color: #6e6f71;
}
.n-4 {
  background-color: #fed9a2;
  color: #6e6f71;
}
.n-8 {
  background-color: #fc8c5e;
  color: #6e6f71;
}
.n-16 {
  background-color: #f8692f;
  color: #fff;
}
.n-32 {
  background-color: #f8563d;
  color: #fff;
}
.n-64 {
  background-color: #ff3936;
  color: #fff;
}
.n-128 {
  background-color: #00c3dd;
  color: #fff;
}
.n-256 {
  background-color: #00a4be;
  color: #fff;
}
.n-512 {
  background-color: #00abcb;
  color: #fff;
}
.n-1024 {
  background-color: #00abcb;
  color: #fff;
}
.n-2048 {
  background-color: #00abcb;
  color: #fff;
}
.n-4096 {
  background-color: #005d6e;
  color: #fff;
}
</style>
