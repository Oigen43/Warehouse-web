import * as types from './mutation-types';

export default {
  [types.COMPANIES](state, companies) {
    state.companies = companies;
  },
  [types.COMPANIES_PAGE_LIMIT](state, companiesPageLimit) {
    state.companiesPageLimit = companiesPageLimit;
  },
  [types.CREATE_COMPANY](state, company) {
    state.newCompany = company;
  },
  [types.UPDATE_COMPANY](state, company) {
    state.updatedCompany = company;
  },
  [types.DELETE_COMPANY](state, company) {
    state.deletedCompany = company;
    const index = state.companies.findIndex(item => item.companyName === company.companyName);
    state.companies.splice(index, 1);
  }
};
