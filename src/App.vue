<template>
  <div id="app">
    <pozadina />
    <div class="main-wrapper">
      <div class="content-wrapper">
          <div class="header">
            <Header/>
          </div>
          <div class="footer">
            <Footer/>
          </div>
      </div>
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
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }

  .nav-bar {
    width: 810px;
    margin: 0;
    padding: 0;
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
    width: 1110px;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 1600px;
    border-radius: 5px;
    margin: 0;
    padding: 0;
    border-radius: 15px;
  }
  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 0 auto;
  }

  .footer {
    display: flex;
    flex-shrink: 0;
  }
</style>
