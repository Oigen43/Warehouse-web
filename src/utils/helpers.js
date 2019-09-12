export default {
  calculatePageLimit: (total, perPage) => {
    return Math.ceil(total / perPage);
  },
  createPopup(obj) {
    return {
      variant: (obj.status < 300) ? 'success' : 'danger',
      message: obj.data.data.message,
      done: obj.data.done
    };
  }
};
