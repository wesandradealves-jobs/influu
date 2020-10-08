<template>
  <div class="login">
    <b-row class="m-0">
      <b-col col cols="12" md="4" class="logo">
        <img src="~assets/img/logo-login.png" alt />
      </b-col>

      <b-col col cols="12" md="8" class="form">
        <div class="content">
          <h1 class="titulo">
            <span>{{ $t("recoverPassword.recoverPass") }}</span>
          </h1>
          <p class="texto">
            {{ $t("recoverPassword.typeEmail") }}
          </p>

          <b-form
            action
            method="POST"
            @submit.prevent="recoverPass"
            v-bind:class="{ loading: loading }"
          >
            <b-form-group id="input-group-1">
              <b-form-input
                id="input-1"
                type="email"
                v-model="form.email"
                required
                :class="{ valid: form.email }"
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
            <b-button :disabled="!isValidEmail(form.email)"
              type="submit" variant="primary" class="float-right"
            >
              {{ $t("recoverPassword.recover") }}
            </b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { sendForgotPasswordEmail } from "~/business/services/auth-service";
import { isValidEmail } from "@brazilian-utils/brazilian-utils";
import { makeToast } from "~/business/services/utils";

export default {
  name: "forgot-password",
  data: () => ({
    form: {
      email: ""
    },
    loading: false,
    isValidEmail
  }),
  methods: {
    async recoverPass() {
      try {
        await sendForgotPasswordEmail(this.$apollo, {
          ...this.form
        });

        makeToast(this, "success", "Link para criar nova senha enviado ao email!");
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
