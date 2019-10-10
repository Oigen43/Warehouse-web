<template>
  <b-row>
    <b-col class="w-drivers-update-form" lg="4" sm="12" offset-lg="4">
      <h1 class="w-drivers-update-form-h1">Update Driver</h1>
      <w-form
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
        to="/drivers"
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
                'updatedDriver'
            ]),
            driverId() {
                return this.updatedDriver.id;
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
                sendUpdatedDriverData: 'sendUpdatedDriver'
            }),
            redirect() {
                router.push('/drivers');
            },
            async sendData(driver) {
                const res = await this.sendUpdatedDriverData(driver);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
