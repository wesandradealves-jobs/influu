<template>
  <div class="componente-campanhas mt-2 mb-5 mx-2">
    <h3 class="titulo-componente text-left mb-4">
      {{ $t("campaigns.suggested") }}
    </h3>
    <b-alert
      class="mb-3"
      v-for="campanha in getCampaignsPaginated"
      :key="campanha.id"
      variant="dark"
      show
    >
      <div class="row chamada">
        <div class="thumbnail col-2">
          <img :src="campanha.company.image" class="img-fluid" alt="" />
        </div>
        <div class="chamada-texto col-10">
          <h4 class="pt-2">{{ campanha.company.name }}</h4>
          <p>
            {{ campanha.name }}
          </p>
        </div>
      </div>
    </b-alert>
  </div>
</template>

<script>
import { getCampaignsPaginated } from '~/business/services/dash-service';

export default {
  data: () => ({
    getCampaignsPaginated: {}
  }),
  async mounted() {
    try {
      this.getCampaignsPaginated = await getCampaignsPaginated(this.$apollo, {
        page: 1,
        pageRows: 3,
        excludeCampaignsImParticipating: true
      });
    } catch (e) {}
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
.chamada {
  /* margin-bottom: -17px; */
}
.thumbnail img {
  border-radius: 4px;
}
.chamada-texto h4 {
  font-family: "nunitoregular";
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 2px;
}
.chamada-texto p {
  font-family: "nunitoregular";
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
}
</style>
