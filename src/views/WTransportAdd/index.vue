<template>
  <b-row>
    <b-col class="w-transport-add-form" lg="4" offset-lg="4">
      <h1 class="w-transport-add-form-h1">Add a New Transport</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="ADD TRANSPORT"
        :transportType="transportType"
        :transportNumber="transportNumber"
      ></w-form>
      <b-button
        variant="link"
        @click="redirect"
        class="w-transport-go-back-link"
      >Go Back
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapActions } from 'vuex';

    import WForm from '../../components/WTransportForm';
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
                transportNumber: ''
            };
        },
        computed: {
            carrierId() {
                return +this.$route.params.carrierId;
            },
            transportId() {
                return +this.$route.params.transportId;
            },
        },
        methods: {
            ...mapActions({
                sendNewTransportData: 'createTransport'
            }),
            redirect() {
                router.push(`/carriers/${this.carrierId}/transport`);
            },
            async sendData(newTransport) {
                newTransport.carrierId = this.carrierId;

                const res = await this.sendNewTransportData(newTransport);

                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
