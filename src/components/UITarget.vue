<template>
  <div class="targetcont" @mousedown="onHit">
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
      type: Object
    },
    time: {
      type: Number,
      default: 0
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
      const pEl = this.$el;
      const el = pEl.children[0];

      let w = el.offsetWidth;
      let h = el.offsetHeight;

      gsap.to(el, {
        backgroundColor: "rgb(255,0 0)", 
        opacity: 0,
        width: 120, 
        height: 120,
        left: (w/2)-60, 
        top: (h/2)-60,
        duration: .1
      });

      this.$emit('onHit')
    }
  },
  mounted(){
    const pEl = this.$el;
    const el = pEl.children[0];

    // const x = Math.random() * 100
    // const y = Math.random() * 100
    const x = this.pos?.x;
    const y = this.pos?.y;

    let w = el.offsetWidth;
    let h = el.offsetHeight;

    pEl.style.left = `${x-(w/2)}px`;
    pEl.style.top = `${y -(h/2)}px`;
    // pEl.style.left = `${(w/2) + x}px`;
    // pEl.style.top = `${(h/2) + y}px`;
    // console.log(this.$vnode.key)
    // console.log(this.id)
    const delay = this.id
    gsap.from(el, {
      opacity: 0, 
      width: 10, 
      height: 10,
      left: (w/2)-5, 
      top: (h/2)-5, 
      duration:.2
    });

    gsap.to(el, {
      backgroundColor: "rgb(255,0 0)", 
      left: (w/2)-5, 
      top: (h/2)-5, 
      width: 10, 
      height: 10,
      delay: 1,
      // opacity: 1,
      opacity: 0,
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
  z-index: 9998;
  /* opacity: 1; */
}
#inner{
  background-color:#FF0;
  height: 10px;
  width: 10px;
  z-index: 9998;
}
</style>
