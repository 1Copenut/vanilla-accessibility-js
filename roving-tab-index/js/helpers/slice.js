/**
 * Convert an HTML collection into a proper array of elements
 * 
 * @param {HTMLCollection} nodes list item nodes
 * @returns {Array} array of LI elmenets
 */
export default function slice(nodes) {
  return Array.prototype.slice.call(nodes);
}