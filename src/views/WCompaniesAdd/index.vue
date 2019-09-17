<template>
  <div class="w-companies-add-form">
    <w-navigation></w-navigation>
    <h1>Add a New Company</h1>
    <w-form
      @form-submitted="sendData"
      submitButtonName="ADD COMPANY"
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
    import { BButton } from 'bootstrap-vue';
    import { mapActions } from 'vuex';

    import WNavigation from '../../components/WNavigation';
    import WForm from '../../components/WCompanyForm';
    import router from '../../router';

    export default {
        name: 'WCompaniesAddForm',
        components: {
            WNavigation,
            WForm,
            BButton
        },
        data: function () {
            return {
                companyName: '',
                address: '',
                description: ''
            };
        },
        methods: {
            ...mapActions({
                sendNewCompanyData: 'createCompany'
            }),
            redirect() {
                router.push('/companies');
            },
            async sendData(newCompany) {
                const res = await this.sendNewCompanyData(newCompany);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
