export default {
  calculatePageLimit: (total, perPage) => {
    return Math.ceil(total / perPage);
  },

  isItemsExists: (items) => {
    return items.length;
  }
};
