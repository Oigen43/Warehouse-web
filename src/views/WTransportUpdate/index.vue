<template>
  <b-row>
    <b-col class="w-transport-update-form" lg="3" sm="12" offset-lg="4">
      <h1 class="w-transport-update-form-h1">Update Transport</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="UPDATE TRANSPORT"
        :id="transportId"
        :transportType="transportType"
        :transportNumber="transportNumber"
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
    import { mapState, mapActions } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import router from '../../router';
    import WForm from '../../components/WTransportForm';

    export default {
        name: 'WTransportUpdateForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        computed: {
            ...mapState([
                'updatedTransport'
            ]),
            transportId() {
                return this.updatedTransport.id;
            },
            transportType() {
                return this.updatedTransport.transportType;
            },
            transportNumber() {
                return this.updatedTransport.transportNumber;
            }
        },
        methods: {
            ...mapActions({
                sendUpdatedTransportData: 'sendUpdatedTransport'
            }),
            redirect() {
                router.push('/transport');
            },
            async sendData(transport) {
                const res = await this.sendUpdatedTransportData(transport);
                !res.error && this.redirect();
            }
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
