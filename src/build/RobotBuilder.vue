<template>
  <div class="content">
    <div class="preview">
      <CollapsibleSection :open="true">
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src" alt="head"/>
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left" alt="left arm"/>
            <img :src="selectedRobot.torso.src" alt="torso"/>
            <img :src="selectedRobot.rightArm.src" class="rotate-right" alt="right arm"/>
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.src" alt="base"/>
          </div>
        </div>
      </CollapsibleSection>
      <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    </div>
    <!--    <h1 class="robot-name">-->
    <!--      {{selectedRobot.head.title}}-->
    <!--      <span class="sale" v-if="selectedRobot.head.onSale">Sale!</span>-->
    <!--    </h1>-->
    <div class="top-row">
      <PartSelector :parts="availableParts.heads" @part-selected="part => selectedRobot.head = part" position="top"/>
    </div>
    <div class="middle-row">
      <PartSelector :parts="availableParts.arms" @part-selected="part => selectedRobot.leftArm = part" position="left"/>
      <PartSelector :parts="availableParts.torsos" @part-selected="part => selectedRobot.torso = part" position="center"/>
      <PartSelector :parts="availableParts.arms" @part-selected="part => selectedRobot.rightArm = part" position="right"/>
    </div>
    <div class="bottom-row">
      <PartSelector :parts="availableParts.bases" @part-selected="part => selectedRobot.base = part" position="bottom"/>
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
          <td>{{ robot.head.title }}</td>
          <td class="cost">{{ robot.cost }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';
import availableParts from '../data/parts';

export default {
  name: 'RobotBuilder',
  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      const response = window.confirm('You have not added your robot to your cart, are your sure you want to leave');
      next(response);
    }
  },
  components: {
    PartSelector,
    CollapsibleSection,
  },
  data() {
    return {
      addedToCart: false,
      availableParts,
      cart: [],
      selectedRobot: {
        head: {},
        leftArm: {},
        rightArm: {},
        torso: {},
        base: {},
      },
    };
  },
  methods: {
    addToCart() {
      const robot = this.selectedRobot;
      const cost = Object.keys(robot)
        .map((key) => robot[key].cost)
        .reduce((acc, current) => acc + current);

      this.cart.push({
        ...robot, cost,
      });

      this.addedToCart = true;
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
  width: 100%;
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

.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}

.preview-content {
  border: 1px solid #999;
}

.preview img {
  width: 50px;
  height: 50px;
}

.rotate-right {
  transform: rotate(90deg);
}

.rotate-left {
  transform: rotate(-90deg);
}
</style>
