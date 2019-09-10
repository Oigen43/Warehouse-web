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
  [types.GET_UPDATED_COMPANY](state, company) {
    state.updatedCompany = company;
  },
  [types.UPDATE_COMPANY](state, company) {
    state.updatedCompany = company;
    state.companies = [ ...state.companies.map(item => item.companyName === company.companyName ? company : item) ];
  },
  [types.DELETE_COMPANY](state, company) {
    state.deletedCompany = company;
    const index = state.companies.findIndex(item => item.companyName === company.companyName);
    state.companies = [...state.companies.splice(index, 1)];
  },
};
