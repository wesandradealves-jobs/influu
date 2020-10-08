<template>
	<div class="p-3" :class="tag">
		component
	</div>
</template>

<script>
export default {

  name: 'StatementFinalizado',

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