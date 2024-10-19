<template>
	<div>
		<!-- <InstrumentsSelectorMainCarousel /> -->
		<InstrumentsSelectorMain />
	</div>
</template>

<script lang="ts" setup>
	onBeforeMount(async () => {
		await loadSettings()
	})

	const instrument = ref()

	async function loadSettings() {
		const { getSession } = useAuth()
		const { user } = await getSession()

		if (user) {
			const { setId, setUserName, logIn } = useMyUserStore()
			// @ts-ignore
			setId(user._id)
			// @ts-ignore
			setUserName(user?.username)
			logIn()

			await useMySettingsStore().load()
		}
	}
</script>

<style></style>
