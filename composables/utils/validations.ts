import { type Location } from "@/types/Location";

export const useValidations = () => {
  function validateEmail(email: string) {
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.test(email);
  }

  function validateUserName(name: string) {
    if (name.length >= 3 && name.length <= 25 && sanitize(name)) return true;

    return false;
  }

  function validatePassword(password: string) {
    if (password.length >= 9) return true;
    return false;
  }

  function validateConfirmPassword(password: string, confirmPassword: string) {
    if (password === confirmPassword && confirmPassword !== "") return true;
    return false;
  }

  function validateFullName(fullName: string) {
    if (
      fullName.length >= 3 &&
      fullName.length <= 50 &&
      fullName !== " " &&
      sanitize(fullName)
    )
      return true;
    return false;
  }

  function validateAge(age: number) {
    if (age >= 5 && age <= 120) return true;
    return false;
  }

  function validateLocation() {
    const { location } = storeToRefs(useMyUserDetailsStore());
    if (
      location.value.city !== "" &&
      location.value.state !== "" &&
      location.value.country !== ""
    )
      return true;
    return false;
  }

  function validateInstrument(instrument: string) {
    return instrument === "acoustic-guitar" ||
      instrument === "eletric-guitar" ||
      instrument === "bass" ||
      instrument === "cavaco"
      ? true
      : false;
  }

  function sanitize(text: string) {
    const regex =
      /^(?=.{1,80}$)[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+(?: *[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+)*$/;
    return regex.test(text);
  }

  function replaceAcents(text: string) {
    text = text.replace(/[ÀÁÂÃÄÅ]/, "A");
    text = text.replace(/[àáâãäå]/, "a");
    text = text.replace(/[ÈÉÊË]/, "E");
    text = text.replace(/[èéêë]/, "e");
    text = text.replace(/[ÌÍÎÏ]/, "I");
    text = text.replace(/[ìíîï]/, "i");
    text = text.replace(/[ÒÓÔÕÖ]/, "O");
    text = text.replace(/[òóôõö]/, "o");
    text = text.replace(/[ÙÚÛÜ]/, "U");
    text = text.replace(/[ùúûü]/, "u");
    text = text.replace(/[Ç]/, "C");
    text = text.replace(/[ç]/, "c");
    return text;
  }

  return {
    validateEmail,
    validateUserName,
    validatePassword,
    validateConfirmPassword,
    validateFullName,
    validateAge,
    validateLocation,
    validateInstrument,
    sanitize,
    replaceAcents,
  };
};
