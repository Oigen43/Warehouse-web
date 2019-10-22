export default {
  calculatePageLimit: (total, perPage) => {
    return Math.ceil(total / perPage);
  },

  isItemsExists: (items) => {
    return items.length > 0;
  },

  isArrayEmpty: (arr) => {
    return arr.length === 0;
  }
};
