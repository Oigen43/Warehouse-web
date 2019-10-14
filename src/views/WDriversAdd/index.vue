<template>
  <b-row>
    <b-col class="w-drivers-add-form" lg="4" offset-lg="4">
      <h1 class="w-drivers-add-form-h1">Add a New Driver</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="ADD DRIVER"
        :firstName="firstName"
        :surname="surname"
        :passportNumber="passportNumber"
        :issuingDate="issuingDate"
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
    import router from '../../router';
    import { mapActions, mapState } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import WForm from '../../components/WDriverForm';

    export default {
        name: 'WDriversAddForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm
        },
        data() {
            return {
                firstName: '',
                surname: '',
                passportNumber: '',
                issuingDate: ''
            };
        },
        computed: {
          ...mapState([
              'currentCarrier'
          ]),
            carrierId() {
                return +this.$route.params.carrierId;
            },
            driverId() {
                return +this.$route.params.driverId;
            }
        },
        methods: {
            ...mapActions({
                sendNewDriverData: 'createDriver'
            }),
            redirect() {
                router.push(`/carriers/${this.carrierId}/drivers`);
            },
            async sendData(newDriver) {
                newDriver.carrierId = this.carrierId;
                const res = await this.sendNewDriverData(newDriver);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
