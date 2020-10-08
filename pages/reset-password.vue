<template>
  <div class="login">
    <b-row class="m-0">
      <b-col col cols="12" md="4" class="logo">
        <img src="~assets/img/logo-login.png" alt />
      </b-col>

      <b-col col cols="12" md="8" class="form">
        <div class="content">
          <h1 class="titulo">
            <span>{{ $t("resetPassword.resetPass") }}</span>
          </h1>
          <p class="texto">
            {{ $t("resetPassword.typeNewPassword") }}
          </p>

          <b-form
            action
            method="POST"
            @submit.prevent="resetPass"
            v-bind:class="{ loading: loading }"
          >
            <b-form-group id="input-group-1">
              <b-form-input
                id="input-1"
                type="password"
                v-model="form.password1"
                required
                :class="{ valid: form.password1 }"
              />
              <label for="input-1">
                {{ $t("resetPassword.newPassword") }}
              </label>
            </b-form-group>

            <div class="w-100 mt-4"></div>

            <b-form-group id="input-group-1">
              <b-form-input
                id="input-1"
                type="password"
                v-model="form.password2"
                required
                :class="{ valid: form.password2 }"
              />
              <label for="input-1">
                {{ $t("resetPassword.confirmPassword") }}
              </label>
            </b-form-group>

            <div class="spinner" v-if="loading">
              <b-spinner
                variant="secondary"
                style="width: 3rem; height: 3rem;"
                :label="$t('form.loading')"
              ></b-spinner>
            </div>

            <div class="w-100 mt-5"></div>
            <b-button :disabled="!valid"
              type="submit" variant="primary" class="float-right"
            >
              {{ $t("resetPassword.confirm") }}
            </b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { resetUserPassword } from "~/business/services/auth-service";
import { makeToast } from "~/business/services/utils";

export default {
  name: "reset-password",
  data: () => ({
    form: {
      password1: "",
      password2: ""
    },
    loading: false,
    token: ""
  }),
  computed: {
    valid() {
      const { password1, password2 } = this.form;
      return (
        (password1.length > 0 && password2.length > 0) &&
        password1 === password2
      );
    }
  },
  methods: {
    async resetPass() {
      try {
        const res = await resetUserPassword(this.$apollo, {
          ...this.form,
          token: this.token
        });

        makeToast(this, "success", res);
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
