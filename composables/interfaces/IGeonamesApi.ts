import { useValidations } from "~/composables/utils/validations";
import { ref } from "vue";
import type { Location } from "~/types/Location";

export function useIGeonamesApi() {
  const locations = ref() as Ref<Location[]>;

  const username = "lusacramento";

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
