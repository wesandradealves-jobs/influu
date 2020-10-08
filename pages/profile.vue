<template>
  <b-container class="profile">
    <b-row>
      <b-col col xl="7" lg="7" md="7" cols="12" class="py-sm-4 pl-sm-5">
        <b-form
          action
          method="POST"
          @submit.prevent="updateData"
          v-bind:class="{ loading: loading }"
          class="form"
          autocomplete="new-password"
        >
          <b-row rows wrap>
            <b-col col cols="12">
              <b-form-group id="input-group-1" label="Nome Completo">
                <b-form-input
                  id="input-1"
                  type="text"
                  v-model="form.name"
                  required
                  :state="form.name.length > 3"
                />
              </b-form-group>
            </b-col>

            <b-col col cols="12" sm="4">
              <b-form-group id="input-group-2" label="CPF">
                <b-form-input
                  id="input-2"
                  type="text"
                  v-model="form.info.cpf"
                  required
                  v-mask="'999.999.999-99'"
                  :state="isValidCPF(form.info.cpf)"
                />
              </b-form-group>
            </b-col>

            <b-col col cols="12" sm="4">
              <b-form-group id="input-group-3" label="RG">
                <b-form-input
                  id="input-3"
                  type="text"
                  v-model="form.info.rg"
                  required
                  v-mask="'9999999999'"
                />
              </b-form-group>
            </b-col>

            <b-col col cols="12" sm="4">
              <b-form-group id="input-group-33" label="Data de nascimento">
                <b-form-datepicker
                  id="input-33"
                  v-model="form.info.birthDate"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                  }"
                  locale="pt-BR"
                  :hide-header="true"
                  required
                />
              </b-form-group>
            </b-col>
          </b-row>
          
          <b-row rows wrap>
            <b-col col cols="12" sm="6">
              <b-form-group id="input-group-1" label="Estado civil">
                <b-form-select
                  id="input-1"
                  v-model="form.info.civilStatus"
                  required
                  :options="userCivilStatusTypes"
                />
              </b-form-group>
            </b-col>
            <b-col col cols="12" sm="6">
              <b-form-group id="input-group-1" label="Gênero">
                <b-form-radio-group
                  id="input-1"
                  v-model="form.info.gender"
                  required
                  :options="userGenderTypes"
                />
              </b-form-group>
            </b-col>
          </b-row>
          
          <b-row rows wrap>
            <b-col col cols="12" sm="6">
              <b-form-group id="input-group-1" label="Escolaridade">
                <b-form-select
                  id="input-1"
                  v-model="form.info.schooling"
                  required
                  :options="userSchoolingTypes"
                />
              </b-form-group>
            </b-col>
    
            <b-col col cols="12" sm="6">
              <b-form-group id="input-group-1" label="Celular">
                <b-form-input
                  id="input-1"
                  type="text"
                  v-model="form.info.phone"
                  required
                  v-mask="'(99) 99999-9999'"
                  :state="isValidPhone(form.info.phone)"
                />
                <template v-if="!form.info.phoneValidated">
                  <b-form-input
                    type="text"
                    v-model="validationCode"
                    v-if="!form.info.phoneValidated"
                    v-mask="'999999999'"
                    placeholder="Código de verificação"
                  />
                  <b-button
                    type="submit" variant="primary"
                    class="float-right submit py-1 px-2"
                    @click.prevent="validateCode"
                    :disabled="(!parseFloat(validationCode) && parseFloat(validationCode) !== 0) || !isValidPhone(form.info.phone)"
                  >
                    Verificar
                  </b-button>
                </template>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col col cols="12">
              <b-form-group label="País">
                <b-form-input
                  type="text"
                  v-model="form.address.country"
                />
              </b-form-group>
            </b-col>
            <b-col col cols="12" sm="4">
              <b-form-group label="CEP">
                <b-form-input
                  type="text"
                  v-model="form.address.postcode"
                  v-mask="'99999-999'"
                  :state="isValidCEP(form.address.postcode)"
                  @keyup="getViaCEP()"
                />
              </b-form-group>
            </b-col>
            <b-col col cols="12" sm="4">
              <b-form-group label="Estado">
                <b-form-select
                  type="text"
                  v-model="form.address.state"
                  :options="brStatesTypes"
                />
              </b-form-group>
            </b-col>
            <b-col col cols="12" sm="4">
              <b-form-group label="Cidade">
                <b-form-input
                  type="text"
                  v-model="form.address.city"
                />
              </b-form-group>
            </b-col>
            <b-col col cols="12" sm="10">
              <b-form-group label="Rua">
                <b-form-input
                  type="text"
                  v-model="form.address.street"
                />
              </b-form-group>
            </b-col>
            <b-col col cols="12" sm="2">
              <b-form-group label="Número">
                <b-form-input
                  type="text"
                  v-model="form.address.number"
                  v-mask="'999999'"
                />
              </b-form-group>
            </b-col>
            <b-col col cols="12" sm="6">
              <b-form-group label="Bairro">
                <b-form-input
                  type="text"
                  v-model="form.address.neighborhood"
                />
              </b-form-group>
            </b-col>
            <b-col col cols="12" sm="6">
              <b-form-group label="Complemento">
                <b-form-input
                  type="text"
                  v-model="form.address.additionalInfo"
                />
              </b-form-group>
            </b-col>
          </b-row>
          
          <b-row>
            <b-col col cols="12" sm="6">
              <b-form-group label="Senha">
                <b-form-input
                  type="password"
                  v-model="form.password"
                  placeholder="Digite apenas se deseja alterar"
                  autocomplete="new-password"
                />
              </b-form-group>
            </b-col>
          </b-row>

          <div class="spinner" v-if="loading">
            <b-spinner
              variant="secondary"
              style="width: 3rem; height: 3rem;"
              :label="$t('form.loading')"
            />
          </div>

          <b-button
            type="submit" variant="primary" class="float-right submit"
            :disabled="!valid"
          >
            Salvar e atualizar
          </b-button>
        </b-form>
      </b-col>

      <b-col col xl="5" lg="5" md="5" cols="12" class="painel-lateral">
        <div class="painel bg-1">
          <img
            v-if="logoPreview.src || form.avatar"
            :src="logoPreview.src || form.avatar"
            :title="logoPreview.title"
            height="70px" alt="Imagem de perfil"
            @click="$refs.inputFile.click()"
            class="avatar"
          >
          <img
            v-else
            src="https://influu-nodejs.s3.amazonaws.com/stage/images/20200702-mazlo6-avatar-png"
            alt="Imagem de perfil"
            height="70px"
            @click="$refs.inputFile.click()"
            class="avatar"
          />
          <input
            v-show="false"
            type="file"
            @change="onFileChange"
            accept="image/png, image/jpeg"
            ref="inputFile"
          />
          <b>Midia Kit</b>
          <b-button
            class="plus-btn mt-5 mr-3 pt-0"
            @click="updateNickname()"
          >
            <img
              src="~assets/img/svg-pencil.svg"
              class="d-block mt-1" alt
              height="15px"
            />
          </b-button>
          <b-row>
            <b-col col class="col-4 pr-0">
              <span class="bio-url">https://influu.me/</span>
            </b-col>
            <b-col col class="col-6 pl-0">
              <b-form-input
                type="text"
                required
                v-model="form.info.nickname"
                @keyup="validNickName()"
              />
            </b-col>
            <b-col col class="col-2 p-0">
              <b-button class="plus-btn">
                <a
                  :href="'https://influu.me/' + form.info.nickname"
                  target="_blank"
                >
                  >
                </a>
              </b-button>
            </b-col>
          </b-row>
          <b-form-textarea
            v-model="form.info.bio"
            placeholder="Digite sua biografia de até 200 caracteres"
            rows="6"
            maxlength="200"
            class="bio"
          />
        </div>
        <div class="painel bg-2">
          <b-row class="pt-3">
            <b-col col class="col-12">
              <h5><b>Redes Sociais</b></h5>
              <b-button
                class="plus-btn"
                @click="showSocials = !showSocials"
              >
              {{ showSocials ? '-' : '+' }}
              </b-button>
              <template v-if="showSocials">
                <b-col col class="col-12">
                  <b-row
                    v-for="(so, i) in [
                      'Facebook', 'Instagram', 'Twitter', 'Youtube'
                    ]" :key="i"
                    @click="callOAuth(i)" style="cursor: pointer;"
                  >
                   + {{ so }}
                  </b-row>
                </b-col>
              </template>
            </b-col>
          </b-row>
          <b-row class="socials mt-0">
            <template v-if="socials.facebookPages.length > 0">
              <b-col
                v-for="face in socials.facebookPages"
                :key="face.facebookPageId"
                col class="col-4 mt-3 social py-2 mr-2"
              >
                <b-alert
                  class="tag social-title m-0 px-0"
                  variant="dark"
                  show
                  dismissible
                  @input="removeSocial(0, face.facebookPageId)"
                >
                  Facebook
                  <p class="social-subtitle m-0">
                    {{ face.name.split(' ')[0] }}
                  </p>
                </b-alert>
                <span class="social-label">Seguidores</span><br>
                <span class="social-count">
                  {{ face.fanCount || 0 }}
                </span><br>
                <span class="social-label">Avaliação</span><br>
                <span class="social-count">
                  {{ face.ratingCount || 0 }}
                </span>
              </b-col>
            </template>
            <template v-if="socials.instagramPages.length > 0">
              <b-col
                v-for="insta in socials.instagramPages"
                :key="insta.instagramPageId"
                col class="col-4 mt-3 social py-2 mr-2"
              >
                <b-alert
                  class="tag social-title m-0 px-0"
                  variant="dark"
                  show
                  dismissible
                  @input="removeSocial(1, insta.instagramPageId)"
                >
                  Instagram
                  <p class="social-subtitle m-0">
                    {{ insta.name }}
                  </p>
                </b-alert>
                <span class="social-label">Seguidores</span><br>
                <span class="social-count">
                  {{ insta.followersCount || 0 }}
                </span><br>
                <span class="social-label">Likes</span><br>
                <span class="social-count">
                  {{ insta.likesCount || 0 }}
                </span>
              </b-col>
            </template>
            <template v-if="socials.twitterPages.length > 0">
              <b-col
                v-for="twitter in socials.twitterPages"
                :key="twitter.twitterPageId"
                col class="col-4 mt-3 social py-2 mr-2"
              >
                <b-alert
                  class="tag social-title m-0 px-0"
                  variant="dark"
                  show
                  dismissible
                  @input="removeSocial(2, twitter.twitterPageId)"
                >
                  Twitter
                  <p class="social-subtitle m-0">
                    {{ twitter.name }}
                  </p>
                </b-alert>
                <span class="social-label">Seguidores</span><br>
                <span class="social-count">
                  {{ twitter.followerCount || 0 }}
                </span><br>
                <span class="social-label">Amigos</span><br>
                <span class="social-count">
                  {{ twitter.friendsCount || 0 }}
                </span>
              </b-col>
            </template>
            <template v-if="socials.youtubeChannels.length > 0">
              <b-col
                v-for="youtube in socials.youtubeChannels"
                :key="youtube.channelId"
                col class="col-4 mt-3 social py-2 mr-2"
              >
                <b-alert
                  class="tag social-title m-0 px-0"
                  variant="dark"
                  show
                  dismissible
                  @input="removeSocial(3, youtube.channelId)"
                >
                  Youtube
                  <p class="social-subtitle m-0">
                    {{ youtube.name }}
                  </p>
                </b-alert>
                <span class="social-label">Inscritos</span><br>
                <span class="social-count">
                  {{ youtube.subscriberCount || 0 }}
                </span><br>
                <span class="social-label">Visualizações</span><br>
                <span class="social-count">
                  {{ youtube.viewCount || 0 }}
                </span>
              </b-col>
            </template>
          </b-row>
        </div>
        <div class="painel bg-3">
          <b-row>
            <b-col col class="col-12 mt-3">
              <h5><b>Tags</b></h5>
              <b-button
                class="plus-btn"
                @click="showNewTag = !showNewTag"
              >
                {{ showNewTag ? '-' : '+' }}
              </b-button>
              <template v-if="showNewTag">
                <b-form-input
                  type="text"
                  required
                  v-model="newTag"
                  placeholder="Digite aqui sua nova tag"
                />
                <b-button class="btn-newTag" @click="createTag()">
                  Salvar
                </b-button>
              </template>
            </b-col>
          </b-row>
          <b-row class="socials">
            <b-col col class="col-4" v-for="tag in form.tags" :key="tag.id">
              <b-alert
                class="tag"
                variant="dark"
                show
                dismissible
                @input="removeTag(tag.id)"
              >
                {{ tag.name }}
              </b-alert>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  me,
  updateUserById,
  updateUserNickname,
  validatePhoneNumber
} from '~/business/services/profile-service';
import {
  createTagUser,
  deleteTagUser,
  userSocialNetworks,
  getAllOAuthUrl,
  authCreate,
  authDelete
} from '~/business/services/social-service';
import moment from 'moment';
import {
  userCivilStatusTypes,
  userSchoolingTypes,
  userGenderTypes,
  brStatesTypes
} from '~/business/enums';
import AwesomeMask from 'awesome-mask';
moment.locale('pt-BR');
import {
  isValidCPF,
  isValidCEP,
  isValidPhone
} from "@brazilian-utils/brazilian-utils";
import {
  makeToast
} from '~/business/services/utils';

export default {
  name: 'profile',
  layout: 'index',
  data: () => ({
    form: {
      name: "",
      email: "",
      avatar: null,
      password: null,
      info: {
        cpf: "",
        rg: "",
        birthDate: "",
        civilStatus: "",
        gender: "",
        schooling: "",
        phone: "",
        nickname: "",
        bio: ""
      },
      address: {
        country: "",
        postcode: "",
        state: "",
        city: "",
        street: "",
        number: "",
        neighborhood: "",
        additionalInfo: ""
      },
      tags: []
    },
    loading: false,
    userCivilStatusTypes,
    userSchoolingTypes,
    userGenderTypes,
    brStatesTypes,
    newTag: "", 
    showNewTag: false,
    logoPreview: {},
    socials: {
      facebookPages: [],
      instagramPages: [],
      twitterPages: [],
      youtubeChannels: []
    },
    showSocials: false,
    socialUrls: [],
    isValidCPF,
    isValidCEP,
    isValidPhone,
    searchedCEP: "",
    validationCode: null
  }),
  directives: {
    'mask': AwesomeMask
  },
  computed: {
    valid() {
      const f = this.form;
      return (!f.address.postcode || isValidCEP(f.address.postcode)) &&
        isValidPhone(f.info.phone) &&
        isValidCPF(f.info.cpf) &&
        f.name.length > 3;
    }
  },
  methods: {
    async updateData() {
      try {
        const data = await updateUserById(this.$apollo, {
          ...this.form,
          info: { ...this.form.info },
          address: { ...this.form.address }
        });
        if (data.id) {
          makeToast(this, "success", "Dados atualizados com sucesso!");
          await this.loadData(true);
          this.loading = false;
        }
      } catch (e) {}
    },
    async createTag() {
      try {
        this.showNewTag = false;
        await createTagUser(this.$apollo, this.newTag);
        this.newTag = "";
        await this.loadData(true);
      } finally {
        this.loading = false;
      }
    },
    async removeTag(id) {
      try {
        this.loading = true;
        await deleteTagUser(this.$apollo, id);
        this.loadData(true);
      } catch (e) {
        makeToast(this, "danger", e);
      } finally {
        this.loading = false;
      }
    },
    async loadData(refreshCache) {
      try {
        let myData = await me(this.$apollo, { refreshCache });
        myData.info.birthDate = moment(myData.info.birthDate)
          .format('YYYY-MM-DD');
        console.log(myData);
        this.form = {
          ...myData,
          info: myData.info,
          address: myData.address,
          tags: myData.tags
        };
        this.searchedCEP = ((myData.address || {}).postcode || '')
          .replace('-', '');
      } catch (e) {}
    },
    async onFileChange(el) {
      var f = el.target.files[0];
      var reader = new FileReader();
      reader.onload = (theFile => {
        return e => {
          this.form = {
            ...this.form,
            avatar: theFile.name,
            logo: theFile
          };
          this.logoPreview = {
            src: e.target.result,
            title: theFile.name
          };
        };
      })(f);
      if (!!f) {
        reader.readAsDataURL(f);
      }
    },
    callOAuth(i) {
      window.location = this.socialUrls[i];
    },
    async removeSocial(i, id) {
      try {
        this.loading = true;
        await authDelete[i](this.$apollo, id);
        const socials = await userSocialNetworks(this.$apollo, {
          refreshCache: true
        });
        this.socials = socials;
      } catch (e) {
        makeToast(this, "danger", e);
      } finally {
        this.loading = false;
      }
    },
    validNickName() {
      this.form.info.nickname = this.form.info.nickname
        .split(/[^0-9A-Za-z]/).join('');
    },
    async updateNickname() {
      try {
        await updateUserNickname(this.$apollo, this.form.info.nickname);
      } catch (e) {}
    },
    async getViaCEP() {
      const CEP = this.form.address.postcode.replace('-', '');
      if (isValidCEP(CEP) && this.searchedCEP !== CEP) {
        this.searchedCEP = CEP;
        this.loading = true;
        const res = (await (
          await fetch(`https://viacep.com.br/ws/${CEP}/json/`)
        ).json());
        this.loading = false;
        if (res.erro) {
          makeToast(this, "warning", "CEP não encontrado");
        } else {
          this.form.address = {
            ...this.form.address,
            state: res.uf || null,
            city: res.localidade || null,
            street: res.logradouro || null,
            neighborhood: res.bairro || null,
            additionalInfo: res.complemento || null
          }
        }
      }
    },
    async validateCode() {
      try {
        await validatePhoneNumber(
          this.$apollo,
          parseFloat(this.validationCode)
        );
        makeToast(this, 'success', 'Validado com sucesso!');
        this.loadData(true);
      } catch (e) {
      } finally {
        this.loading = false;
      }
    }
  },
  async mounted() {
    const route = this.$route;
    if (route.params.social && (route.query.code || route.query.oauth_token)) {
      try {
        if (!route.query.code) {
          await authCreate[route.params.social](this.$apollo, {
            oauthToken: route.query.oauth_token,
            oauthVerifier: route.query.oauth_verifier
          });
        } else {
          await authCreate[route.params.social](this.$apollo, {
            code: route.query.code
          });
        }
        this.$router.push("/profile");
      } catch (e) {}
    }
    try {
      await this.loadData();
      this.socials = await userSocialNetworks(this.$apollo);
      this.socialUrls = await getAllOAuthUrl(this.$apollo);
    } catch (e) {
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style>
.profile {
  font-family: "nunitoregular";
}
.form {
  font-size: 8px !important;
}
.form .submit {
  background: linear-gradient(78.69deg, #d94e96 3.07%, #d0458d 96.51%);
  border-radius: 5px;
  font-size: 12px;
  color: #ffffff;
  outline: none;
  border: 0;
  padding: 0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.38);
  padding: 10px 20px;
}
.profile .form-control,
.profile .custom-select {
  border: none;
  font-size: 11px;
  background-color: #f0f4f8;
}
.form-control:focus,
.custom-select:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(122, 53, 128, 0.3);
}
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #d84d95;
  background-color: #d84d95;
}
.custom-control-label::before {
  border: #d74c94 solid 1px;
}
.custom-control-input:not(:disabled):active ~ .custom-control-label::before {
  color: #fff;
  background-color: rgb(230, 138, 186);
  border-color: #ed87bc;
}
.custom-control-input:focus ~ .custom-control-label::before {
  box-shadow: 0 0 0 0.2rem rgba(215, 76, 148, 0.25);
}
.form .form-group {
  margin-bottom: 0.8rem;
}
.form .col-form-label {
  font-size: 11px;
  padding-bottom: 3px;
}

/*
.form input:focus + label,
.form input:active + label,
.form input:valid + label,
.form input.valid + label {
  font-size: 14px;
  color: #8a899b;
  top: -4px;
}
*/
.custom-radio span {
  vertical-align: sub;
}
form.loading > * {
  opacity: 0.3;
  pointer-events: none;
}

form .spinner {
  position: absolute;
  top: 71px;
  left: 0;
  width: 100%;
  margin: auto;
  text-align: center;
  z-index: 100;
  opacity: 0.6;
}

/* painel lateral */
.painel-lateral .painel {
  position: relative;
  border-radius: 0 0 30px 30px;
  margin-top: -30px;
  padding: 30px;
}

.painel-lateral .painel:first-child {
  margin-top: 0;
}

.bio {
  padding: 0;
  resize: none;
  margin-top: 10px;
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
  z-index: 1;
}
.plus-btn {
  top: 0;
  right: 30px;
  position: absolute;
  border-radius: 5px;
  font-size: 1.5rem;
  padding: 6px 3px;
  line-height: 0.6rem;
  color: #6a6a6a;
  background: white;
  border: none;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
  margin-top: 2px;
}
.socials {
  margin: 15px -15px;
}
.social-label {
  font-size: 10px;
}
.social-count {
  font-size: 15px;
}
.bio-url {
  font-size: 12px;
}
.tag {
  margin: 6px 0;
  padding: 2px 5px;
  border-radius: 10px;
  font-size: 12px;
  background: white;
}
.tag .close {
  padding: 0px 5px;
  font-size: 1.4rem;
}
.btn-newTag {
  float: right;
  padding: 0 5px;
}
.avatar {
  cursor: pointer;
  border-radius: 10px;
}
.social {
  background: white;
  border-radius: 10px;
  flex: 0 0 30%;
}
.social-title {
  color: #8f3a84;
  font-weight: bold;
  border: none;
  font-size: 14px;
  background: white;
}
.social-subtitle {
  font-size: 10px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>