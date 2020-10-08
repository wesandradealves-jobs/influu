<template>
  <div class="login">
    <!-- <b-container> -->
    <b-row class="m-0">
      <b-col col cols="12" md="4" class="logo">
        <!-- <div class="logo"> -->
        <img src="~assets/img/logo-login.png" alt />
        <!-- </div> -->
      </b-col>

      <b-col col cols="12" md="8" class="form">
        <!-- <div class="form"> -->
        <div class="content">
          <h1 class="titulo">
            {{ $t("login.welcome") }},
            <span>{{ $t("login.letsLogin") }}</span>
          </h1>
          <p class="texto">
            {{ $t("login.toConnect") }},
            <span>{{ $t("login.typeCredentials") }}</span>
          </p>

          <b-form
            action
            method="POST"
            @submit.prevent="login"
            v-bind:class="{ loading: loading }"
          >
            <b-form-group id="input-group-1">
              <b-form-input
                id="input-1"
                type="email"
                v-model="form.email"
                required
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

            <div class="w-100 mt-4"></div>

            <b-form-group id="input-group-2">
              <b-form-input
                id="input-2"
                type="password"
                v-model="form.password"
                required
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
              :to="localePath('/forgot-password')"
              class="float-left text-link"
            >
              {{ $t("login.forgotPassword") }} |
            </nuxt-link>
            <nuxt-link
              :to="localePath('/register')"
              class="float-left text-link ml-2"
            >
              {{ $t("login.noAccount") }}
            </nuxt-link>
            <b-button :disabled="!isValidEmail(form.email)"
              type="submit" variant="primary" class="float-right"
            >
              {{ $t("login.login") }}
            </b-button>
          </b-form>
        </div>
        <!-- </div> -->
      </b-col>
    </b-row>
    <!-- </b-container> -->
  </div>
</template>

<script>
import { login } from "~/business/services/auth-service";
import { isValidEmail } from "@brazilian-utils/brazilian-utils";
import { makeToast } from "~/business/services/utils";

export default {
  name: "login",
  data: () => ({
    form: {
      email: "",
      password: ""
    },
    loading: false,
    isValidEmail
  }),
  methods: {
    async login() {
      try {
        const res = await login(this.$apollo, { ...this.form });
        await this.$apolloHelpers.onLogin(res.accessToken);

        sessionStorage.setItem('accessToken', res.accessToken);

        this.$router.push(this.localePath("/"));
      } catch (e) {}
    }
  }
};
</script>

<style scoped>
@import "~/assets/CSS/auth.css";
</style>
