export default {
  checkEmptyFields: (form) => {
    for (let i in form) {
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
