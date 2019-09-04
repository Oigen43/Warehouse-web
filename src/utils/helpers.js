export default {
    calculatePageLimit: (total, perPage) => {
        return Math.ceil(total / perPage);
    }
};
