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
  </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import WNavigation from '../../components/WNavigation';
    import WForm from '../../components/WCompanyForm';

    export default {
        name: 'WCompaniesAddForm',
        components: {
            WNavigation,
            WForm
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
                location.href = '/companies';
            },
            sendData(newCompany) {
                this.sendNewCompanyData(newCompany);
                // this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
