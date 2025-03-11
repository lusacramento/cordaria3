/**
 * Represents a fragment with an ID, value, and highlight status.
 */
export class Fragment {
  /**
   * The unique identifier of the fragment.
   */
  id: string;

  /**
   * The value or content of the fragment.
   */
  value: string;

  /**
   * Indicates whether the fragment is highlighted.
   */
  isHighlight: boolean;

  /**
   * Creates an instance of Fragment.
   * @param id - The unique identifier of the fragment.
   * @param value - The value or content of the fragment.
   */
  constructor(id: string, value: string) {
    this.id = id;
    this.value = value;
    this.isHighlight = false;
  }

  /**
   * Sets the highlight status of the fragment.
   * @param isHighlight - The highlight status to set.
   */
  setIsHighlight(isHighlight: boolean) {
    this.isHighlight = isHighlight;
  }

  /**
   * Returns an empty fragment with default values.
   * @returns A new Fragment instance with 'null' as id and value.
   */
  getEmptyFragment() {
    return new Fragment("null", "null");
  }
}
