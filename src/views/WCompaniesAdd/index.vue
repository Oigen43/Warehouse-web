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
    import Vue from 'vue';
    import { ToastPlugin, BButton } from 'bootstrap-vue';
    import { mapState, mapActions } from 'vuex';

    import WNavigation from '../../components/WNavigation';
    import WForm from '../../components/WCompanyForm';
    import router from '../../router';

    Vue.use(ToastPlugin);

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
        computed: {
            ...mapState([
                'toast'
            ])
        },
        methods: {
            ...mapActions({
                sendNewCompanyData: 'createCompany'
            }),
            redirect() {
                router.push('/companies');
            },
            async sendData(newCompany) {
                await this.sendNewCompanyData(newCompany);
                if (this.toast.done) {
                    this.redirect();
                } else {
                    this.toast.done = true;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
