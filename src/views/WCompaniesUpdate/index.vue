<template>
  <div class="w-companies-add-form">
    <w-navigation></w-navigation>
    <h1>Update Company</h1>
    <w-form
      @form-submitted="sendData"
      submitButtonName="UPDATE COMPANY"
      :companyName="companyName"
      :address="address"
      :description="description"
    ></w-form>
    <b-button
      variant="link"
      to="/companies"
      class="w-companies-go-back-link"
    >Go Back
    </b-button>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import router from '../../router';
    import WNavigation from '../../components/WNavigation';
    import WForm from '../../components/WCompanyForm';
    import { BButton } from 'bootstrap-vue';

    export default {
        name: 'WCompaniesUpdateForm',
        components: {
            WNavigation,
            WForm,
            BButton
        },
        computed: {
            ...mapState([
                'updatedCompany'
            ]),
            companyName () {
                return this.updatedCompany.companyName;
            },
            address () {
                return this.updatedCompany.address;
            },
            description () {
                return this.updatedCompany.description;
            }
        },
        methods: {
            ...mapActions({
                sendUpdatedCompanyData: 'sendUpdatedCompany'
            }),
            redirect() {
                router.push('/companies');
            },
            async sendData(company) {
                await this.sendUpdatedCompanyData(company);
                this.redirect();
            }
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
