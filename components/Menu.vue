<template>
  <div class="componente-menu">
    <a href="/" class="logo-link">
      <img src="~assets/img/logo.png" class="logo d-none d-md-block" alt="">
      <div class="logo-mobile d-md-none">
        <img src="~assets/img/logo-mobile.svg" alt="">
      </div>
    </a>
    <span class="menu-mobile d-inline-block d-md-none" v-if="!showMenu">
      <img src="~assets/img/menu-mobile.svg" alt="" @click="abrirMenu">
    </span>

    <span class="close-mobile d-inline-block d-md-none" v-else>
      <img src="~assets/img/close.svg" alt="" @click="abrirMenu">
    </span>

    <b-nav vertical :class="{
        'd-md-block align-left' : showMenu == false,
        'show d-md-block align-left' : showMenu == true
      }"
    >
      <b-nav-item
        :active="$route.path === '/'"
        :class="{ active: $route.path === '/' }"
      >
        <nuxt-link to="/">
          <img src="~assets/img/view_quilt_24px.svg" alt="" class="icon-dash">
          <span>{{ $t('menu.dashboard') }}</span>
        </nuxt-link>
      </b-nav-item>

      <b-nav-item>
        <img src="~assets/img/notifications_24px.svg" alt="">
        <span>{{ $t('menu.notifications') }}</span>
      </b-nav-item>

      <b-nav-item
        :active="$route.path === '/campaigns'"
        :class="{ active: $route.path === '/campaigns' }"
      >
        <nuxt-link to="/campaigns">
          <img src="~assets/img/language_24px.svg" alt="">
          <span>{{ $t('menu.campaigns') }}</span>
        </nuxt-link>
      </b-nav-item>

      <b-nav-item
        :active="$route.path === '/profile'"
        :class="{ active: $route.path === '/profile' }"
      >
        <nuxt-link to="/profile">
          <img src="~assets/img/account_circle_24px.svg" alt="">
          <span>{{ $t('menu.profile') }}</span>
        </nuxt-link>
      </b-nav-item>

      <b-nav-item>
        <img src="~assets/img/monetization_on_24px.svg" alt="">
        <span>{{ $t('menu.financial') }}</span>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    abrirMenu() {
      this.showMenu = !this.showMenu;
    }
  }
}
</script>

<style>
  /* componente menu */
  .componente-menu {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #f0f4f8;
    min-width: 140px;
    height: 100%;
    border-radius:  30px 0px 0px 30px;
    transition: ease .2s all;
    z-index: 10;
  }

  .componente-menu:hover {
    box-shadow: 2px 0px 12px rgba(0, 0, 0, 0.18);
  }

  .componente-menu .logo-link {
    position: relative;
    text-decoration: none;
    display: block;
    /* margin-left: 20px; */
    padding: 32px 0;
    height: 91px;
  }

  .componente-menu .logo-mobile {
    width: 32px;
    height: 32px;
    background: linear-gradient(180deg, #D95097 0%, #22275D 100%), linear-gradient(0deg, #D94E96, #D94E96), #ED1690;
    border-radius: 16px;
    padding-top: 8px;
  }

  .componente-menu .logo-mobile img {
    margin: auto;
    display: block;
    width: 14px;
    height: 15px;
  }

  .componente-menu .logo-link::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(223, 224, 231, 0.3);
  }

  .componente-menu .logo-link .logo {
    width: 100px;
    display: block;
    margin: auto;
  }

  .componente-menu .nav {
    margin-top: 40px;
    width: 100%;
  }

  .componente-menu .nav-item {
    position: relative;
    transition: ease .2s;
    width: 95px;
  }

  .componente-menu .nav:hover .nav-item {
    width: auto;
    margin-right: 20px;
  }

  .componente-menu .nav-link {
    position: relative;
    display: block;
    margin: 10px 0 10px 45px;
    width: 50px;
    height: 50px;
    padding: 13px 0 13px 15px;
    /* text-align: center;*/
    transition: ease .2s;
    font-weight: bold;
    font-size: 14px;
    /* color: #22285A; */
    color: #6C6B82;
    text-transform: uppercase;
    z-index: 2;
    overflow: hidden;
  }

  .componente-menu .nav-link img {
    float: left;
    display: block;
    margin-bottom: 20px;
  }

  .componente-menu .nav-link span {
    padding-top: 30px;
    padding-left: 10px;
    display: inline-block;
    opacity: 0;
    transition: ease .4s;
  }

  .componente-menu .nav:hover .nav-link span {
    opacity: 1;
    padding-top: 0;
    vertical-align: middle;
  }
  
  .icon-dash {
    margin-top: 3px;
  }

  .componente-menu .nav:hover .nav-link {
    width: auto;
    padding: 13px 15px 0 15px;
  }

  .componente-menu .nav-link.active {
    background: #FEFEFF;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  .componente-menu .nav-link.active span {
    color: #22285A;
  }

   .componente-menu .nav-link:hover span {
    color: #22285A;
  }

  .componente-menu .nav-item:hover .nav-link.active {
    background: #FEFEFF;
    box-shadow: none;
    border-radius: 8px;
  }

  .componente-menu .nav-item.active::before,
  .componente-menu .nav-item:hover::before {
    position: absolute;
    content: '';
    background: #FEFEFF;
    height: 50px;
    width: 0;
    display: block;
    left: 0;
    top: 0;
    z-index: 1;
    /* box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05); */
    border-radius: 0 8px 8px 0;
    transition: ease .2s;
  }

  .componente-menu .nav .nav-item:hover::before {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }

  .componente-menu .nav:hover .nav-item::before {
    width: 100%;
  }

  /* LG */
  @media only screen and (max-width: 1199px)
  {
    .componente-menu {
      min-width: 115px;
    }

    .componente-menu .logo-link .logo {
      width: 75px;
      margin-top: 3px;
    }

    .componente-menu .logo-link {
      margin-left: 0;
    }

    .componente-menu .nav-link {
      margin: 10px 0 10px 33px;
    }
  }

  /* MD */
  @media only screen and (max-width: 991px)
  {
    .componente-menu {
      min-width: 86.31px;
    }

    .componente-menu .logo-link .logo {
      width: 60px;
      margin-top: 6px;
    }

    .componente-menu .nav-link {
      margin: 10px 0 10px 22px;
    }
  }

  /* SM */
  @media only screen and (max-width: 767px)
  {
    .componente-menu {
      min-width: 124px;
      border-radius: 30px 0 30px 0;
      height: auto;
      min-height: 72px;
      transition: ease .4s;
    }

    .componente-menu .logo-link::before {
      display: none;
    }

    .componente-menu .logo-link {
      padding-top: 23px;
      padding-bottom: 0;
      height: 60px;
      margin-left: 15px;
      display: inline-block;
    }

    .componente-menu .menu-mobile {
      padding-top: 28px;
      padding-bottom: 0;
      height: 60px;
      margin-left: 15px;
      display: inline-block;
      vertical-align: top;
    }

    .componente-menu .close-mobile {
      position: absolute;
      top: 28px;
      right: 22px;
    }

    .componente-menu .nav {
      padding-bottom: 12px;
      position: absolute;
      width: 0px;
      overflow: hidden;
    }

    .componente-menu .nav.show {
      padding-bottom: 12px;
      position: relative;
      width: auto;
      overflow: auto;
      animation-name: example;
      animation-duration: .2s;
    }

    @keyframes example {
      from {width: 0px;}
      to {width: 200px;}
    }


    .componente-menu .nav .nav-item {
      width: auto;
      margin-right: 20px;
    }

    .componente-menu .nav .nav-link span {
      opacity: 1;
      padding-top: 4px;
    }

    .componente-menu .nav .nav-link {
      width: auto;
      padding: 13px 15px 0 15px;
    }

    .componente-menu .nav-item .nav-link.active {
      background: #FEFEFF;
      box-shadow: none;
      border-radius: 8px;
    }

    .componente-menu .nav .nav-item::before {
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      width: 100%;
      top: 10px;
    }

    .componente-menu .nav-item::before {
      top: 11px;
    }

    .componente-menu .nav:hover .nav-link span {
      padding-top: 2px;
    }
  }
</style>
