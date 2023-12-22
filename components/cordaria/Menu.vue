<template>
	<div class="container-fluid">
		<div
			v-if="!loading"
			class="offcanvas offcanvas-start"
			:class="{ show: isMenuShow }"
			data-bs-backdrop="static"
			tabindex="-1"
			id="staticBackdrop"
			aria-labelledby="staticBackdropLabel"
		>
			<div class="offcanvas-header">
				<h5 class="offcanvas-title" id="staticBackdropLabel">Menu</h5>
				<button
					id="menu-button"
					type="button"
					class="btn-close"
					data-bs-dismiss="offcanvas"
					aria-label="Close"
				></button>
			</div>
			<div class="offcanvas-body d-flex align-items-center">
				<form
					id="menu-form"
					class="container-fluid form-row justify-content-center"
				>
					<div
						class="form-group col-6 col-lg-12 justify-self-center justify-content-center select-instrument"
					>
						<label for="select-instrument" class="form-label"
							>Instrumento
						</label>
						<br />
						<select
							id="select-instrument"
							v-model="instrument"
							class="controls justify-self-center"
						>
							<option
								v-for="instr in instruments"
								:key="instr.name"
								:value="instr.name"
							>
								{{ instr.label }}
							</option>
						</select>
					</div>

					<div class="form-group col-6 col-lg-12 col-6 col-lg-12 select-screen">
						<label for="select-view-mode" class="form-label"
							>Visualização
						</label>
						<br />
						<select id="select-view-mode" v-model="viewMode" class="controls">
							<option
								v-for="viewMode in viewModes"
								:key="viewMode.value"
								:value="viewMode.value"
							>
								{{ viewMode.label }}
							</option>
						</select>
					</div>
					<div class="form-group col-6 col-lg-12 select-lesson">
						<label for="select-lesson" class="form-label">Lições</label><br />
						<select id="select-lesson" v-model="lesson" class="controls">
							<option
								v-for="currentLesson in lessons"
								:key="currentLesson.id"
								:value="currentLesson.id"
							>
								{{ currentLesson.name }}
							</option>
						</select>
					</div>

					<div class="form-group col-6 col-lg-12 select-first-finger">
						<label for="select-first-finger" class="form-label"
							>Primeiro Dedo</label
						>
						<br />
						<select
							id="select-first-finger"
							v-model="finger"
							class="controls disabled"
						>
							<option v-for="ff in fingers" :key="ff.finger" :value="ff.finger">
								{{ ff.finger }}
							</option>
						</select>
					</div>

					<div class="form-group col-6 col-lg-12 select-string">
						<label for="select-string" class="form-label"> Corda</label>
						<br />
						<select id="select-string" v-model="str" class="controls">
							<option v-for="st in strings" :key="st.string" :value="st.string">
								{{ st.label }}
							</option>
						</select>
					</div>
					<div class="form-group col-6 col-lg-12">
						<div class="select-andamento form-group">
							<label for="tempo" class="form-label">Andamento</label>
							<br />
							<input
								id="tempo-number"
								v-model="bpm"
								class="tempo form-number"
								type="number"
								min="30"
								max="200"
								aria-required="true"
								aria-invalid="false"
								step="2"
							/>
							<br />
							<div class="slidecontainer">
								<input
									id="tempo-range"
									v-model="bpm"
									class="tempo form-range slider"
									type="range"
									min="30"
									max="200"
									step="2"
								/>
							</div>
						</div>
					</div>
					<div class="col-12">
						<div class="row justify-content-center">
							<button
								type="button"
								class="btn btn-success control-button align-items-center justify-content-center d-flex"
								@click="loadExercise"
							>
								<font-awesome-icon
									v-if="!loading"
									class="fa fa-code"
									:icon="playIcon"
								/>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { library } from '@fortawesome/fontawesome-svg-core'
	import { faPlay } from '@fortawesome/free-solid-svg-icons'
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
	library.add(faPlay)
	const playIcon = 'play'
	const loading = ref(true)
	const nuxtApp = useNuxtApp()
	nuxtApp.hook('page:finish', () => {
		loading.value = false
	})

	let isMenuShow = ref(true)

	const instruments = useSettings().getInstruments()
	let instrumentDefault = ref(instruments[0])
	const instrument = ref(instrumentDefault.value.name)

	const viewModes = useSettings().getViewModes()
	const viewMode = ref(viewModes[1].value)

	const lessons = useLessons().getLessons()
	let lessonDefault = lessons[0]
	const lesson = ref(lessonDefault.id)

	const fingers = useSettings().getFingers()
	let finger = ref(`${fingers[0].finger}`)

	const strings = ref(instrumentDefault.value.strings)
	let str = ref(strings.value[0].string)

	let bpm = ref(`${lessons[0].bpm}`)

	watch(lesson, async (newLesson) => {
		lessonDefault = lessons[newLesson]
		finger = ref(`${lessons[newLesson].firstFinger}`)
		bpm = ref(`${lessons[newLesson].bpm}`)
		str = ref(`${lessons[newLesson].stringNumber}`)
	})

	watch(instrument, async (newInstrument) => {
		instrumentDefault.value = instruments.filter(
			(el) => el.name == newInstrument,
		)[0]

		strings.value = instrumentDefault.value.strings
	})

	watch(instrumentDefault, async (newInstrumentDefault) => {
		console.log(newInstrumentDefault)
		instrumentDefault.value = newInstrumentDefault
	})

	const loadExercise = () => {
		// Close Menu
		isMenuShow.value = false

		useState().payLoad(
			instrument.value,
			viewMode.value,
			finger.value,
			str.value,
			parseInt(bpm.value),
		)
	}
</script>

<style>
	form.form {
		width: 80%;
	}

	select:disabled,
	input:disabled {
		background-color: rgba(0, 0, 0, 0.1) !important;
		color: rgba(255, 255, 255, 0.5) !important;
	}

	label {
		font-family: 'Encode Sans';
		font-weight: var(--font-regular);
		font-size: 0.9em;
	}

	select.controls,
	input.form-number {
		font-family: 'Encode Sans';
		font-weight: var(--font-semi-bold);
		background-color: #1a1b24;
		color: aliceblue;
		width: 120px;
		height: 30px;
		border: none;
		font-size: 0.8em;
	}

	.btn-controls {
		/* position: absolute; */
		width: 30px;
		height: 30px;
	}
	.fa {
		font-size: 0.6em;
	}

	/* slider style */

	input.slider {
		/*removes default webkit styles*/
		-webkit-appearance: none;

		/*fix for FF unable to apply focus style bug */
		/* border: 1px solid white; */

		/*required for proper track sizing in FF*/
		width: 120px;
	}
	input.slider::-webkit-slider-runnable-track {
		width: 120px;
		height: 5px;
		background: #1a1b24;
		border: none;
		border-radius: 3px;
	}
	input.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: none;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #7d7d7d;
		margin-top: -4px;
	}
	input.slider:focus {
		outline: none;
	}
	input.slider:focus::-webkit-slider-runnable-track {
		background: #ccc;
	}

	input.slider::-moz-range-track {
		width: 120px;
		height: 5px;
		background: #ddd;
		border: none;
		border-radius: 3px;
	}
	input.slider::-moz-range-thumb {
		border: none;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #7d7d7d;
	}

	/*hide the outline behind the border*/
	input.slider:-moz-focusring {
		outline: 1px solid white;
		outline-offset: -1px;
	}

	input.slider::-ms-track {
		width: 120px;
		height: 5px;

		/*remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead */
		background: transparent;

		/*leave room for the larger thumb to overflow with a transparent border */
		border-color: transparent;
		border-width: 6px 0;

		/*remove default tick marks*/
		color: transparent;
	}
	input.slider::-ms-fill-lower {
		background: #777;
		border-radius: 10px;
	}
	input.slider::-ms-fill-upper {
		background: #ddd;
		border-radius: 10px;
	}
	input.slider::-ms-thumb {
		border: none;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #7d7d7d;
	}
	input.slider:focus::-ms-fill-lower {
		background: #888;
	}
	input.slider:focus::-ms-fill-upper {
		background: #ccc;
	}

	#staticBackdropLabel {
		color: rgba(255, 255, 255, 0.7) !important;
	}

	#staticBackdrop {
		background-color: rgba(0, 0, 0, 0.7) !important;
		font-family: 'Encode Sans';
		font-weight: var(--font-semi-bold);
	}

	#menu-button {
		color: var(--font-color-p);
		background-color: white !important;
	}
	#menu-button:hover {
		background-color: rgba(255, 255, 255, 0.8);
		color: rgba(255, 255, 255, 0.7);
	}

	.control-button {
		/* position: absolute; */
		width: 30px;
		height: 30px;
	}
	label {
		font-family: 'Encode Sans';
		font-weight: var(--font-regular);
		font-size: 0.9em;
		color: #fff;
	}
</style>
