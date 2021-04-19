<template>
  <div id="gridContainer">
    <canvas ref="grid" />
    <canvas ref="gridMarker" />
  </div>
</template>
<script lang="ts">
import EventBus from '@/EventBus';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Grid extends Vue{
  public xAmt = 10;
  public yAmt = 10;

  private pd1 = {x: null, y: null};
  private pd2 = {x: null, y: null};

  private renderMarker(e: any){
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
  }

  private renderGrid(){
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

  mounted(){
    this.$nextTick(() => {
      this.renderGrid();
    });
    EventBus.$on('pMv', this.renderMarker);
    EventBus.$on('pDn', (e)=>{
      this.pd1.x = e.offsetX;
      this.pd1.y = e.offsetY;
      this.pd2.x = null;
      this.pd2.y = null;
    });
    EventBus.$on('pUp', (e)=>{
      this.pd2.x = e.offsetX;
      this.pd2.y = e.offsetY;
    });
    EventBus.$on('resize', this.renderGrid);
  }
}
</script>
<style scoped>
#gridContainer{
  width: 100%;
  height: 100%;
}
canvas{
  position: absolute;
}

</style>