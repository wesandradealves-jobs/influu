<template>
  <b-col cols="12" class="componente-statement mb-3">
    <b-row class="d-flex flex-wrap flex-row justify-content-between align-items-center">
      <b-col cols="9">
        <b-row class="d-flex flex-wrap flex-row justify-content-between align-items-center">
          <b-col cols="1">
            <svg width="15" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path v-if="!statement.creditType" d="M6 1H13M13 1V8M13 1L1 13" stroke="#F183AA" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <path v-else d="M8 13H1M1 13V6M1 13L13 1" stroke="#96DCA3" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </b-col>
          <b-col cols="11">
            <span class="title">
              {{statement.description}}
              <small class="date">{{dateFormat(statement.createdAt)}}</small>
            </span>
          </b-col>          
        </b-row>
      </b-col>
      <b-col cols="3" class="text-right">
        <b-row class="d-flex flex-wrap flex-row justify-content-end align-items-center">
          <span class="value" :class="!statement.creditType ? 'mr-3' : ''">
            R$ {{statement.value}}
          </span>
          <span v-if="statement.creditType" @click="expand" class="expand ml-2 mr-3">
            <b-icon-plus v-if="!isExpanded"></b-icon-plus>
            <b-icon-dash v-else></b-icon-dash>
          </span>
        </b-row>
      </b-col> 
      <b-row v-if="statement.creditType" v-show="isExpanded" cols="12" class="p-3 m-0">
        <b-col cols="12" class="p-0 pl-2">
          <b-row cols="12" class="tab-navigation mr-0">
            <b-col class="m-0 p-0" v-for="(tab, index) in tabs" :key="index">
              <button
                :key="tab.component"
                @click="selected = tab.component;"
                :class="['tab-btn', 
                { active: selected === tab.component },
                { disabled: index === 2 && myInvoice.invoice && myInvoice.status !== 'PROCESSANDO' || index === 3}]"
              >
                <i>
                  {{ index+=1 }}
                </i>
                <span class="pl-2">
                  {{ tab.label }}
                </span>
              </button>  
            </b-col>
          </b-row>          
        </b-col>
        <b-col cols="12" class="p-4 m-0 tab-content">
          <component 
            v-dynamic-events="events"
            :myInvoice="myInvoice" 
            :statement="statement" 
            :is="selected"></component>
        </b-col>         
      </b-row>    
    </b-row>
  </b-col>
</template>

<script>
import Vue from 'vue'
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import StatementDados from "~/components/statement/partials/StatementDados.vue";
import StatementEnvioNfe from "~/components/statement/partials/StatementEnvioNfe.vue";
import StatementProcessoDePagamento from "~/components/statement/partials/StatementProcessoDePagamento.vue";
import StatementFinalizado from "~/components/statement/partials/StatementFinalizado.vue";

const moment = require('moment');
      moment.locale('pt');

Vue.use(BootstrapVueIcons)

export default {
  components: {
    StatementDados,
    StatementEnvioNfe,
    StatementProcessoDePagamento,
    StatementFinalizado
  },
  directives: {
    DynamicEvents: {
      bind: (el, binding, vnode) => {
        const allEvents = binding.value;
        Object.keys(allEvents).forEach((event) => {
          // register handler in the dynamic component
          vnode.componentInstance.$on(event, (eventData) => {
            const targetEvent = allEvents[event];
            vnode.context[targetEvent](eventData);
          });
        });
      },
      unbind: function (el, binding, vnode) {
        vnode.componentInstance.$off();
      },
    },
  },  
  data: () => ({
    isExpanded: false,
    myInvoice: {
      status: '',
      invoice: ''
    },
    events: {
      setInvoice: 'setInvoice'
    },
    tabs: [
      {
        label: 'Dados',
        component: 'StatementDados'
      },
      {
        label: 'Envio NF-e',
        component: 'StatementEnvioNfe'
      },
      {
        label: 'Processo de Pagamento',
        component: 'StatementProcessoDePagamento'
      },
      {
        label: 'Finalizado',
        component: 'StatementFinalizado'
      }      
    ],
    selected: "StatementDados"
  }),
  props: ['statement'],
  methods: {
    setInvoice(v) {
      this.myInvoice.status = v.invoice.status;
      this.myInvoice.invoice = v.invoice;

      console.log(this.myInvoice)
    },
    expand() {
      this.isExpanded = !this.isExpanded
    },
    dateFormat(date) {
      return moment(date).format("D [de] MMMM [de] YYYY")
    }
  },  
  async mounted() {
  }
};
</script>

<style scoped lang="sass">
  @import '~/components/statement/sass/_style'
</style>
