export default {
  calculatePageLimit: (total, perPage) => {
    return Math.ceil(total / perPage);
  },

  isItemsExists: (items) => {
    return items.length > 0;
  },
  checkEmptyFields: (form) => {
    for (let i in form) {
      if (i === 'driver' || i === 'registrationDate') {
        continue;
      }
      if (!form[i]) {
        return true;
      }
    }
    return false;
  }
};
