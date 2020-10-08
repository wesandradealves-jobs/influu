<template>
  <b-container class="campaigns">
    <b-row :class="{ loading: loading }">
      <b-col col md="8" cols="12" class="py-sm-4 pl-sm-5 my-campaigns">
        <template v-if="influCampaigns.length > 0">
          <b-row
            class="linha-campanha mb-3"
            v-for="(campaign, campIdx) in influCampaigns" :key="campaign.id"
          >
            <b-col col cols="12">
              <b-row class="my-1 py-2 d-shadow">
                <b-col col cols="3">
                  <span class="titulo-campanha">Cliente</span><br>
                  {{ campaign.campaign.company.name }}
                </b-col>
                <b-col col cols="3">
                  <span class="titulo-campanha">Campanha</span><br>
                  {{ campaign.campaign.name }}
                </b-col>
                <b-col col cols="2">
                  <span class="titulo-campanha">Início</span><br>
                  {{ toTomorrow(campaign.campaign.end) }}
                </b-col>
                <b-col col cols="3">
                  <span class="titulo-campanha">Status</span><br>
                  {{
                    campaign.status.substring(0, 1) +
                    campaign.status.substring(1).toLowerCase()
                  }}
                </b-col>
                <b-col col cols="1">
                  <b-button class="campaign-open d-shadow mt-2"
                    @click="showCampaign = showCampaign === campaign.campaign.id
                      ? '' : campaign.campaign.id"
                  >
                    {{ showCampaign === campaign.campaign.id ? '-' : '+' }}
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
            <template v-if="showCampaign === campaign.campaign.id">
              <b-col col cols="12">
                <b-row class="my-1 py-2 d-shadow">
                  <b-col col cols="6">
                    <span class="titulo-campanha">Período</span><br>
                    <span>
                      {{ toDate(campaign.campaign.begin) }} a 
                      {{ toDate(campaign.campaign.end) }}
                    </span>
                  </b-col>
                  <b-col col cols="6">
                    <span class="titulo-campanha">Valor</span><br>
                    <span>
                      {{ campaign.value ? toMoney(campaign.value) : 'Não negociado' }}
                    </span>
                  </b-col>
                </b-row>
              </b-col>
              <b-col col cols="12" class="pb-3">
                <b-row class="m-1">
                  <template
                    v-for="(deliveries, delIdx) in deliveries[campIdx]"
                  >
                    <b-col
                      col :cols="campaign.status === 'APROVADO' ? '4' : '6'"
                      class="p-0 deliveries-wrapper"
                      :key="deliveries.title"
                      v-if="delIdx === 0 || campaign.status === 'APROVADO'"
                    >
                      <div class="mx-2 p-3 back-white d-shadow delivery-list">
                        <p class="list-title">
                          {{
                            $t('campaigns.deliveryStatus.' + deliveries.title)
                          }}
                        </p>
                        <div
                          class="p-1 mt-3 d-shadow"
                          v-for="delivery in deliveries.deliveries"
                          :key="campaign.campaign.id + 'del' + delivery.campaignDeliveryInfo.id"
                        >
                          <img class="delivery-logo absolute-logo" src="~assets/img/campaigns/chat.svg" alt="">
                          <span class="delivery-group">
                          {{
                            delivery.delivery.deliveryGroup.name
                            || 'DefaultGroup'
                          }}
                          </span><br>
                          <span>
                          {{
                            delivery.delivery.name
                            || 'Default'
                          }}
                          </span><br>
                          <div class="absolute-logo">
                            <img
                              @click="show = show !== ('view' + campaign.campaign.id + '-' + delivery.campaignDeliveryInfo.id) ? ('view' + campaign.campaign.id + '-' + delivery.campaignDeliveryInfo.id) : ''"
                              class="delivery-logo"
                              src="~assets/img/campaigns/stats.svg" alt
                            >
                            <img
                              @click="show = show !== ('info' + campaign.campaign.id + '-' + delivery.campaignDeliveryInfo.id) ? ('info' + campaign.campaign.id + '-' + delivery.campaignDeliveryInfo.id) : ''"
                              class="delivery-logo"
                              src="~assets/img/campaigns/info.svg" alt
                            >
                            <img
                              @click="show = show !== ('file' + campaign.campaign.id + '-' + delivery.campaignDeliveryInfo.id) ? ('file' + campaign.campaign.id + '-' + delivery.campaignDeliveryInfo.id) : ''"
                              class="delivery-logo"
                              src="~assets/img/campaigns/attach.svg" alt
                              v-if="campaign.status === 'APROVADO'"
                            >
                          </div>
                          <span class="time">
                          {{
                            toDate(delivery.campaignDeliveryInfo.deliveryDate)
                            || '?/?/?'
                          }}
                          </span><br>
                          <span class="time">
                            {{
                              toTime(delivery.campaignDeliveryInfo.deliveryDate)
                              || '?:?'
                            }}
                          </span>
                          <br>
                          <div class="mt-1" v-if="show === ('view' + campaign.campaign.id + '-' + delivery.campaignDeliveryInfo.id)">
                            <span>Views esperadas: <b>{{
                              delivery.campaignDeliveryInfo.clickViewsMeta
                            }}</b></span>
                          </div>
                          <div class="mt-1" v-if="show === ('info' + campaign.campaign.id + '-' + delivery.campaignDeliveryInfo.id)">
                            <span><b>Detalhes</b></span><br>
                            <span class="delivery-details">
                              {{
                                delivery.campaignDeliveryInfo.description
                              }}
                            </span><br>
                            <template v-if="delivery.campaignDeliveryInfo.attachments.length > 0"
                            >
                              <img
                                class="delivery-logo"
                                src="~assets/img/campaigns/attach.svg" alt
                              >
                              <a
                                :href="delivery.campaignDeliveryInfo.attachments[0].attachment.url"
                                target="_blank"
                                class="filename attach-url"
                              >
                              {{
                                delivery.campaignDeliveryInfo.attachments[0].attachment.filename
                              }}
                              </a>
                            </template>
                          </div>
                          <div class="mt-1" v-if="show === ('file' + campaign.campaign.id + '-' + delivery.campaignDeliveryInfo.id)">
                            <template
                              v-if="delivery.campaignDeliveryInfo.influencersApproved[0]"
                            >
                              <div
                                class="pb-2"
                                v-for="attachment in delivery.campaignDeliveryInfo.influencersApproved[0].attachments"
                                :key="attachment.id"
                              >
                                <img
                                  class="delivery-logo"
                                  src="~assets/img/campaigns/attach.svg" alt
                                >
                                <a
                                  class="filename attach-url"
                                  target="_blank"
                                  :href="attachment.attachment.url"
                                >
                                {{
                                  attachment.attachment.filename
                                }}
                                </a>
                                <img
                                  v-if="attachment.status === 'REJEITADO'"
                                  src="~assets/img/campaigns/alert.svg" alt
                                >
                                <img
                                  v-else-if="attachment.status === 'APROVADO'"
                                  src="~assets/img/campaigns/done.svg" alt
                                >
                                <img
                                  v-else
                                  src="~assets/img/campaigns/processing.svg" alt
                                >
                              </div>
                              <template
                                v-if="delivery.campaignDeliveryInfo.influencersApproved[0].rejectionReason"
                              >
                                <b>Motivo da rejeição:</b><br>
                                <p>
                                  {{
                                    delivery.campaignDeliveryInfo.influencersApproved[0].rejectionReason
                                  }}
                                </p>
                              </template>
                            </template>
                            <template v-if="delIdx === 0">
                              <b-button
                                class="d-shadow px-1 py-0 delivery-btn"
                                @click="openFile()"
                              >
                                Adicionar anexo
                              </b-button>
                              <input
                                v-show="false"
                                type="file"
                                @change="(el) => createAttachment(el, delivery)"
                                ref="inputFile"
                              />
                              <b-button
                                class="d-shadow px-1 py-0 mt-1 delivery-btn"
                                @click="sendToValidation(delivery)"
                              >
                                Confirmar entrega
                              </b-button>
                            </template>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </template>
                </b-row>
              </b-col>
            </template>
          </b-row>
        </template>
        <p v-else class="noInfluencerCampaigns">
          Associe-se à uma campanha ao lado
        </p>
      </b-col>
      <b-col col md="4" cols="12" class="painel-lateral">
        <div class="painel bg-1 px-3 py-0">
          <div class="componente-campanhas">
            <h3 class="titulo-componente text-left mb-4">
              Campanhas em destaque
            </h3>
            <b-alert
              class="mb-3 d-shadow"
              v-for="campanha in getCampaignsPaginated"
              :key="'camp' + campanha.id"
              variant="dark"
              show
            >
              <b-row class="chamada">
                <b-col col class="chamada-texto col-10">
                  <h4 class="pt-2">{{ campanha.company.name }}</h4>
                  <span>
                    {{ campanha.name }}
                  </span><br>
                  <span>
                    Início: {{ toTomorrow(campanha.end) }}
                  </span>
                </b-col>
                <b-col col class="col-2">
                  <b-button
                    class="campaign-open d-shadow mt-4"
                    @click="showSuggested = showSuggested === campanha.id
                      ? '' : campanha.id"
                  >
                    {{ showSuggested === campanha.id ? '-' : '+' }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row
                class="chamada mt-2"
                v-if="showSuggested === campanha.id"
              >
                <b-col col class="chamada-texto col-12">
                  <template v-if="campanha.briefings.length > 0">
                    <span>Resumo:</span><br>
                    <div
                      class="my-1"
                      v-for="briefing in campanha.briefings"
                      :key="campanha.id + 'cd' + briefing.briefing.id"
                    >
                      <a
                        :href="briefing.briefing.url" target="_blank"
                        class="attach-url"
                      >
                        {{ briefing.briefing.filename }}
                      </a>
                      <div class="w-100 mt-1"></div>
                    </div>
                  </template>
                  <span v-else>Sem resumo cadastrado</span>
                </b-col>
                <b-col col class="col-12">
                  <b-button
                    class="d-shadow px-1 py-0 btn-associate"
                    @click="associateToCampaign(campanha.id)"
                  >
                    Mostrar interesse
                  </b-button>
                </b-col>
              </b-row>
            </b-alert>
          </div>
        </div>
      </b-col>
      <div class="spinner" v-if="loading">
        <b-spinner
          variant="secondary"
          style="width: 3rem; height: 3rem;"
          :label="$t('form.loading')"
        />
      </div>
    </b-row>
  </b-container>
</template>

<script>
import {
  getInfluencerCampaignsPaginated,
  associateInfluencerToCampaign,
  createInfluencerAttachmentInCampaign,
  updateInfluencerDeliveryFromBacklogToValidation
} from '~/business/services/campaigns-service';
import moment from 'moment';
import {
  getCampaignsPaginated,
  getUserId
} from '~/business/services/dash-service';
import {
  makeToast
} from '~/business/services/utils';
import groupBy from 'lodash/groupBy';

export default {
  name: 'campaigns',
  layout: 'index',
  data: () => ({
    influCampaigns: {},
    getCampaignsPaginated: {},
    show: '',
    showSuggested: '',
    showCampaign: '',
    loading: false,
    deliveries: {},
    statuses: ['BACKLOG', 'VALIDANDO', 'APROVADO'],
    conversionMap: {
      'BACKLOG': 'backlog',
      'VALIDANDO': 'validating',
      'APROVADO': 'approved'
    },
  }),
  methods: {
    toDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    toTomorrow(date) {
      return this.toDate(moment(date).add(1, 'days'));
    },
    toTime(date) {
      return moment(date).format('HH:mm');
    },
    toMoney(string) {
      const formatter = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
      });
      return formatter.format(string);
    },
    async associateToCampaign(campaignId) {
      try {
        await associateInfluencerToCampaign(this.$apollo, {
          campaignId,
          influencerId: await getUserId(this.$apollo)
        });
        this.loadCampaigns(true);
      } catch (e) {}
    },
    async createAttachment(el, infoId) {
      infoId = infoId.campaignDeliveryInfo.influencersApproved[0].id;
      var attach = el.target.files[0];
      try {
        await createInfluencerAttachmentInCampaign(this.$apollo, {
          campaignDeliveryInfoInfluencerApprovedId: infoId,
          attachment: attach
        });
        this.loadCampaigns(true);
      } catch (e) {}
    },
    openFile() {
      this.$refs.inputFile[0].click();
    },
    async sendToValidation(approved) {
      approved = approved.campaignDeliveryInfo.influencersApproved[0];
      try {
        await updateInfluencerDeliveryFromBacklogToValidation(this.$apollo, {
          campaignDeliveryInfoInfluencerApprovedId: approved.id
        });
        this.loadCampaigns(true);
      } catch (e) {}
    },
    async loadCampaigns(refreshCache) {
      try {
        this.influCampaigns = await getInfluencerCampaignsPaginated(
          this.$apollo, {
          page: 1,
          pageRows: 10,
          refreshCache
        });
        this.getCampaignsPaginated = await getCampaignsPaginated(this.$apollo, {
          page: 1,
          pageRows: 10,
          excludeCampaignsImParticipating: true,
          refreshCache
        });
        this.loading = false;
        this.deliveries = this.influCampaigns.map(camp => {
          const campDel = Object.entries(groupBy(
            camp.campaign.deliveries,
            delivery => {
              const approved = delivery.campaignDeliveryInfo.influencersApproved;
              return approved.length > 0 ? approved[0].status : 'BACKLOG';
            }
          ));
          return this.statuses.map(status => ({
            title: this.conversionMap[status],
            deliveries: this.filterDeliveriesByStatus(campDel, status)
          }));
        });
      } catch (e) {}
    },
    filterDeliveriesByStatus(deliveries, status) {
      const filteredDeliveries = deliveries
        .filter(delivery => delivery[0] === status);
      return filteredDeliveries.length !== 0
        ? filteredDeliveries[0][1]
        : [];
    },
  },
  async mounted() {
    await this.loadCampaigns();
  }
}
</script>

<style scoped>
.campaigns {
  font-size: 14px;
}
.linha-campanha {
  background-color: #f0f4f8;
  border-radius: 10px;
  font-family: 'nunitoregular' !important;
}
.titulo-campanha {
  font-size: 11px;
  color: grey;
}
/* painel lateral */
.campaigns .painel-lateral {
  max-height: 70vh;
}
.campaigns .painel-lateral .painel {
  position: relative;
  border-radius: 0 0 30px 30px;
  height: 100%;
}

.campaigns .painel-lateral .painel.bg-1 {
  margin-top: 0;
  background-color: #f0f4f8;
  z-index: 3;
  overflow: auto;
}
.d-shadow {
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.03);
}

/* componente slider */
.alert {
  background: #f6f7fa;
  border: none;
  border-radius: 4px;
  font-family: "nunitoregular";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #555555;
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
.campaigns .titulo-componente {
  font-size: 20px
}
.campaign-open {
  width: 25px;
  height: 25px;
  padding: 0;
  background: #f6f7fa;
  color: #555555;
  font-weight: bold;
  border: none;
}
.back-white {
  background-color: #f8f8f8;
}
.deliveries-wrapper {
  height: fit-content;
}
.delivery-list {
  font-size: 12px;
}
.list-title {
  color: #803781;
  font-weight: bold;
  font-size: 16px;
}
.delivery-group {
  color: #b44cb7;
  font-weight: bold;
  font-size: 14px;
}
.delivery-logo {
  width: 20px;
  cursor: pointer;
}
.absolute-logo {
  position: absolute;
  right: 0;
  margin-right: 15%;
}
.time,
.delivery-details {
  color: grey;
}
.filename {
  vertical-align: middle;
}
.btn-associate {
  background: #7e3681;
  border: none;
}
.btn-associate:hover {
  background: #6c2f6e;
}
.loading > * {
  opacity: 0.3;
  pointer-events: none;
}
.spinner {
  position: absolute;
  top: 71px;
  left: 0;
  width: 100%;
  margin: auto;
  text-align: center;
  z-index: 100;
  opacity: 0.6;
}
.noInfluencerCampaigns {
  text-align: center;
  font-size: 18px;
}
.delivery-btn {
  font-size: 14px;
}
.my-campaigns {
  max-height: 74vh;
  overflow: auto;
}
.attach-url {
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 70%;
  display: inline-block;
  overflow: hidden;
}
</style>