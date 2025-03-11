export const useUrls = () => {
  /**
   * An array of objects representing different audio resources.
   * Each object contains the name of the resource and its base URL.
   *
   * @type {Array<{name: string, baseUrl: string}>}
   * @property {string} name - The name of the audio resource.
   * @property {string} baseUrl - The base URL path to the audio resource.
   */
  const urls = [
    {
      name: "metronome",
      baseUrl: "/audios/metronome/",
    },
    {
      name: "acoustic-guitar",
      baseUrl: "/audios/acoustic-guitar/",
    },

    {
      name: "electric-guitar",
      baseUrl: "/audios/electric-guitar/",
    },
    {
      name: "bass",
      baseUrl: "/audios/bass/",
    },
    {
      name: "cavaco",
      baseUrl: "/audios/cavaco/",
    },
  ];

  /**
   * Retrieves the base URL for a given instrument name.
   *
   * @param instrumentName - The name of the instrument to find the URL for.
   * @returns The base URL of the instrument if found, otherwise returns 'Url não encontrada!'.
   */
  const getUrl = function (instrumentName: string) {
    let url: string = "";
    urls.forEach((object) => {
      if (instrumentName === object.name) url = object.baseUrl;
    });

    if (url !== "") return url;
    else return "Url não encontrada!";
  };

  return {
    getUrl,
  };
};
