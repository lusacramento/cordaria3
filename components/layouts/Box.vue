<template>
	<div
		class="box-title container-fluid d-flex justify-content-center align-items-center"
	>
		<div
			class="row text-center justify-content-center align-items-center border-10"
			:class="outboxColor"
		>
			<div class="col">
				<div
					class="boxes outbox"
					@mouseover="icon.url = imageMouseOver(icon)"
					@mouseleave="icon.url = imageMouseLeave(icon)"
				>
					<div
						class="boxes inbox d-flex align-items-center border-10"
						:class="inboxColor"
					>
						<div v-if="props.leftLogo" class="px-1">
							<img
								class="img img-fluid icon"
								:src="icon.url"
								:alt="icon.altText"
							/>
						</div>
						<div v-html="props.titleText" />
						<div v-if="props.rightLogo" class="px-1">
							<img
								class="img img-fluid icon"
								:src="icon.url"
								:alt="icon.altText"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import iconCordariaEnabled from '@/assets/imgs/icone-cordaria-enabled.png'
	import iconCordariaDisabled from '@/assets/imgs/icone-cordaria-disabled.png'
	import lightCordariaIcon from '@/assets/imgs/logos/light-cordaria-icon.png'
	import darkCordariaIcon from '@/assets/imgs/logos/dark-cordaria-icon.png'

	onBeforeMount(() => {
		const iconTheme = updateIcon(value.value)
		icon.value.url =
			useRoute().name === 'index' ? iconTheme : iconCordariaDisabled
	})

	const { value } = toRefs(useColorMode())

	onMounted(() => {
		applySchema()
	})

	watch(value, async (newValue) => {
		console.log('trocou o thema: ', newValue)
		icon.value.url = await updateIcon(newValue)
	})

	function updateIcon(theme: string) {
		return theme === 'dark' ? darkCordariaIcon : lightCordariaIcon
	}

	const props = defineProps({
		titleText: {
			type: String,
			required: true,
		},
		schema: {
			type: String,
			required: true,
		},
		leftLogo: {
			type: Boolean,
			required: false,
		},
		rightLogo: {
			type: Boolean,
			required: false,
		},
	})

	const inboxColor = ref('')
	const outboxColor = ref('')
	const icon = ref({
		url: '',
		altText: 'Inicie agora',
		enabled: iconCordariaEnabled,
		disabled: iconCordariaDisabled,
	})

	function applySchema() {
		switch (props.schema) {
			case 'the-project':
				inboxColor.value = 'inbox-project'
				outboxColor.value = 'outbox-project'
				break
			case 'the-tutorial':
				inboxColor.value = 'inbox-tutorial'
				outboxColor.value = 'outbox-tutorial'
				break
			case 'the-pratice':
				inboxColor.value = 'inbox-pratice'
				outboxColor.value = 'outbox-pratice'
				break
			case 'the-research':
				inboxColor.value = 'inbox-research'
				outboxColor.value = 'outbox-research'
				break
			case 'index':
				inboxColor.value = 'inbox-index'
				outboxColor.value = 'outbox-index'
			default:
		}
	}

	function imageMouseOver(img: any) {
		return img.enabled
	}

	function imageMouseLeave(img: any) {
		return img.disabled
	}
</script>

<style scoped>
	.box-title {
		cursor: pointer;
	}
	a {
		font-size: 1.5em !important;
	}

	.inbox {
		padding: 4px 25px;
		color: var(--font-color-h2) !important;
	}
	.inbox:hover {
		background-color: rgba(0, 0, 0, 0.05);
		color: var(--font-color-hover) !important;
	}

	.outbox {
		padding: 0px 10px;
	}

	.border-10 {
		border-radius: 10px;
	}

	.inbox-project {
		background-color: var(--the-project-inbox);
	}

	.outbox-project {
		background-color: var(--the-project-outbox);
	}

	.inbox-tutorial {
		background-color: var(--the-tutorial-inbox);
	}

	.outbox-tutorial {
		background-color: var(--the-tutorial-outbox);
	}

	.inbox-pratice {
		background-color: var(--bg-title-box-in);
	}

	.outbox-pratice {
		background-color: var(--the-pratice-outbox);
	}

	.inbox-research {
		background-color: var(--the-research-inbox);
	}

	.outbox-research {
		background-color: var(--the-research-outbox);
	}

	.inbox-index {
		background-color: var(--bg-title-box-in);
	}

	.outbox-index {
		background-color: var(--bg-title-box-out);
	}

	.icon {
		width: 50px;
	}
</style>
