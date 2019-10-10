<template>
  <b-row>
    <b-col class="w-receivers-update-form" lg="4" sm="12" offset-lg="4">
      <h1 class="w-receivers-update-form-h1">Update Receiver</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="UPDATE RECEIVER"
        :id="receiverId"
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
    import { mapState, mapActions } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import router from '../../router';
    import WForm from '../../components/WReceiverForm';

    export default {
        name: 'WReceiversUpdateForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        computed: {
            ...mapState([
                'updatedReceiver'
            ]),
            receiverId() {
                return this.updatedReceiver.id;
            },
           receiverName() {
                return this.updatedReceiver.receiverName;
            },
            upn() {
                return this.updatedReceiver.upn;
            },
            countryCode() {
                return this.updatedReceiver.countryCode;
            }
        },
        methods: {
            ...mapActions({
                sendUpdatedReceiverData: 'sendUpdatedReceiver'
            }),
            redirect() {
                router.push('/receivers');
            },
            async sendData(receiver) {
                const res = await this.sendUpdatedReceiverData(receiver);
                !res.error && this.redirect();
            }
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
