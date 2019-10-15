<template>
  <b-row>
    <b-col class="w-senders-add-form" lg="4" offset-lg="4">
      <h1 class="w-senders-add-form-h1">Add a New Sender</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="ADD SENDER"
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
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapActions } from 'vuex';

    import WForm from '../../components/WSenderForm';
    import router from '../../router';

    export default {
        name: 'WSenderAddForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        data: function () {
            return {
                senderName: '',
                upn: '',
                countryCode: ''
            };
        },
        methods: {
            ...mapActions({
                sendNewSenderData: 'createSender'
            }),
            redirect() {
                router.push('/senders');
            },
            async sendData(newSender) {
                const res = await this.sendNewSenderData(newSender);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
