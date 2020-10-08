<template>
  <b-col>
    <p cols="12" class="copyright text-center pt-3 pb-3">
      Copyright &copy;
      <strong>influu.me 2019</strong>
      {{
        $t('footer.rights')
      }} |
      <a
        v-if="$i18n.locale === 'en'"
        :href="switchLocalePath('br')"
        class="footer-link"
      >
        {{ $t('links.br') }}
      </a>
      <a
        v-else
        :href="switchLocalePath('en')"
        class="footer-link"
      >
        {{ $t('links.en') }}
      </a>
    </p>
  </b-col>
</template>

<style scoped>
.copyright {
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
  color: #ffffff;
}

.footer-link {
  color: aquamarine;
}

.footer-link:hover {
  color: #9efbff;
}
</style>