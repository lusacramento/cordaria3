<template>
	<div class="container-fluid">
		<LayoutsHeader>
			<template #center>
				<div class="d-flex justify-content-center align-items-center">
					<LayoutsBox :box="box" />
				</div>
			</template>
		</LayoutsHeader>
		<div class="container content">
			<CarouselTutorial :slides="slides"></CarouselTutorial>
		</div>
	</div>
</template>

<script lang="ts" setup>
useHead({
	title: 'Cordaria - Tutorial',
	meta: [
		{
			hid: 'titleddicas',
			name: 'title',
			content: 'Tutorial do Cordaria App',
		},
		{
			hid: 'dicas',
			name: 'description',
			content:
				'Tutorial para utilização do aplicativo Cordaria App',
		},
	],
	link: [
		{
			rel: 'canonical',
			href: 'https://cordaria.com.br/dicas',
		},
		{
			hid: 'dicaskeys',
		},
	],
})

const box = {
	content: '<h1>TUTORIAL<h1>',
	schema: 'index',
}

import SelectingInstrument from '~/components/tutorial/SelectingInstrument.vue'
import SelectingShowMode from '~/components/tutorial/selectingShowMode.vue'
import SelectingCounter from '~/components/tutorial/SelectingCounter.vue'
import StartingLesson from '~/components/tutorial/StartingLesson.vue'

const slides = [
	{
		id: 0,
		class: 'active',
		src: 'https://www.youtube.com/embed/4YK9VYyKFaY?si=hLSuHrNfl8PI-1ii&amp;controls=0',
		component: SelectingInstrument,
	},
	{
		id: 1,
		class: '',
		src: 'https://www.youtube.com/embed/4P6sUNVp9LQ?si=XuZjl6nDAP3aHWbj&amp;controls=0',
		component: SelectingShowMode,
	},
	{
		id: 2,
		class: '',
		src: 'https://www.youtube.com/embed/widHuZ3Xmb8?si=n9zAzW9WIlFjj6Ej&amp;controls=0',
		component: SelectingCounter,
	},
	{
		id: 3,
		class: '',
		title: 'Cordaria - Tutorial',
		src: 'https://www.youtube.com/embed/1VVFAMZ3QBA?si=_tVLOWOUHI1j993_&amp;controls=0',
		component: StartingLesson,
	},
]
</script>
