<template>
	<div id="tip-box" class="tip" />
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2'
import type { LessonMessage } from '~/types/LessonMessage'
import AwardIcon1 from '~/assets/imgs/awards/big/award-1.png'
import AwardIcon2 from '~/assets/imgs/awards/big/award-2.png'
import AwardIcon3 from '~/assets/imgs/awards/big/award-3.png'
import AwardIcon4 from '~/assets/imgs/awards/big/award-4.png'
import AwardIcon5 from '~/assets/imgs/awards/big/award-5.png'
import AwardIcon6 from '~/assets/imgs/awards/big/award-6.png'
import AwardIcon7 from '~/assets/imgs/awards/big/award-7.png'
import AwardIcon8 from '~/assets/imgs/awards/big/award-8.png'

import JSConfetti from 'js-confetti'

const { value } = useColorMode()

const bg = value === 'dark' ? '#000000b8' : '#e3e0d9e6'

let timerEstimedInSeconds = 10
const timerEstimedInMiliSeconds = timerEstimedInSeconds * 1000
let timerInterval = 0

const awardIcon = ref()
const iconHtml = ref()
const icon = ref()

const confetti = ref()
confetti.value = new JSConfetti()

/**
 * Displays an alert with confetti and award icon if applicable.
 * 
 * @param {LessonMessage} data - The data object containing information for the alert.
 * @param {boolean} data.isAwarded - Indicates if an award is given.
 * @param {number} data.awardNumber - The number of the award.
 * @param {string} data.icon - The icon to be displayed if no award is given.
 * @param {string} data.title - The title of the alert.
 * @param {string} data.description - The description of the alert.
 * 
 * @returns {Promise<void>} - A promise that resolves when the alert is shown.
 */
async function showAlert(data: LessonMessage) {
	if (data.isAwarded) {
		confetti.value
			.addConfetti({
				confettiRadius: 3,
				confettiNumber: 500,
			})
			.then(() => {
				confetti.value.clearCanvas()
			})
	}

	if (data.isAwarded) {
		switch (data.awardNumber) {
			case 1:
				awardIcon.value = AwardIcon1
				break
			case 2:
				awardIcon.value = AwardIcon2
				break
			case 3:
				awardIcon.value = AwardIcon3
				break
			case 4:
				awardIcon.value = AwardIcon4
				break
			case 5:
				awardIcon.value = AwardIcon5
				break
			case 6:
				awardIcon.value = AwardIcon6
				break
			case 7:
				awardIcon.value = AwardIcon7
				break
			case 8:
				awardIcon.value = AwardIcon8
				break

			default:
				awardIcon.value = null
				icon.value = null
				break
		}

		iconHtml.value = `<img src="${awardIcon.value}" alt="ícone do ${data.awardNumber}º troféu" class="big-award-icon d-flex justify-self-center"/>`
	} else {
		iconHtml.value = null
		icon.value = data.icon
	}

	/**
	 * Displays a SweetAlert2 modal with custom content and a countdown timer.
	 * 
	 * @param {Object} data - The data object containing the title and description for the modal.
	 * @param {string} data.title - The title to be displayed in the modal.
	 * @param {string} data.description - The description to be displayed in the modal.
	 * @param {Object} iconHtml - The HTML content for the icon.
	 * @param {Object} icon - The icon type for the modal.
	 * @param {number} timerEstimedInSeconds - The initial countdown time in seconds.
	 * @param {number} timerEstimedInMiliSeconds - The initial countdown time in milliseconds.
	 * @param {string} bg - The background color for the modal.
	 * 
	 * The modal will display a title, description, and a countdown timer that updates every 200 milliseconds.
	 * The modal will automatically close when the timer reaches zero.
	 * The timer progress bar is displayed at the bottom of the modal.
	 * The modal shows a loading animation while the timer is running.
	 * The interval for updating the countdown timer is cleared when the modal is closed.
	 */
	Swal.fire({
		animation: false,
		title: `<h1 class="title-tips">${data.title}</h1>`,
		iconHtml: iconHtml.value,
		icon: icon.value,
		html: `<p class="text-tips">${data.description}</p>
	        <p class="close-tips">Fechando em ${timerEstimedInSeconds} segundos.</p>`,
		showCloseButton: true,
		showConfirmButton: false,
		timer: timerEstimedInMiliSeconds,
		background: bg,
		timerProgressBar: true,
		didOpen: () => {
			Swal.showLoading()
			timerInterval = window.setInterval(() => {
				const timerLeft = Swal.getTimerLeft()
				if (typeof timerLeft == 'number') {
					timerEstimedInSeconds = Math.round(timerLeft / 1000)
				}

				Swal.update({
					html: `<p class="text-tips">${data.description}</p><p class="close-tips">Fechando em ${timerEstimedInSeconds} segundos.</p>`,
				})
			}, 200)
		},
		willClose: () => {
			clearInterval(timerInterval)
		},
	})
}

defineExpose({ showAlert })
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

.big-award-icon {
	width: 130%;
}

.swal2-icon,
.swal2-icon-content {
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	border: none;
}

canvas {
	border: none;
}
</style>
