<template>
  <div class="login">
    <b-row class="m-0">
      <b-col col cols="12" md="4" class="logo">
        <img src="~assets/img/logo-login.png" alt />
      </b-col>

      <b-col col cols="12" md="8" class="form">
        <vue-custom-scrollbar class="scroll-area"  :settings="settings">
          <div class="content">
            <h1 class="titulo">
              {{ $t("login.welcome") }}
            </h1>
            <p class="texto">
              {{ $t("register.toRegister") }},
              <span>{{ $t("register.typeData") }}</span>
            </p>

            <b-form
              action
              method="POST"
              @submit.prevent="register"
              v-bind:class="{ loading: loading }"
              autocomplete="new-password"
            >
              <b-form-group id="input-group-0">
                <label for="input-2">Quem você é?</label>

                <b-form-radio-group v-model="type" id="checkboxes-4">
                  <b-form-radio value="Influencer">Influencer</b-form-radio>
                  <b-form-radio value="Empresa">Empresa</b-form-radio>
                </b-form-radio-group>
              </b-form-group>

              <b-form-group id="input-group-2">
                <b-form-input
                  v-if="type !== 'Empresa'"
                  id="input-2"
                  type="text"
                  v-model="form.name"
                  required
                />
                <b-form-input
                  v-else
                  id="input-2"
                  type="text"
                  v-model="company_form.name"
                  required
                />                
                <label for="input-2">{{ (type === 'Empresa') ? $t("form.company") : $t("form.name") }}</label>
                <small
                  v-if="!!form.name && form.name.length < 4"
                  class="text-danger"
                >
                  {{ $t("invalid.name") }}
                </small>
              </b-form-group>

              <b-form-checkbox class="mt-3 mb-3" v-if="type === 'Empresa'" v-model="company_form.isAgency" switch>
                {{ $t("form.isAgency") }}
              </b-form-checkbox>   

              <b-form-group v-if="type === 'Empresa'" id="input-group-2">
                <b-form-input
                  id="input-2"
                  type="text"
                  v-model="company_form.user.name"
                  required
                />
                <label for="input-2">{{ $t("form.nameResponsible") }}</label>
                <small
                  v-if="!!company_form.user.name && company_form.user.name.length < 4"
                  class="text-danger"
                >
                  {{ $t("invalid.nameResponsible") }}
                </small>
              </b-form-group>                                 

              <b-form-group v-if="type === 'Empresa'" id="input-group-2">
                <b-form-input
                  id="input-2"
                  type="tel"
                  v-mask="'999.999.999-99'"
                  v-model="company_form.cpfResponsible"
                  required
                />
                <label for="input-2">{{ $t("form.cpfResponsible") }}</label>
                <small
                  v-if="!!company_form.cpfResponsible && company_form.cpfResponsible.length < 11"
                  class="text-danger"
                >
                  {{ $t("invalid.cpfResponsible") }}
                </small>
              </b-form-group>                                 

              <b-form-group v-if="type === 'Empresa'" id="input-group-2">
                <b-form-input
                  id="input-2"
                  type="tel"
                  v-model="company_form.phones"
                  v-mask="'(99) 99999-9999'"
                  required
                />
                <label for="input-2">{{ $t("form.phones") }}</label>
                <small
                  v-if="!!company_form.phones && company_form.phones.length < 8"
                  class="text-danger"
                >
                  {{ $t("invalid.phones") }}
                </small>
              </b-form-group>    

              <b-form-group id="input-group-1">
                <b-form-input
                  id="input-1"
                  type="email"
                  v-model="form.email"
                  required
                  autocomplete="new-password"
                />
                <label for="input-1">{{ $t("form.email") }}</label>
                <small
                  v-if="form.email.length > 0 ? !isValidEmail(form.email) : false"
                  class="text-danger"
                >
                  {{ $t("invalid.email") }}
                </small>
                <img @click="form.email = ''" src="~assets/img/close.svg" alt title="Limpar" class="btn-reset">
              </b-form-group>

              <b-form-group id="input-group-2">
                <b-form-input
                  id="input-2"
                  type="password"
                  v-model="form.password"
                  required
                  autocomplete="new-password"
                />
                <label for="input-2">{{ $t("form.password") }}</label>
              </b-form-group>

              <div class="spinner" v-if="loading">
                <b-spinner
                  variant="secondary"
                  style="width: 3rem; height: 3rem;"
                  :label="$t('form.loading')"
                />
              </div>

              <div class="w-100 mt-5"></div>

              <nuxt-link
                :to="localePath('/login')"
                class="float-left text-link"
              >
                {{ $t('login.back') }}
              </nuxt-link>
              <b-button
                type="submit" variant="primary" class="float-right mb-5"
              >
                {{ $t("register.register") }}
              </b-button>
            </b-form>
          </div>
        </vue-custom-scrollbar>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { createInfluencer } from "~/business/services/auth-service";
import { createCompany } from "~/business/services/auth-service";
import { isValidEmail } from "@brazilian-utils/brazilian-utils";
import { makeToast } from "~/business/services/utils";
import AwesomeMask from 'awesome-mask'
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  name: "register-influencer",
  components: {
    vueCustomScrollbar
  },  
  directives: {
    'mask': AwesomeMask
  },  
  data: () => ({
    settings: {
      maxScrollbarLength: 60
    },    
    type: "Influencer",
    form: {
      name: "",
      email: "",
      password: "",
      avatar: null
    },
    company_form: {
      name: "",
      email: "",      
      cpfResponsible: "",
      phones: "",      
      isAgency: false,
      user: {
        name: "",
        email: "",
        password: "",
      }
    },
    loading: false,
    isValidEmail
  }),
  watch: {
    name (name) {
      if(name)
        this.company_form.user.name = name
    },    
    password (password) {
      if(password)
        this.company_form.user.password = password
    },     
    company (company) {
      if(company)
        this.company_form.user.name = company
    },    
    email (email) {
      if(email)
        this.company_form.user.email = this.company_form.email = email
    }
  },
  computed: {
    name () {
      return this.form.name
    },    
    password () {
      return this.form.password
    },      
    company () {
      return this.company_form.name
    },    
    email () {
      return this.form.email
    }
  },  
  methods: {
    async register() {
      try {
        if(this.type !== 'Empresa') {
          console.log(this.form)
          await createInfluencer(this.$apollo, { ...this.form });
        } else {
          console.log(this.company_form)

          this.company_form.cpfResponsible = this.company_form.cpfResponsible.replace(/[^a-zA-Z0-9]/g,'')
          this.company_form.phones = this.company_form.phones.replace(/[^a-zA-Z0-9]/g,'')

          await createCompany(this.$apollo, { ...this.company_form });
        }

        makeToast(this, "success", "Conta criada! Digite seus dados para entrar!");
        setTimeout(() => {
          this.$router.push(this.localePath("/login"));
        }, 2000);
      } catch (e) {}
    }
  }
};
</script>

<style scoped>
@import "~/assets/CSS/auth.css";
</style>
