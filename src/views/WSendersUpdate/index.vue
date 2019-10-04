<template>
  <b-row>
    <b-col class="w-senders-update-form" lg="3" sm="12" offset-lg="4">
      <h1 class="w-senders-update-form-h1">Update Sender</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="UPDATE SENDER"
        :id="senderId"
        :senderName="senderName"
        :upn="upn"
        :countryCode="countryCode"
      ></w-form>
      <b-button
        variant="link"
        to="/senders"
        class="w-senders-go-back-link"
      >Go Back
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import router from '../../router';
    import WForm from '../../components/WSenderForm';

    export default {
        name: 'WSendersUpdateForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        computed: {
            ...mapState([
                'updatedSender'
            ]),
            senderId() {
                return this.updatedSender.id;
            },
            senderName() {
                return this.updatedSender.senderName;
            },
            upn() {
                return this.updatedSender.upn;
            },
            countryCode() {
                return this.updatedSender.countryCode;
            }
        },
        methods: {
            ...mapActions({
                sendUpdatedSenderData: 'sendUpdatedSender'
            }),
            redirect() {
                router.push('/senders');
            },
            async sendData(sender) {
                const res = await this.sendUpdatedSenderData(sender);
                !res.error && this.redirect();
            }
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
