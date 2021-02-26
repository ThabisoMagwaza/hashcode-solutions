/**
 * Custom queue type implementation
 */
module.exports = function Queue() {
	let count = 0;
	let lowestCount = 0;
	let items = {};

	/**
   * Check if queue is empty
   * @returns {boolean} true if queue is empty, false otherwise
   */
	this.isEmpty = function isEmpty() {
		return count - lowestCount === 0;
	};

	/**
   * Add element to the back of the queue
   * @param element Element to add
   */
	this.enqueue = function enqueue(element) {
		items[count] = element;
		count++;
	};

	/**
   * Removes element from from of the queues
   * @returns Element that was removed
   */
	this.dequeue = function dequeue() {
		if (this.isEmpty()) return undefined;
		const res = items[lowestCount];
		delete items[lowestCount];
		lowestCount++;
		return res;
	};

	/**
   * Returns element in the front of the queue without modifying the queue
   * @returns Element in the front of the queue
   */
	this.peek = function peek() {
		if (this.isEmpty()) return undefined;
		return items[lowestCount];
	};

	/**
   * Returns element the size of the queue
   * @returns {number} Size of the queue
   */
	this.size = function size() {
		return count - lowestCount;
	};

	/**
   * Removes all elements in the queue
   */
	this.clear = function clear() {
		count = 0;
		lowestCount = 0;
		items = {};
	};

	/**
   * Returns a string representation of the queue
   * @returns {string} String representation of the queue
   */
	this.toString = function toString() {
		if (this.isEmpty()) return '';
		return Object.values(items).toString();
	};

};
