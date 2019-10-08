/**
 * Stores the given value under given key into localStorage.
 *
 * @param {String} key    - key to store
 * @param {String} value  - value to store
 * @return {NULL}         - no return
 */
export function storeValueIntoStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}


/**
 * Gets the value for given key from localStorage.
 *
 * @param {String} key - key to get value
 * @return {Blob}      - value
 */
export function getValueFromStorage(key) {
	return JSON.parse(localStorage.getItem(key))

}