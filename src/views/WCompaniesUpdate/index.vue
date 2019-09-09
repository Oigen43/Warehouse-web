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
    import { mapActions } from 'vuex';
    import store from '../../store';
    import router from '../../router';
    import WNavigation from '../../components/WNavigation';
    import WForm from '../../components/WCompanyForm';
    import { BButton } from 'bootstrap-vue';

    export default {
        name: 'WCompaniesUpdateForm',
        store,
        components: {
            WNavigation,
            WForm,
            BButton
        },
        data: function () {
            return {
                companyName: this.$store.state.updatedCompany.companyName,
                address: this.$store.state.updatedCompany.address,
                description: this.$store.state.updatedCompany.description,
            };
        },
        methods: {
            ...mapActions({
                sendUpdateCompanyData: 'updateCompany'
            }),
            redirect() {
                router.go(-1);
            },
            sendData(company) {
                this.sendUpdateCompanyData(company);
                this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
