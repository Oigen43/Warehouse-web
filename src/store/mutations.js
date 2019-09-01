import * as types from './mutation-types';

export default {
  [types.COMPANIES](state, companies) {
    state.companies = companies;
  },
  [types.PAGE_LIMIT](state, pageLimit) {
    state.pageLimit = pageLimit;
  }
};
