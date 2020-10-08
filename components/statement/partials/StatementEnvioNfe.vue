<template>
	<div class="p-3" :class="tag">
		<vue-dropzone 
			@vdropzone-success="success" 
			id="upload_dropzone" ref="upload_dropzone" 
			:options="dropzoneOptions"></vue-dropzone>
	</div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { updateInfluencerCampaignInvoice } from '~/business/services/wallet-service';

export default {

  name: 'StatementEnvioNfe',
  props: ['statement'],
  computed: {
  	tag() {
  		return this.$vnode.tag
  	}
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  mounted() {
  	if(this.statement.campaignInfluencer)
  		this.CampaignInfluencer = this.statement.campaignInfluencer
  },
  methods: {
  	async success(file, response){
        const res = await updateInfluencerCampaignInvoice(this.$apollo, {
			campaignInfluencerId: this.statement.campaignInfluencer.id,
			invoice: file
        });	

    	this.$emit('setInvoice', res);
	}
  },
  data: function () {
    return {
      CampaignInfluencer: [],
      file: '',
      form: {},
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 0,
          maxFiles: 1,
          addRemoveLinks: true,
          dictDefaultMessage: "<i class='fa fa-file-text-o' aria-hidden='true'></i> <span>Arraste e solte ou <span>clique aqui</span> para selecionar</span>",
          maxFilesize: 1
      }
    }
  }  
}
</script>

<style lang="sass">
	@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css")

	[class*="StatementEnvioNfe"]
		background: transparent!important
		box-shadow: initial!important
		padding: 0!important
	.vue-dropzone
		padding: 0
		border: 0!important
		background: none!important
		display: flex 
		flex-flow: column 
		justify-content: center 
		align-items: center
		.dz-default.dz-message
			display: block !important
			padding: 0
			margin: 0
			color: #555555
			background: rgba(251, 252, 254, 0.7)
			border: 2px dashed #9296AA
			box-sizing: border-box
			border-radius: 5px
			padding: 18px 22px
			font-size: .8rem
			> span 
				display: flex 
				flex-flow: row 
				justify-content: space-between
				aling-items: center
				[class*='fa-']
					color: #DADADA
					flex: 0 0 auto 
					padding-right: 12px
					&::before
						font-size: 21px				
				> span 
					overflow: hidden 
					text-overflow: ellipsis
					white-space: nowrap
					line-height: 2
					span 
						flex: 1
						text-decoration: underline
						color: #F183AA
		.dz-preview
			margin: 0 
			padding: 0
			width: 100%
			.dz-progress
				top: 0
				opacity: 1!important
				width: 100%
				left: 0
				position: relative
				margin: 0		
				background: #D3D5DE
				height: 6px
				.dz-upload 
					background: #F183AA					
			.dz-image
				display: none
			.dz-details
				line-height: initial
				background: none
				height: auto
				min-height: initial
				position: relative
				color: #555555
				padding: 40px 0 10px
				.dz-size
					position: absolute
					bottom: -35px
					left: 0
					padding: 0
					font-size: .7rem				
				.dz-filename
					padding-left: 20px
					background: url(../../../assets/img/file.png) 0 center / auto no-repeat transparent
			.dz-remove
				opacity: 1
				bottom: 0		
				margin: 0
				position: absolute
				right: 0
				top: calc(50% - 10px)				
				height: 15px
				padding: 0
				width: 15px 
				border: 0
				overflow: hidden 
				text-indent: 999px
				background: url(../../../assets/img/clear_24px.svg) center center / contain no-repeat transparent
</style>