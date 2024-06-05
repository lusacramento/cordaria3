<template>
	<div id="ranking" class="ranking">
		<div class="container-fluid">
			<LayoutsHeader :title="title" />
		</div>
		<div class="container layer-center">
            <table class="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Usuário</th>
      <th scope="col">Troféus</th>
      <th scope="col">Pontos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>576</td>
      <td>328</td>
      <td>@102</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
		</div>
	</div>
</template>

<script>
	import Box from '@/components/box/Box.vue'

	export default {
		components: { Box },

		data() {
			return {
				title: 'RANQUEAMENTO',
			}
		},
		head() {
			return {
				title: 'Cordaria - Ranqueamento',
							
            }
		},
	}
</script>

<style scoped>
	a {
		font-size: 1.5em !important;
	}
	#ranking {
		text-align: center;
	}

	.large-line-height {
		line-height: 1.7;
	}
</style>
