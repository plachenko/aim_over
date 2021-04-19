<template>
  <div class="container" @resize="setSizes">
    <!-- {{pntMv}} -->
    <Grid :pntDn="pntDn" :pntMv="pntMv" />
    <div class="set">
      <span>Width: {{winWidth}}</span>
      <span>Height: {{winHeight}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Grid from './components/Builder.vue';

export default defineComponent({
  name: 'Builder',
  components:{
    Grid
  },
  props: {
    msg: String,
  },
  data: function(){
    return{
      winHeight: 0,
      winWidth: 0,
      pntDn: false,
      pntMv: {x: 0, y:0}
    }
  },
  methods: {
    setSizes(){
      console.log('test')
      this.winHeight = window.innerHeight
      this.winWidth = window.innerWidth
    }
  },
  mounted(){
    window.addEventListener('resize', this.setSizes);
    this.setSizes()

    document.addEventListener('pointerup', (e)=>{
      this.pntDn = false;
    });

    document.addEventListener('pointerdown', (e)=>{
      this.pntDn = true;
    });

    document.addEventListener('pointermove', (e)=>{
      this.pntMv.x = e.offsetX;
      this.pntMv.y = e.offsetY;
    });
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
  /* background-color:#F00; */
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
