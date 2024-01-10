<template>
	<div id="tip-box" class="tip"></div>
</template>

<script lang="ts" setup>
	import Swal from 'sweetalert2'

	let timerEstimed = 5
	let timerInterval = 0

	const tip = useTips().sortData

	const showAlert = function () {
		// Use sweetalert2
		Swal.fire({
			title: `<h1 class="title-tips">Pulo do gato ${tip.id}</h1>`,
			icon: 'info',
			html: `<p class="text-tips">${tip.message}</p>
	        <p class="close-tips">Fechando em ${timerEstimed} segundos.</p>`,
			showCloseButton: true,
			showConfirmButton: false,
			timer: 5000,
			background: '#000000b8',
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading()
				timerInterval = window.setInterval(() => {
					const timerLeft = Swal.getTimerLeft()
					if (typeof timerLeft == 'number') {
						timerEstimed = Math.round(timerLeft / 1000)
					}

					Swal.update({
						html: `<p class="text-tips">${tip.message}</p><p class="close-tips">Fechando em ${timerEstimed} segundos.</p>`,
					})
				}, 100)
			},
			willClose: () => {
				clearInterval(timerInterval)
			},
		})
	}

	onMounted(() => {
		showAlert()
	})
</script>

<style>
	h1.title-tips {
		font-family: 'Encode Sans';
		font-weight: var(--font-semi-bold);
		color: var(--the-pratice-color);
	}
	p.text-tips {
		font-family: 'Encode Sans';
		font-weight: var(--font-regular);
		color: rgba(128, 128, 128, 1);
		text-align: center;
		padding: 30px 0 0 0;
		font-size: 1.2em;
	}
	p.close-tips {
		font-family: 'Encode Sans';
		font-weight: var(--font-light);

		text-align: end;
		padding: 40px 0 0 0;
		font-size: 0.7em;
	}

	.swal2-select {
		display: none !important;
	}
</style>
