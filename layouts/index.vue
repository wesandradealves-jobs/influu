<template>
  <b-container class="app-wrapper">
    <b-row>
      <b-col cols="12" class="dash shadow-sm bg-white mt-5 pt-0 pr-0 pb-0">
        <Menu />
        <b-row>
          <Nav />
          <nuxt />
        </b-row>
      </b-col>
      <Footer />
    </b-row>
  </b-container>
</template>

<script>
import Nav from '~/components/Nav.vue';
import Menu from "~/components/Menu.vue";
import Footer from '~/components/Footer.vue';

export default {
  components: {
    Nav,
    Menu,
    Footer
  }
}
</script>

<style>
html {
  font-family: 'nunitoregular', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  background: linear-gradient(0deg, #6c327e 0%, #903b85 92.68%);
  background-size: cover;
  background-attachment: fixed;
  max-width: 100%;
  overflow-x: hidden;
}

.app-wrapper {
  padding-left: 30px !important;
}

.dash {
  /* height: calc(100vh - 7.5rem); */
  border-radius: 30px;
  padding-left: 140px;
  min-height: calc(100vh - 7.5rem);
  /* padding-left: 268px; */
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.titulo-componente {
  font-family: "nunitoregular";
  position: relative;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 43px;
  color: #22285a;
}

.titulo-componente::after {
  content: "";
  display: block;
  position: relative;
  width: 20px;
  height: 2px;
  background: #c0b5ec;
  border-radius: 100px;
}

/* LG */
@media only screen and (max-width: 1199px) {
  .dash {
    padding-left: 114px;
  }
  .app-wrapper {
    padding-left: 15px !important;
  }
  .middle-content-wrapper {
    margin-top: -4em;
  }
}

/* MD */
@media only screen and (max-width: 991px) {
  .dash {
    padding-left: 86.31px;
  }
  .app-wrapper {
    padding-left: 15px !important;
  }
  .middle-content-wrapper {
    margin-top: -4em;
  }
}

/* MD */
@media only screen and (max-width: 767px) {
  .middle-content-wrapper {
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 3.5em;
  }
  .dash {
    padding-left: 0;
  }
  .app-wrapper {
    padding-left: 30px !important;
  }
}
</style>
