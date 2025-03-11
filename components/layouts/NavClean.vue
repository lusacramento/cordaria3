<template>
	<nav class="navbar navbar-expand-lg d-flex container-fluid justify-content-center">
		<div class="col-11 col-lg-4 d-flex justify-content-between justify-content-lg-center">
			<NuxtLink id="home-link" to="/" aria-current="page" class="navbar-brand logo-cordaria">
				<img :src="icons.cordaria.url" :alt="icons.cordaria.altText" class="img"
					@mouseover="icons.cordaria.url = icons.cordaria.toLight()"
					@mouseleave="icons.cordaria.url = icons.cordaria.toDark()" />
			</NuxtLink>
			<button class="navbar-toggler" :class="{ 'custom-toggler': isDarkMode }" type="button"
				data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon" :class="{ 'custom-toggler-icon': isDarkMode }"></span>
			</button>
		</div>
		<div class="col-8 d-flex align-items-center">
			<div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
				<ul class="navbar-nav mb-2 mb-lg-0 d-flex justify-content-end">

					<li class="nav-item mx-lg-4 mx-2 my-2 my-lg-0 d-flex align-items-center">
						<LayoutsColorModePicker />
					</li>
					<li class="nav-item">
						<a class="nav-link email-link" :href="icons.email.href" :rel="icons.email.rel">
							<img class="img img-fluid" :src="icons.email.url" :alt="icons.email.altText"
								@mouseover="icons.email.url = icons.email.toLight()"
								@mouseleave="icons.email.url = icons.email.toDark()" />
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link insta-link" href="https://instagram.com/cordaria.app" target="_blank"
							:rel="icons.insta.rel">
							<img class="img img-fluid" :src="icons.insta.url" :alt="icons.insta.altText"
								@mouseover="icons.insta.url = icons.insta.toLight()"
								@mouseleave="icons.insta.url = icons.insta.toDark()" />
						</a>
					</li>
				</ul>
				<ul></ul>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
import cordariaIconDisabled from '@/assets/imgs/logo-cordaria-disabled.png'
import cordariaIconEnabled from '@/assets/imgs/logo-cordaria-enabled.png'

import emailIconDisabled from '@/assets/imgs/email-icon-disabled.png'
import emailIconEnabled from '@/assets/imgs/email-icon-enabled.png'

import instaIconDisabled from '@/assets/imgs/logo-insta-disabled.png'
import instaIconEnabled from '@/assets/imgs/logo-insta-enabled.png'

const { value } = toRefs(useColorMode())

const isDarkMode = ref()

onBeforeMount(() => {
	isDarkMode.value = verifyColorMode(value.value)
})

/**
 * Watches the 'value' property for changes and updates the 'isDarkMode' state
 * based on the result of the 'verifyColorMode' function.
 *
 * @param {Ref} value - A Vue ref object that is being watched for changes.
 * @param {Function} verifyColorMode - A function that determines if the color mode is dark.
 * @param {Ref} isDarkMode - A Vue ref object that holds the state of the dark mode.
 * @param {any} newValue - The new value of the 'value' property after the change.
 */
watch(value, (newValue) => {
	isDarkMode.value = verifyColorMode(value.value)
})

/**
 * Verifies if the provided color mode is 'dark'.
 *
 * @param {string} modeColor - The color mode to verify.
 * @returns {boolean} - Returns true if the color mode is 'dark', otherwise false.
 */
function verifyColorMode(modeColor: string) {
	return modeColor === 'dark' ? true : false
}

const icons = {
	cordaria: reactive({
		url: cordariaIconDisabled,
		altText: 'Logotipo do Cordaria',
		toLight: () => cordariaIconEnabled,
		toDark: () => cordariaIconDisabled,
	}),

	email: reactive({
		href: 'mailto:cordaria.app@gmail.com',
		rel: 'nofollow',
		url: emailIconDisabled,
		altText: 'Ícone contato',
		toLight: () => emailIconEnabled,
		toDark: () => emailIconDisabled,
	}),

	insta: reactive({
		url: instaIconDisabled,
		rel: 'nofollow',
		altText: 'Ícone Instagram',
		toLight: () => instaIconEnabled,
		toDark: () => instaIconDisabled,
	}),
}
</script>

<style scoped>
.nav {
	font-size: var(--font-size-nav);
	font-family: var(--font-semibold);
	margin-left: 5px;
	margin-right: 5px;
}

.collapseColor {
	background-color: var(--bg-nav-collapse) !important;
	display: block;
	padding: 10px;
	width: 200px !important;
	border-radius: 15pt;
	color: rgba(255, 255, 255, 1) !important;
}

.nav-link {
	color: var(--font-color-nav) !important;
	margin: 0 10px;
	font-size: var(--font-size-nav);
}

.navbar-toggler {
	justify-content: end;
	color: aliceblue !important;
}

.custom-toggler {
	border-color: var(--color-white-50);
}

.custom-toggler-icon {
	background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24' /%3E%3C/svg%3E");
}

button:hover {
	background-color: rgba(255, 255, 255, 0.089);
}

@media (min-width: 991.98px) {
	.logo-cordaria {
		margin-left: 15px;
	}
}

@media (max-width: 576px) {
	.logo-cordaria {
		margin-left: 28px;
	}
}
</style>
