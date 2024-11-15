<template>
	<div
		class="box-title container-fluid d-flex justify-content-center align-items-center"
	>
		<div
			class="row text-center justify-content-center align-items-center border-10"
			:class="outboxColor"
		>
			<div class="col">
				<div class="boxes outbox">
					<div
						class="boxes inbox d-flex align-items-center border-10"
						:class="inboxColor"
					>
						<div v-if="props.box.leftLogo" class="px-1 left-logo">
							<img
								class="img img-fluid icon"
								:src="icon.url"
								:alt="icon.altText"
							/>
						</div>
						<div v-html="props.box.content" class="center-box" />
						<div v-if="props.box.rightLogo" class="px-1 right-logo">
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
	import lightCordariaIcon from '@/assets/imgs/logos/light-cordaria-icon.png'
	import darkCordariaIcon from '@/assets/imgs/logos/dark-cordaria-icon.png'

	import type { Box } from '~/types/Box'

	onBeforeMount(() => {
		icon.value.url = updateIcon(value.value)
	})

	const { value } = toRefs(useColorMode())

	onMounted(() => {
		applySchema()
	})

	watch(value, async (newValue) => {
		icon.value.url = await updateIcon(newValue)
	})

	function updateIcon(theme: string) {
		return theme === 'dark' ? darkCordariaIcon : lightCordariaIcon
	}

	const props = defineProps({
		box: {
			type: Object as PropType<Box>,
			required: true,
		},
	})

	const inboxColor = ref('')
	const outboxColor = ref('')
	const icon = ref({
		url: '',
		altText: 'Inicie agora',
	})

	function applySchema() {
		switch (props.box.schema) {
			case 'index':
				inboxColor.value = 'inbox-index'
				outboxColor.value = 'outbox-index'
				break
			case 'green':
				inboxColor.value = 'inbox-green'
				outboxColor.value = 'outbox-green'
				break
			case 'red':
				inboxColor.value = 'inbox-red'
				outboxColor.value = 'outbox-red'
				break
			default:
		}
	}
</script>

<style scoped>
	.box-title {
		cursor: pointer;
	}

	.inbox {
		padding: 4px 25px;
		color: var(--color-white-50);
	}

	.inbox:hover {
		color: var(--color-white);
	}

	.outbox {
		padding: 0px 10px;
	}

	.border-10 {
		border-radius: 10px;
	}

	.inbox-index {
		background-color: var(--bg-title-box-in);
	}

	.outbox-index {
		background-color: var(--bg-title-box-out);
	}

	.inbox-green {
		background-color: rgba(0, 128, 0, 0.5);
	}

	.outbox-green {
		background-color: rgba(0, 128, 0, 0.2);
	}

	.inbox-green:hover,
	.outbox-green:hover {
		background-color: rgba(0, 128, 0, 1);
	}

	.outbox-green:hover {
		background-color: rgba(0, 128, 0, 1);
	}

	.inbox-red {
		background-color: rgba(255, 0, 0, 0.5);
	}

	.outbox-red {
		background-color: rgba(255, 0, 0, 0.2);
	}

	.inbox-red:hover,
	.outbox-red:hover {
		background-color: rgba(255, 0, 0, 1);
	}

	.icon {
		width: 50px;
	}
</style>
