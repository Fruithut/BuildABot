<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    <h1 class="robot-name">
      {{selectedRobot.head.title}}
      <span class="sale" v-if="selectedRobot.head.onSale">Sale!</span>
    </h1>
    <div class="top-row">
      <div :class="[{'sale-border': selectedRobot.head.onSale}, 'top', 'part']">
        <img :src="selectedRobot.head.src" title="head" alt="head"/>
        <button class="prev-selector" @click="previous('headIndex', this.headIndex, availableParts.heads.length)">&#9668;</button>
        <button class="next-selector" @click="next('headIndex', this.headIndex, availableParts.heads.length)">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftArm.src" title="left arm" alt="left arm"/>
        <button class="prev-selector" @click="previous('leftArmIndex', this.leftArmIndex, availableParts.arms.length)">&#9650;</button>
        <button class="next-selector" @click="next('leftArmIndex', this.leftArmIndex, availableParts.arms.length)">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" title="torso" alt="torso"/>
        <button class="prev-selector" @click="previous('torsoIndex', this.torsoIndex, availableParts.torsos.length)">&#9668;</button>
        <button class="next-selector" @click="next('torsoIndex', this.torsoIndex, availableParts.torsos.length)">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightArm.src" title="right arm" alt="right arm"/>
        <button class="prev-selector" @click="previous('rightArmIndex', this.rightArmIndex, availableParts.arms.length)">&#9650;</button>
        <button class="next-selector" @click="next('rightArmIndex', this.rightArmIndex, availableParts.arms.length)">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.src" title="base" alt="base"/>
        <button class="prev-selector" @click="previous('baseIndex', this.baseIndex, availableParts.bases.length)">&#9668;</button>
        <button class="next-selector" @click="next('baseIndex', this.baseIndex, availableParts.bases.length)">&#9658;</button>
      </div>
    </div>
    <div v-show="cart.length > 0">
      <h1 class="cart">Cart</h1>
      <table>
        <thead>
        <tr>
          <th>Robot</th>
          <th class="cost">Cost</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in cart" :key="index">
            <td>{{robot.head.title}}</td>
            <td class="cost">{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import availableParts from '../data/parts';

export default {
  name: 'RobotBuilder',
  data() {
    return {
      availableParts,
      cart: [],
      headIndex: 0,
      leftArmIndex: 0,
      rightArmIndex: 0,
      torsoIndex: 0,
      baseIndex: 0,
    };
  },
  methods: {
    next(indexName, index, arrayLength) {
      this[indexName] = (index + 1) % arrayLength;
    },
    previous(indexName, index, arrayLength) {
      this[indexName] = index === 0 ? arrayLength - 1 : index - 1;
    },
    addToCart() {
      const robot = this.selectedRobot;
      const cost = Object.keys(robot)
        .map((key) => robot[key].cost)
        .reduce((acc, current) => acc + current);

      this.cart.push({ ...robot, cost });
    },
  },
  computed: {
    selectedRobot() {
      return {
        head: availableParts.heads[this.headIndex],
        leftArm: availableParts.arms[this.leftArmIndex],
        rightArm: availableParts.arms[this.rightArmIndex],
        torso: availableParts.torsos[this.torsoIndex],
        base: availableParts.bases[this.baseIndex],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
}

.part {
  img {
    width: 165px;
  }
}

.top-row {
  display: flex;
  justify-content: space-around;
}

.middle-row {
  display: flex;
  justify-content: center;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}

.top {
  border-bottom: none;
}

.left {
  border-right: none;
}

.right {
  border-left: none;
}

.left img {
  transform: rotate(-90deg);
}

.right img {
  transform: rotate(90deg);
}

.bottom {
  border-top: none;
}

.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}

.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}

.center .prev-selector, .center .next-selector {
  opacity: 0.8;
}

.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}

.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}

.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}

.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}

.right .next-selector {
  right: -3px;
}

.robot-name {
  text-align: center;
  width: 100%;
  margin-top: 0;
}

.sale {
  background: darkorange;
  padding: 5px;
}

.content {
  position: relative;
}

.add-to-cart {
  position: absolute;
  right: 30px;
  width: 220px;
  padding: 3px;
  font-size: 16px;
}

td, th {
  text-align: left;
  padding: 5px 20px 5px 5px;
}

.cart, .cost {
  text-align: left;
}

table * {
  padding-left: 0;
}

.sale-border {
  border-left: 3px solid red;
  border-top: 3px solid red;
  border-right: 3px solid red;
}
</style>
