<template>
	<div class="p-3" :class="tag">
		<p class="m-0">
			<b>INFLUU DO BRASIL LTDA</b><br/>
			<b>Endereço</b><br/>
			Rua Teodoro Sampaio, 1020 - Vila Madalena - São Paulo/SP <br/>	
			<b>CNPJ</b><br/>
			019283.9381093-0001<br/>					
			<b>Valor</b><br/>
			R$ {{statement.value}}		
		</p>		
	</div>
</template>

<script>
export default {

  name: 'StatementDados',
  props: ['statement'],
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