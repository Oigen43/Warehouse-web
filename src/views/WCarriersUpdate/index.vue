<template>
  <b-row>
    <b-col class="w-carriers-update-form" lg="4" sm="12" offset-lg="4">
      <h1 class="w-carriers-update-form-h1">Update Carrier</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="UPDATE CARRIER"
        :id="carrierId"
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
    import { mapState, mapActions } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import router from '../../router';
    import WForm from '../../components/WCarrierForm';

    export default {
        name: 'WCarriersUpdateForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm
        },
        computed: {
            ...mapState([
                'updatedCarrier'
            ]),
            carrierId() {
                return this.updatedCarrier.id;
            },
            name() {
                return this.updatedCarrier.name;
            },
            upn() {
                return this.updatedCarrier.upn;
            },
            countryCode() {
                return this.updatedCarrier.countryCode;
            }
        },
        methods: {
            ...mapActions({
                sendUpdatedCarrierData: 'sendUpdatedCarrier'
            }),
            redirect() {
                router.push('/carriers');
            },
            async sendData(carrier) {
                const res = await this.sendUpdatedCarrierData(carrier);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
