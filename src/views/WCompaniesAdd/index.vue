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
      go="/companies"
      class="w-companies-go-back-link"
    >Go Back
    </b-button>
  </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import WNavigation from '../../components/WNavigation';
    import WForm from '../../components/WCompanyForm';
    import { BButton } from 'bootstrap-vue';
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
                router.go(-1);
            },
            sendData(newCompany) {
                this.sendNewCompanyData(newCompany);
                this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
