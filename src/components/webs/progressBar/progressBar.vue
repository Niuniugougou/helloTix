<template>
  <d2-container>
    <div>
      <circleT :percentage="percenttage" color="#67C23A"></circleT>
    </div>
    <div>
      <moon :percentage="percenttage" color="#e2460a"></moon>
    </div>
    <el-button @click="add">+</el-button>
    <el-button @click="reduce">-</el-button>
  </d2-container>
</template>

<script>
import circleT from "./component/circle"
import moon from "./component/moon"
export default {
  name: 'progressBar',
  components: {
    circleT,
    moon
  },
  data() {
    return {
      show: false,
      percenttage: 50,
    }
  },
  methods: {
    add() {
      this.percenttage >= 100 ? this.percenttage = 100 : this.percenttage += 10;
    },
    reduce() {
      this.percenttage <= 0 ? this.percenttage = 0 : this.percenttage -= 10;
    }
  }
}
</script>

