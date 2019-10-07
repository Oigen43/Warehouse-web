<template>
  <b-row>
    <b-col class="w-transport-add-form" lg="3" sm="12" offset-lg="4">
      <h1 class="w-transport-add-form-h1">Add a New Sender</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="ADD TRANSPORT"
        :transportType="transportType"
        :transportNumber="transportNumber"
        :date="date"
      ></w-form>
      <b-button
        variant="link"
        to="/transport"
        class="w-transport-go-back-link"
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
        name: 'WTransportAddForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        data: function () {
            return {
                transportType: '',
                transportNumber: '',
                date: ''
            };
        },
        methods: {
            ...mapActions({
                sendNewTransportData: 'createTransport'
            }),
            redirect() {
                router.push('/transport');
            },
            async sendData(newTransport) {
                const res = await this.sendNewTransportData(newTransport);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
