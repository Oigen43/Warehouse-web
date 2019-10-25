<template>
  <b-row>
    <b-col
      v-if="updatedCompany.id"
      class="w-companies-update-form"
      lg="4"
      offset-lg="4">
      <h1 class="w-company-update-form-h1">Update Company</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="UPDATE COMPANY"
        :id="companyId"
        :companyName="companyName"
        :address="address"
        :description="description"
        :price="price"
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
                'updatedCompany'
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
            },
            price() {
                return this.updatedCompany.price;
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
