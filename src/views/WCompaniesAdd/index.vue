<template>
  <b-row>
    <b-col class="w-companies-add-form" lg="4" offset-lg="4">
      <h1 class="w-company-add-form-h1">Add a New Company</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="ADD COMPANY"
        :companyName="companyName"
        :address="address"
        :description="description"
        :dailyPrice="dailyPrice"
        :adminName="adminName"
        :adminEmail="adminEmail"
        :disableState="disableState"
        with-admin-fields
        add-company
      ></w-form>
      <b-button
        variant="link"
        to="/companies"
        class="w-companies-go-back-link">
        Go Back
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapActions } from 'vuex';

    import WForm from '../../components/WCompanyForm';
    import router from '../../router';

    export default {
        name: 'WCompaniesAddForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        data: function () {
            return {
                companyName: '',
                address: '',
                description: '',
                dailyPrice: null,
                activeDate: '',
                adminName: '',
                adminEmail: '',
                disableState: false
            };
        },
        methods: {
            ...mapActions({
                sendNewCompanyData: 'createCompany'
            }),
            redirect() {
                router.push('/companies');
            },
            changeDisableState() {
                this.disableState = !this.disableState;
            },
            async sendData(newCompany) {
                this.changeDisableState();

                const res = await this.sendNewCompanyData({ company: newCompany.company, priceForm: newCompany.priceForm, user: newCompany.user });

                res.error && this.changeDisableState();
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
