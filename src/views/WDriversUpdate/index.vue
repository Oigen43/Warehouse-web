<template>
  <b-row>
    <b-col class="w-drivers-update-form" lg="3" sm="12" offset-lg="4">
      <h1 class="w-drivers-update-form-h1">Update Driver</h1>
      <w-form
        v-if="!loading"
        @form-submitted="sendData"
        submitButtonName="UPDATE DRIVER"
        :id="driverId"
        :firstName="firstName"
        :surname="surname"
        :passport-number="passportNumber"
        :issuing-date="issuingDate"
      ></w-form>
      <b-button
        variant="link"
        @click="redirect"
        class="w-drivers-go-back-link"
      >Go Back
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import router from '../../router';
    import WForm from '../../components/WDriverForm';

    export default {
        name: 'WDriversUpdateForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm
        },
        computed: {
            ...mapState([
                'loading',
                'updatedDriver'
            ]),
            carrierId() {
                return +this.$route.params.carrierId;
            },
            driverId() {
                return +this.$route.params.driverId;
            },
            firstName() {
                return this.updatedDriver.firstName;
            },
            surname() {
                return this.updatedDriver.surname;
            },
            passportNumber() {
                return this.updatedDriver.passportNumber;
            },
            issuingDate() {
                return this.updatedDriver.issuingDate;
            }
        },
        methods: {
            ...mapActions({
                getUpdatedDriverData: 'getUpdatedDriver',
                sendUpdatedDriverData: 'sendUpdatedDriver'
            }),
            redirect() {
                router.push(`/carriers/${this.carrierId}/drivers`);
            },
            async sendData(driver) {
                const res = await this.sendUpdatedDriverData(driver);
                !res.error && this.redirect();
            }
        },
        created: function() {
            this.getUpdatedDriverData(this.driverId);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
