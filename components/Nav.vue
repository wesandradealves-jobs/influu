<template>
  <b-col cols="12">
    <b-row>
      <b-col col :md="$route.path === '/campaigns' ? '8' : '7'"
        cols="12" order="2" order-md="1"
      >
        <h4
          v-if="paths.includes($route.path)"
          class="titulo pt-md-4 pb-md-2 pl-3 m-0 mt-2"
        >
          {{ titles[$route.path.replace('/', '')] }}
        </h4>
      </b-col>
      <b-col col :md="$route.path === '/campaigns' ? '4' : '5'"
        cols="12" order="1" order-md="2"
      >
        <div class="dados-user float-right">
          <b-nav pills align="right" class="nav-user pt-md-4 pb-3 pl-md-1 pl-2 pr-3 pt-3">
            <b-nav-item>
              <img src="~assets/img/busca.svg" class="d-block mt-1" alt />
            </b-nav-item>
            <b-nav-item-dropdown 
              right 
              id="dropdown-1" 
              toggle-class="nav-link-custom rounded-pill ml-2"
              text="" 
              :class="'notificacao ' + (notiCount ? 'ativo' : '')"
            >
              <b-dropdown-item disabled class="titulo">
                Notificações
                <em class="count" v-show="notiCount">{{notiCount}}</em>
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>

              <b-dropdown-item
                class="item"
                v-for="noti in notifications"
                :key="noti.id"
              >
                <img
                  class="imagem"
                  src="~assets/img/home/chat2.png" alt
                  v-if="false"
                >
                <p class="texto">
                  <strong>{{ noti.title }}</strong>
                  <br v-if="!noti.content.includes('<br/>')">
                  <span v-html="noti.content" />
                </p>
                <span class="tempo">
                  {{ toDate(noti.createdAt) }}
                </span>
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown
              id="my-nav-dropdown"
              :text="firstName"
              toggle-class="nav-link-custom rounded-pill ml-2"
              right
            >
              <!--<b-dropdown-divider></b-dropdown-divider>-->
              <b-dropdown-item @click="logout()">
                {{ $t('nav.logout') }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-nav>
        </div>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import {
  countMyNotificationsNotRead,
  getName,
  myNotificationsPaginated
} from '~/business/services/dash-service';
import moment from 'moment';

export default {
  data: () => ({
    notiCount: 0,
    firstName: "",
    notifications: [],
    paths: [
      '/profile',
      '/campaigns'
    ],
    titles: {
      profile: 'Meu Perfil',
      campaigns: 'Campanhas'
    }
  }),
  methods: {
    async logout() {
      try {
        await this.$apolloHelpers.onLogout();
        this.$router.push(this.localePath('/login'));
      } catch (e) {}
    },
    toDate(date) {
      return moment(date).format('DD/MM/YYYY - HH:MM');
    }
  },
  async mounted() {
    try {
      this.notiCount = await countMyNotificationsNotRead(this.$apollo);
      this.firstName = await getName(this.$apollo);
      this.notifications = await myNotificationsPaginated(this.$apollo, {
        page: 1,
        pageRows: 10
      });
    } catch (e) {}
  }
};
</script>

<style>
.titulo {
  font-family: "nunitoregular";
  font-weight: 600;
}

.titulo::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(to right, #dfe0e7, transparent);
}

.nav-user {
  position: relative;
}

.nav-user .nav-link {
  display: block;
  padding: 0.5rem 0.5rem;
}

.dropdown-toggle::after {
  border: 0;
  content: "";
  background-image: url("../assets/img/arrow-bottom.svg");
  width: 12px;
  height: 7px;
  vertical-align: middle;
  margin-left: 10px;
  transition: ease 0.4s;
}

.dropdown.notificacao .nav-link-custom {
  background-image: url('../assets/img/notificacao.svg');
  background-position: left 6px;
  background-repeat: no-repeat;
  background-size: auto;
  width: 30px;
  height: 36px;
  padding-left: 0;
  padding-right: 0;
  margin-top: 2px;
}

.dropdown.notificacao.ativo .nav-link-custom {
  background-image: url('../assets/img/notificacao_ativo.svg');
}

.dropdown.notificacao .dropdown-toggle::after {
  display: none;
}

.dropdown-menu.show {
  min-width: 100%;
  transform: translate3d(0px, 37px, 0px) !important;
  border-radius: 8px;
  border: 0;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.25);
}

.dropdown.notificacao .dropdown-menu.show {
  max-width: 430px;
  left: calc(15vw - 400px) !important;
  max-height: 70vh;
  overflow: auto;
}

.dropdown-menu.show .titulo .dropdown-item.disabled {
  font-family: 'nunitobold';
  font-size: 16px;
  color: #000000;
}

.dropdown-menu.show .dropdown-item.disabled .count {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: #913C85;
  border-radius: 10px;
  font-family: 'nunitolight';
  font-style: normal;
  font-size: 10px;
  color: #FFFFFF;
  float: right;
  margin-top: 3px;
}

.dropdown-menu.show .item .dropdown-item .imagem {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.dropdown.show .dropdown-toggle::after {
  transform: rotate(180deg);
}

.dropdown.show > .nav-link {
  color: #333332;
  background-color: transparent;
}

.dropdown-menu.dropdown-menu-right.show {
  min-width: 100%;
  transform: translate3d(0px, 37px, 0px) !important;
  border-radius: 15px;
}

.nav-link-custom {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #333332;
  text-decoration: none;
  outline: none;
}

.nav-link-custom:hover {
  color: #333332;
  text-decoration: none;
}

.dados-user {
  position: relative;
  height: 90px;
  width: 100%;
  background: #f0f4f8;
  border-radius: 0px 30px 0 0;
}

.dados-user::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(223, 224, 231, 0.3);
}

.texto {
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

@media only screen and (max-width: 767px) {
  .dados-user {
    height: 72px;
    width: auto;
    display: inline-block;
    border-radius: 0 30px 0 30px;
  }

  .dados-user::before {
    display: none;
  }
}
</style>