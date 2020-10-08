<template>
  <div class="login">
    <b-row class="m-0">
      <b-col col cols="12" md="4" class="logo">
        <img src="~assets/img/logo-login.png" alt />
      </b-col>

      <b-col col cols="12" md="8" class="form">
        <div class="content">
          <h1 class="titulo">
            <span>{{ $t('validate.title') }}</span>
          </h1>
          <p class="texto">
            {{ $t('validate.typeEmail') }}
          </p>

          <b-form
            action
            method="POST"
            @submit.prevent="validateUser"
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

            <div class="spinner" v-if="loading">
              <b-spinner
                variant="secondary"
                style="width: 3rem; height: 3rem;"
                :label="$t('form.loading')"
              ></b-spinner>
            </div>

            <div class="w-100 mt-5"></div>
            <b-button :disabled="!isValidEmail(form.email)"
              type="submit" variant="primary" class="float-right"
            >
              {{ $t("validate.confirm") }}
            </b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { validateUser } from "~/business/services/auth-service";
import { makeToast } from "~/business/services/utils";
import { isValidEmail } from "@brazilian-utils/brazilian-utils";

export default {
  name: "validate-password",
  data: () => ({
    form: {
      email: ""
    },
    loading: false,
    token: "",
    isValidEmail
  }),
  methods: {
    async validateUser() {
      try {
        await validateUser(this.$apollo, {
          ...this.form,
          token: this.token
        });

        makeToast(this, "success", "Validado com sucesso!");
        setTimeout(() => {
          this.$router.push(this.localePath("/login"));
        }, 2000);
      } catch (e) {}
    }
  },
  mounted() {
    this.token = this.$route.query.token;
    if (!this.token) {
      this.$router.push(this.localePath("/"));
    }
  }
};
</script>

<style scoped>
@import "~/assets/CSS/auth.css";
</style>
