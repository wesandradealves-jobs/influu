<template>
	<div class="p-3" :class="tag">
		{{myInvoice}}
	</div>
</template>

<script>
export default {

  name: 'StatementProcessoDePagamento',
  props: ['myInvoice'],
  data () {
    return {

    }
  },
  computed: {
  	tag() {
  		return this.$vnode.tag
  	}
  }
}
</script>

<style lang="css" scoped>
</style>