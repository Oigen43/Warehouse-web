export default {
  checkEmptyFields: (form) => {
    for (let i in form) {
      if (!form.receiver && form.type === 'incoming') {
        continue;
      }
      if (!form.sender && form.type === 'outcoming') {
        continue;
      }
      if (i === 'id' || i === 'driver' || i === 'registrationDate') {
        continue;
      }
      if (!form[i]) {
        return true;
      }
    }
    return false;
  }
};
