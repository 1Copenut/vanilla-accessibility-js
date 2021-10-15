/**
 * 
 * @param {String} prefix string to further differentiate IDs
 * @returns {Number} unique number between 0 and 
 */
export default function uniqueId(prefix) {
  return `${prefix}-${Math.floor(Math.random() * 100000)}`.toString();
}