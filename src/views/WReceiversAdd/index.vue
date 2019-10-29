<template>
  <b-row>
    <b-col class="w-receivers-add-form" lg="4" offset-lg="4">
      <h1 class="w-receivers-add-form-h1">Add a New Receiver</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="ADD RECEIVER"
        :receiverName="receiverName"
        :upn="upn"
        :countryCode="countryCode"
      ></w-form>
      <b-button
        variant="link"
        to="/receivers"
        class="w-receivers-go-back-link"
      >Go Back
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapActions } from 'vuex';

    import WForm from '../../components/WReceiverForm';
    import router from '../../router';

    export default {
        name: 'WReceiverAddForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        data: function () {
            return {
                receiverName: '',
                upn: '',
                countryCode: ''
            };
        },
        methods: {
            ...mapActions({
                sendNewReceiverData: 'createReceiver'
            }),
            redirect() {
                router.push('/receivers');
            },
            async sendData(newReceiver) {
                const res = await this.sendNewReceiverData(newReceiver);

                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
