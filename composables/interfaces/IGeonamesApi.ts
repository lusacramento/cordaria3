import { useValidations } from "~/composables/utils/validations";
import { ref } from "vue";
import type { Location } from "~/types/Location";

export function useIGeonamesApi() {
  /**
   * A reactive reference to an array of Location objects.
   *
   * @type {Ref<Location[]>}
   */
  const locations = ref() as Ref<Location[]>;

  const username = "lusacramento";

  /**
   * Fetches a list of cities matching the given city name from the GeoNames API.
   * Filters the results to include only those that match the city name exactly (ignoring accents)
   * and are classified as either a city or a region.
   *
   * @param {string} city - The name of the city to search for.
   * @returns {Promise<void>} A promise that resolves when the cities have been fetched and processed.
   *
   * @throws Will log an error message to the console if the fetch request fails.
   */
  async function fetchCities(city: string) {
    try {
      const response = await fetch(
        `http://api.geonames.org/searchJSON?q=${city}&maxRows=20&username=${username}`
      );
      const data = await response.json();

      const filter = function (obj: any) {
        return (
          (useValidations().replaceAcents(obj.name.toLowerCase()) === city &&
            obj.fclName.includes("city")) ||
          obj.fclName.includes("region")
        );
      };

      locations.value = data.geonames.filter(filter).map((filtered: any) => {
        return {
          id: filtered.geonameId,
          city: filtered.name,
          state: filtered.adminName1,
          country: filtered.countryName,
        };
      });
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  return {
    locations,
    fetchCities,
  };
}
