<template>
  <b-row>
    <b-col class="w-carriers-add-form" lg="4" offset-lg="4">
      <h1 class="w-carriers-add-form-h1">Add a New Carrier</h1>
      <w-form
        @form-submitted="sendData"
        submit-button-name="ADD CARRIER"
        :name="name"
        :upn="upn"
        :country-code="countryCode"
      ></w-form>
      <b-button
        variant="link"
        to="/carriers"
        class="w-carriers-go-back-link"
      >Go Back
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapActions } from 'vuex';

    import WForm from '../../components/WCarrierForm';
    import router from '../../router';

    export default {
        name: 'WCarriersAddForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm
        },
        data() {
            return {
                name: '',
                upn: '',
                countryCode: ''
            };
        },
        methods: {
            ...mapActions({
                sendNewCarrierData: 'createCarrier'
            }),
            redirect() {
                router.push('/carriers');
            },
            async sendData(newCarrier) {
                const res = await this.sendNewCarrierData(newCarrier);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
