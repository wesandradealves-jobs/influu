<template>
  <div class="componente-notificacoes my-2 mx-2">
    <h3 class="titulo-componente text-left my-4">Notificações</h3>
    <div>
      <b-alert
        class="mb-3"
        v-for="notificacao in myNotificationsPaginated"
        :key="notificacao.id"
        variant="dark"
        show
        :dismissible="!notificacao.notNoti"
        @input="removeNoti(notificacao.id)"
      >
        {{ notificacao.title }}
      </b-alert>
    </div>
  </div>
</template>
<script>
import {
  myNotificationsPaginated,
  removeNotification
} from '~/business/services/dash-service';

export default {
  data: () => ({
    notificationsPaginated: {},
  }),
  computed: {
    myNotificationsPaginated() {
      return this.notificationsPaginated.length > 0
        ? this.notificationsPaginated
        : [{
          id: 0,
          title: 'Sem novas notificações',
          notNoti: true
        }]; 
    }
  },
  methods: {
    async removeNoti(id) {
      try {
        await removeNotification(this.$apollo, id);
        this.loadNoti();
      } catch (e) {}
    },
    async loadNoti() {
      try {
        this.notificationsPaginated = await myNotificationsPaginated(
          this.$apollo, {
          page: 1,
          pageRows: 4,
          refreshCache: true
        });
      } catch (e) {}
    }
  },
  async mounted() {
   this.loadNoti();
  }
};
</script>

<style scoped>
/* componente slider */
.alert {
  background: #f6f7fa;
  border: none;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  font-family: "nunitoregular";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #555555;
}
.alert-dismissible .close {
  background: #f183aa;
  border-radius: 8px;
  color: #fff !important;
  font-weight: normal;
  text-shadow: none;
  opacity: 1;
  padding: 3px 10px;
  margin: 10px;
}
</style>
