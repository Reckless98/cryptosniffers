<template>
  <div id="app">
    <pozadina />
      <div class="main-wrapper">
        <div class="nav-bar">
          <Header/>
        </div>
        <Footer/>
      </div>      
  </div>
</template>

<script>
import pozadina from './assets/pozadina.jpg'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {  
  name: 'app',
  components: {
    Footer,
    Header,
    pozadina,
  },   
  
    Headerdata() {
    return {
      item1: []
    }
  },  
  methods: {
    //rentThisBook: function (item) {
      //this.$emit('rentedBooks', item)
   // },
    renderItem(item) {
      this.item1.push({...item})
    }
  }
}
</script>

<style>

  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    background-image: url('./assets/pozadina.jpg');
    margin: 15px 0px 15px 0px;
    padding: 5px;
  } 

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    text-shadow: rgba(0,0,0,.01) 0 0 1px;
    text-align: center;
    color: #2c3e50;
  }

  .collection {
    float: left;
    width: 10em;
    margin: 60px auto;
  }

  .collection{
    background-color: rgb(16,122,248);
  }

  #bb {
    background-color: rgba(73, 71, 71, 0.5);
    margin-right: 300px;
    margin-left: 300px;
    /* z-index: -1; */
    padding-right: 40px;
    padding-bottom: 30px;
    padding-top: 50px;
    height: auto;
    margin-bottom: 50px;
  }

  .main-wrapper {
    color: gray;
    background-color: gray;
    opacity: 0.5;
    width: 80%;
    display: inline-block;
    text-align: center;
    height: 1600px;
    border-radius: 5px;
    margin: 0;
    padding: 0;
  }
   
</style>
