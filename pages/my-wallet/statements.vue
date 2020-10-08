<template>
  <b-container class="app-wrapper">
    <b-row>
      <b-col cols="12" class="dash shadow-sm bg-white mt-5 pt-0 pr-0 pb-0">
        <Menu />
        <b-row>
          <!-- header -->
          <b-col cols="12">
            <b-row>
              <b-col col xl="7" lg="7" md="7" cols="12" order="2" order-md="1">
                <!-- <h1 class="titulo pt-3 pb-3 pt-md-4 pb-md-4 pl-3 pr-3 m-0">Extrato</h1> -->
              </b-col>
              <b-col col xl="5" lg="5" md="5" cols="12" order="1" order-md="2">
                <div class="dados-user float-right">
                  <b-nav pills align="right" class="nav-user pt-md-4 pb-3 pl-md-1 pl-2 pr-3 pt-3">
                    <b-nav-item>
                      <img src="~assets/img/busca.svg" class="d-block mt-1" alt />
                    </b-nav-item>
                    <b-nav-item>
                      <img v-if="!notiCount" src="~assets/img/notifications_24px.svg" alt />
                      <img v-else src="~assets/img/notificacao.svg" alt />
                      <span v-if="notiCount">{{ notiCount }}</span>
                    </b-nav-item>
                    <b-nav-item-dropdown
                      id="my-nav-dropdown"
                      text="Winderson"
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

          <!-- body -->
          <b-col cols="12">
            <b-row>
              <b-col col xl="7" lg="7" md="7" cols="12">
                <div class="middle-content-wrapper">
                  <b-row class="mb-4 d-flex justify-content-between align-items-center">
                    <b-col cols="10" class="pl-0">
                      <h3 class="titulo-componente text-left">
                        Extrato
                      </h3>
                    </b-col>
                    <b-col cols="2">
                      <b-dropdown :class="'filter'" v-model="filter.filterSelectedOpttion"
                      :text="defaultFilterValue"
                      v-on:change="changeItem">
                        <b-dropdown-item v-for="option in filter.options" 
                          :key="option.value" 
                          :value="option.value"
                          v-model="filter.filterSelectedOpttion"
                          @click="filter.filterSelectedOpttion = defaultFilterValue = option.value">
                          {{option.text}}
                        </b-dropdown-item>           
                      </b-dropdown> 
                      <!-- <span>Selected: {{ filter.filterSelectedOpttion }}</span> -->
                    </b-col>
                  </b-row>
                  <b-row id="statements">
                      <Statement
                        v-for="statement in this.filter.filteredStatements" 
                        :key="statement.id"
                        :statement="statement" />                        
                  </b-row>
                </div>
              </b-col>

              <b-col col xl="5" lg="5" md="5" cols="12" class="painel-lateral">
                <div class="painel bg-1">
                  <Carteira />
                </div>
                <div class="painel bg-2">
                  <!-- <Chat /> -->
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <p cols="12" class="copyright text-center pt-3 pb-3">
          Copyright &copy;
          <strong>influu.me 2019</strong>
          {{
          $t('footer.rights')
          }} |
          <a
            v-if="$i18n.locale === 'en'"
            :href="switchLocalePath('br')"
            class="footer-link"
          >{{ $t('links.br') }}</a>
          <a v-else :href="switchLocalePath('en')" class="footer-link">{{ $t('links.en') }}</a>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Menu from "~/components/Menu.vue";
import Slider from "~/components/Slider.vue";
import Notificacoes from "~/components/Notificacoes.vue";
import Campanhas from "~/components/Campanhas.vue";
import Carteira from "~/components/Carteira.vue";
import Chat from "~/components/Chat.vue";
import Colab from "~/components/Colab.vue";
import Statement from "~/components/statement/Statement.vue";
import { countMyNotificationsNotRead } from '~/business/services/dash-service';
import { getMyWalletFinancialStatement } from '~/business/services/wallet-service';

const moment = require('moment');
      moment.locale('pt');

const _ = require('lodash');

export default {
  components: {
    Menu,
    Slider,
    Notificacoes,
    Campanhas,
    Carteira,
    Chat,
    Colab,
    Statement
  },
  data: () => ({
    defaultFilterValue: 'Filtrar',
    filter: {
        originalValue: [],
        filterSelectedOpttion: '',
        disabled: false,
        readonly: false,  
        visible: true,
        color: "",
        options: [{
          "value": 'Filtrar',
          "text": 'Filtrar'        
        }],
        filteredStatements: []
    },    
    notiCount: 0,
    statements: []
  }),
  methods: {
    array_unique(arr) { 
      return _.uniqWith(arr, _.isEqual);
    },      
    changeItem: async function () {
        try {
            this.defaultFilterValue = this.filter.filterSelectedOpttion;
        } catch (error) {
            console.log(error)
        }
    },    
    logout() {
      this.$apolloHelpers.onLogout();
      this.$router.push(this.localePath('/auth/login'));
    }
  },
  async mounted() {
    this.notiCount = await countMyNotificationsNotRead(this.$apollo);
    this.filter.filteredStatements = this.statements = await getMyWalletFinancialStatement(this.$apollo);

    let dateFilter = [];

    for (const [key, statement] of Object.entries(this.statements)) {
      dateFilter.push(moment(statement.createdAt).format("YYYY"));     
    }   

    for (const [key, date] of Object.entries(this.array_unique(dateFilter))) {
      this.filter.options.push({
        "value": date,
        "text": date        
      })
    }     

    this.filter.options.push()
  },
  watch: {
    filterSelectedOpttion(v) {
      this.filter.filteredStatements = (v && v !== 'Filtrar') ? this.statements.filter((data) => moment(data.createdAt).format("YYYY") === v) : this.statements;
    }
  },
  computed: {
    filterSelectedOpttion() {
      return this.filter.filterSelectedOpttion
    }
  }
};
</script>

<style>
  body {
    background: linear-gradient(0deg, #6c327e 0%, #903b85 92.68%);
    background-size: cover;
    background-attachment: fixed;
  }

  .dash {
    /* height: calc(100vh - 7.5rem); */
    border-radius: 30px;
    padding-left: 140px;
    min-height: calc(100vh - 7.5rem);
    /* padding-left: 268px; */
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
    background-image: url("../../assets/img/arrow-bottom.svg");
    width: 12px;
    height: 7px;
    vertical-align: middle;
    margin-left: 10px;
    transition: ease 0.4s;
  }

  .dropdown.show .dropdown-toggle::after {
    transform: rotate(180deg);
  }

  .dropdown.show > .nav-link {
    color: #333332;
    background-color: #ffffff;
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

  /* painel lateral */
  .painel-lateral .painel {
    position: relative;
    /* min-height: 374px; */
    border-radius: 0 0 30px 30px;
    /* padding-bottom: 30px; */
    margin-top: -30px;
  }

  .painel-lateral .painel:first-child {
    margin-top: 0;
  }

  .painel-lateral .painel.bg-1 {
    background-color: #f0f4f8;
    z-index: 3;
  }

  .painel-lateral .painel.bg-2 {
    background-color: #f7f9fb;
    z-index: 2;
  }

  .painel-lateral .painel.bg-3 {
    /* background-color: rgba(247, 249, 251, 0.4); */
    z-index: 1;
  }

  .dados-user-wrapper {
    width: 100%;
    /* height: 380px; */
    background: #f7f9fb;
    border-radius: 0px 30px 30px 30px;
  }

  .copyright {
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 22px;
    color: #ffffff;
  }

  .footer-link {
    color: aquamarine;
  }

  .footer-link:hover {
    color: #9efbff;
  }

  /* coluna central */
  .middle-content-wrapper {
    padding-left: 30px;
    margin-top: -3.5em;
  }
  body {
    max-width: 100%;
    overflow-x: hidden;
  }
  .app-wrapper {
    padding-left: 30px !important;
  }
  .middle-content-wrapper {
    margin-top: -4em;
  }
  .filter .btn {
    background-color: transparent!important;
    border: none!important;
    color: #8C8D8F!important;
    box-shadow: none!important;
    outline: none!important;
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

    .dados-user {
      height: 72px;
      width: auto;
      display: inline-block;
      border-radius: 0 30px 0 30px;
    }

    .dados-user::before {
      display: none;
    }
    .app-wrapper {
      padding-left: 30px !important;
    }
  }
</style>
