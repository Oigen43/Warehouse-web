import messageCode from '../constants/messageCode';

export default {
  calculatePageLimit: (total, perPage) => {
    return Math.ceil(total / perPage);
  },
  createPopup(popup) {
    return {
      variant: (popup.status < 300) ? 'success' : 'danger',
      message: messageCode[popup.data.data.statusCode],
      done: popup.data.done
    };
  }
};
