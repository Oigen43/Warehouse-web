<template>
  <b-row>
    <b-col class="w-companies-update-form" lg="4" sm="12" offset-lg="4">
      <h1 class="w-company-update-form-h1">Update Company</h1>
      <w-form
        v-if="!loading"
        @form-submitted="sendData"
        submitButtonName="UPDATE COMPANY"
        :id="companyId"
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
    </b-col>
  </b-row>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import router from '../../router';
    import WForm from '../../components/WCompanyForm';

    export default {
        name: 'WCompaniesUpdateForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        computed: {
            ...mapState([
                'updatedCompany',
                'loading'
            ]),
            companyId() {
                return +this.$route.params.companyId;
            },
            companyName() {
                return this.updatedCompany.companyName;
            },
            address() {
                return this.updatedCompany.address;
            },
            description() {
                return this.updatedCompany.description;
            }
        },
        methods: {
            ...mapActions({
                getUpdatedCompanyData: 'getUpdatedCompany',
                sendUpdatedCompanyData: 'sendUpdatedCompany'
            }),
            redirect() {
                router.push('/companies');
            },
            async sendData(company) {
                const res = await this.sendUpdatedCompanyData(company.company);
                !res.error && this.redirect();
            }
        },
        created: function() {
            this.getUpdatedCompanyData(this.companyId);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
