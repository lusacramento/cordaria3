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


watch(
  () => useMyUserDetailsStore().location,
  () => {
    city.value = locationtoString(useMyUserDetailsStore().location);
  },
)

watch(city, async (newValue) => {
  await fetchCities(newValue);

});

function selectItem(newLocation: Location) {
  location.value = newLocation;
  city.value = locationtoString(useMyUserDetailsStore().location); isShowList.value = false;
}

function getCity() {
  city.value = location.value.city;
}

function focus() {
  getCity();
  isShowList.value = true;
}

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
