<template>
  <b-col cols="12">
    <b-row>
      <b-col col xl="7" lg="7" md="7" cols="12">
        <div class="middle-content-wrapper">
          <Slider />
          <Notificacoes />
          <Campanhas />
        </div>
      </b-col>

      <b-col col xl="5" lg="5" md="5" cols="12" class="painel-lateral">
        <div class="painel bg-1">
          <Carteira />
        </div>
        <div class="painel bg-2">
          <Chat />
        </div>
        <div class="painel bg-3">
          <Colab />
        </div>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import Slider from "~/components/Slider.vue";
import Notificacoes from "~/components/Notificacoes.vue";
import Campanhas from "~/components/Campanhas.vue";
import Carteira from "~/components/Carteira.vue";
import Chat from "~/components/Chat.vue";
import Colab from "~/components/Colab.vue";

export default {
  layout: 'index',
  components: {
    Slider,
    Notificacoes,
    Campanhas,
    Carteira,
    Chat,
    Colab
  }
};
</script>

<style scoped>
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

/* coluna central */
.middle-content-wrapper {
  padding-left: 30px;
  margin-top: -3.5em;
}
.middle-content-wrapper {
  margin-top: -4em;
}
</style>
