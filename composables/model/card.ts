import { Fragment } from "./fragment";

/**
 * Represents a card with content, fragments, and status.
 */
export class Card {
  /**
   * The unique identifier of the card.
   */
  id: string;

  /**
   * The content of the card.
   */
  content: string;

  /**
   * The fragments of the card content.
   */
  fragments: Fragment[];

  /**
   * Indicates whether this card is the last one.
   */
  isLast: boolean = false;

  /**
   * The status of the card.
   */
  status: string;

  /**
   * A string number associated with the card.
   */
  str: string;

  /**
   * Creates an instance of Card.
   * @param content - The content of the card.
   * @param stringNumber - A string number associated with the card.
   */
  constructor(content: string, stringNumber: string) {
    this.id = content;
    this.content = content;
    this.fragments = this.getFragments(content);
    this.isLast = false;
    this.status = "next";
    this.str = stringNumber;
  }

  /**
   * Creates an empty card.
   * @returns A new Card instance with empty content and string number.
   */
  static getEmptyCard() {
    return new Card("", "");
  }

  /**
   * Splits the content into fragments.
   * @param content - The content to be split into fragments.
   * @returns An array of Fragment instances.
   */
  getFragments(content: string) {
    const fragments = [];
    for (let index = 0; index < content.length; index++) {
      const fragmentContent = content[index];
      const fragment = new Fragment(
        `${this.id}_${index}_${fragmentContent}`,
        fragmentContent
      );
      fragments.push(fragment);
    }
    return fragments;
  }

  /**
   * Sets the status of the card.
   * @param status - The new status of the card.
   */
  setStatus(status: string) {
    this.status = status;
  }
}
