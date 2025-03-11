import { type Location } from "@/types/Location";

export const useValidations = () => {
  /**
   * Validates if the given email string is in a proper email format.
   *
   * @param email - The email address to validate.
   * @returns `true` if the email is valid, `false` otherwise.
   */
  function validateEmail(email: string) {
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.test(email);
  }

  /**
   * Validates a username based on length and sanitization criteria.
   *
   * @param name - The username to validate.
   * @returns `true` if the username is valid, `false` otherwise.
   */
  function validateUserName(name: string) {
    if (name.length >= 3 && name.length <= 25 && sanitize(name)) return true;

    return false;
  }

  /**
   * Validates if the given password meets the required length criteria.
   *
   * @param password - The password string to validate.
   * @returns `true` if the password length is greater than or equal to 9 characters, otherwise `false`.
   */
  function validatePassword(password: string) {
    if (password.length >= 9) return true;
    return false;
  }

  /**
   * Validates if the confirm password matches the original password and is not empty.
   *
   * @param password - The original password.
   * @param confirmPassword - The confirmation password to validate.
   * @returns `true` if the passwords match and the confirmation password is not empty, otherwise `false`.
   */
  function validateConfirmPassword(password: string, confirmPassword: string) {
    if (password === confirmPassword && confirmPassword !== "") return true;
    return false;
  }

  /**
   * Validates a full name string.
   *
   * @param {string} fullName - The full name to validate.
   * @returns {boolean} Returns `true` if the full name is valid, otherwise `false`.
   *
   * A valid full name must:
   * - Be at least 3 characters long.
   * - Be no more than 50 characters long.
   * - Not be a single space character.
   * - Pass the `sanitize` function check.
   */
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

  /**
   * Validates if the given age is within the acceptable range.
   *
   * @param age - The age to validate.
   * @returns `true` if the age is between 5 and 120 (inclusive), otherwise `false`.
   */
  function validateAge(age: number) {
    if (age >= 5 && age <= 120) return true;
    return false;
  }

  /**
   * Validates the user's location details.
   *
   * This function checks if the user's location details (city, state, and country)
   * are all non-empty strings. If all three fields are filled, it returns `true`,
   * otherwise it returns `false`.
   *
   * @returns {boolean} - `true` if all location fields are non-empty, `false` otherwise.
   */
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

  /**
   * Validates if the given instrument is one of the allowed types.
   *
   * @param instrument - The instrument to validate.
   * @returns `true` if the instrument is valid, otherwise `false`.
   */
  function validateInstrument(instrument: string) {
    return instrument === "acoustic-guitar" ||
      instrument === "eletric-guitar" ||
      instrument === "bass" ||
      instrument === "cavaco"
      ? true
      : false;
  }

  /**
   * Sanitizes a given text by ensuring it matches a specific pattern.
   *
   * The text must:
   * - Be between 1 and 80 characters long.
   * - Contain only alphabetic characters (including accented characters) and spaces.
   * - Not start or end with a space.
   * - Not contain multiple consecutive spaces.
   *
   * @param text - The text to be sanitized.
   * @returns `true` if the text matches the pattern, otherwise `false`.
   */
  function sanitize(text: string) {
    const regex =
      /^(?=.{1,80}$)[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+(?: *[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+)*$/;
    return regex.test(text);
  }

  /**
   * Replaces accented characters in a given text with their non-accented counterparts.
   *
   * @param text - The input string containing accented characters.
   * @returns The modified string with accented characters replaced by non-accented characters.
   */
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
