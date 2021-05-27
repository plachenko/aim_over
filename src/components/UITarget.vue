<template>
  <div class="targetcont" @mousedown="onHit">
    <!--
    <div :style="styleObjInner" @click="onHit(2)" ref="target" id="inner" class="circ"></div>
    <div :style="styleObj" @click="onHit(1)" ref="target" class="circ"></div>
    -->
    <div class="circ target" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Position from '../classes/Position';
import gsap from 'gsap';

export default defineComponent({
  name: 'UITarget',
  props: {
    id: {
      type: Number,
      default: 0
    },
    pos: {
      type: Object,
      default: new Position(Math.random()*100, Math.random()*100) 
    }
  },
  computed: {
    styleObj(): string{
      let pos = this.pos || {x: 0, y: 0, hit: false};
      return `top: ${pos.x}px; left: ${pos.y}px;`;
    },
    styleObjInner(): string{
      let pos = this.pos || {x: 0, y: 0, hit: false};
      let size = 10;

      let offset = {
        x: pos.x + size,
        y: pos.y + size
      }

      return `top: ${offset.x}px; left: ${offset.y}px;`;
    }
  },
  data: function(){
    return {
      amtHit: 0,
      width: 100,
      height: 100
    }
  },
  methods:{
    onHit(amt = 1){
      // this.amtHit += amt;
      // console.log('test')
      // this.$emit('on-hit', this);
    },
    animate(){
      const el: HTMLElement = this.$refs.target as HTMLElement;
      const speed = 4;
      let left: number = parseInt(el.style.left);
      let leftAmt = 0;
      let opacityAmt = 0;

      if(this.pos){

        let xPos = this.pos.x || 0;

        setInterval(()=>{
          if(left <= (xPos-left) + 10 || left >= xPos + 20){
            opacityAmt -= .05;
            leftAmt = ( left += speed );
          }else{
            opacityAmt += .04;
            leftAmt = ( left += speed/40 );
          }

          el.style.opacity = opacityAmt+"";
          el.style.left = ( leftAmt )+"px";
        }, 10);
      }
    }
  },
  mounted(){
    const pEl = this.$el;
    const el = pEl.children[0];

    const x = Math.random() * 100
    const y = Math.random() * 100

    let w = el.offsetWidth;
    let h = el.offsetHeight;

    pEl.style.left = `${(w/2) + x}px`;
    pEl.style.top = `${(h/2) + y}px`;
    // console.log(this.$vnode.key)
    // console.log(this.id)
    const delay = this.id

    gsap.to(el, {
      backgroundColor: "rgb(255,0 0)", 
      left: (w/2), 
      top: (h/2), 
      width: 10, 
      height: 10,
      delay: delay / 3,
      // opacity: 1,
      opacity: .4,
      duration:1,
      onComplete: () => {
        gsap.to(el, {opacity: 0, delay: 1});
      }
    });
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.targetcont{
  position: absolute;
  /* opacity: 0; */
}
.circ{
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 100px;
  z-index: 9998;
  background-color:rgb(0, 0, 255);
  top: 0px;
  left: 0px;
  z-index: 9999;
  /* opacity: 1; */
}
#inner{
  background-color:#FF0;
  height: 10px;
  width: 10px;
  z-index: 9999;
}
</style>
