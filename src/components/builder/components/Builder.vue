<template>
  <div class="container">
    <canvas ref="grid" />
    <canvas ref="gridMarker" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export interface PointerObj{
  x: number,
  y: number,
}

export default defineComponent({
  name: 'Grid',
  props: {
    msg: String,
    pntDn: Boolean,
    pntMv: Object,
  },
  watch: {
    pntMv: {
      deep: true,
      handler(e){
        if(this.pntDn){
          this.pd1 = e;
        }else{
          this.pd2 = e;
        }
        this.renderMarker(e);
      }
    },
    pntDn(e){
      const pObj: PointerObj = this.pntMv as PointerObj;
      const pArr: PointerObj[] = this.ptArr;

      pArr.push(pObj);
      // console.log(pArr)
    }
  },
  data: function(){
    return{
      idx: 0,
      xAmt: 10,
      yAmt: 10,
      pd1: {x: 0, y: 0},
      pd2: {x: 0, y: 0},
      ptArr: []
    }
  },
  methods: {
    renderMarker(e: any){
      const h = window.innerHeight;
      const w = window.innerWidth;
      const can = this.$refs.gridMarker as HTMLCanvasElement;
      can.width = w;
      can.height = h;

      const x = e.offsetX;
      const y = e.offsetY;

      const ctx = can.getContext('2d') as CanvasRenderingContext2D;
      ctx.fillStyle = "#F00";
      ctx.fillRect(x, 0, 1, h);
      ctx.fillRect(0, y, w, 1);

      if(this.pd1){
        ctx.fillRect(this.pd1.x, 0, 1, h);
        ctx.fillRect(0, this.pd1.y, w, 1);
      }
      if(this.pd2){
        ctx.fillRect(this.pd2.x, 0, 1, h);
        ctx.fillRect(0, this.pd2.y, w, 1);
      }

    },
    renderGrid(){
      const h = window.innerHeight;
      const w = window.innerWidth;
      const can = this.$refs.grid as HTMLCanvasElement;
      can.width = w;
      can.height = h;

      const ctx = can.getContext('2d') as CanvasRenderingContext2D;
      ctx.fillStyle = "#CCC";

      for(let x = 0; x <= w; x += this.xAmt){
        for(let y = 0; y <= h; y += this.yAmt){
          ctx.fillRect(x, 0, 1, h);
          ctx.fillRect(0, y, w, 1);
        }
      }
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.renderGrid();
    })
    window.addEventListener('resize', this.renderGrid);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container{
  width: 100%;
  position: absolute;
}
.container span{
  display:inline-block;
  padding: 4px;
  margin: 0px 4px;
}
.set {
  float: left;
  margin: 4px;
  background-color: #FFF;
}
</style>
