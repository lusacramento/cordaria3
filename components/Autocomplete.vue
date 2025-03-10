<template>
  <div class="location">
    <Label>Cidade de Acesso</Label>
    <div id="city" class="container form-control mb-3">
      <div class="input">
        <input v-model="city" class="form-control" @focus="focus" />
      </div>
      <div v-if="isShowList" class="select">
        <div v-for="location in locations" :key="location.id" class="item" @click.prevent="selectItem(location)">
          {{ location.city }}, {{ location.state }}, {{ location.country }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Location } from "~/types/Location";

const { fetchCities, locations } = useIGeonamesApi();

const city = ref("");

const { location } = await storeToRefs(useMyUserDetailsStore());
const isShowList = ref(true);

onMounted(async () => {
  city.value = await locationtoString(useMyUserDetailsStore().location);
});


/**
 * Watches for changes in the user's location from the `useMyUserDetailsStore` store.
 * When the location changes, it updates the `city` value by converting the new location
 * to a string using the `locationtoString` function.
 */
watch(
  () => useMyUserDetailsStore().location,
  () => {
    city.value = locationtoString(useMyUserDetailsStore().location);
  },
)

/**
 * Watches for changes in the `city` variable and triggers an asynchronous
 * function to fetch cities based on the new value.
 *
 * @param {String} newValue - The new value of the `city` variable.
 * @returns {Promise<void>} - A promise that resolves when the cities have been fetched.
 */
watch(city, async (newValue) => {
  await fetchCities(newValue);

});

/**
 * Selects a new location item and updates the relevant state.
 *
 * @param {Location} newLocation - The new location to be selected.
 * @returns {void}
 */
function selectItem(newLocation: Location) {
  location.value = newLocation;
  city.value = locationtoString(useMyUserDetailsStore().location); isShowList.value = false;
}

/**
 * Retrieves the city from the location object and assigns it to the city variable.
 */
function getCity() {
  city.value = location.value.city;
}

/**
 * Focuses on the input field, triggers the city fetching function, and displays the list.
 * 
 * This function performs the following actions:
 * 1. Calls the `getCity` function to fetch city data.
 * 2. Sets the `isShowList` reactive property to `true` to display the list of cities.
 */
function focus() {
  getCity();
  isShowList.value = true;
}

/**
 * Converts a Location object to a string representation.
 *
 * @param {Location} location - The location object containing city, state, and country.
 * @returns {string} A string in the format "city, state, country".
 */
function locationtoString(location: Location) {
  return `${location.city}, ${location.state}, ${location.country}`;
}

defineExpose({
  location,
})
</script>

<style scoped>
.form-control {
  background-color: transparent;
  border-radius: 0;
  color: var(--color-extreme);
}

.select {
  color: var(--text-color) !important;
}

.item:hover {
  background-color: var(--color-green);
  color: var(--color-extreme);
}
</style>
