<template>
  <b-row>
    <h1 class="w-ttn-add-form-h1">Create TTN</h1>
    <b-col class="w-ttn-add-form-col" lg="4" sm="12" offset-lg="4">
      <w-form
        :number="number"
        :dischargeDate="dischargeDate"
        :sender="sender"
        :carrier="carrier"
        :transport="transport"
        :driver="driver"
        :dispatcher="dispatcher"
        :description="description"
        :type="type"
        :warehouse="warehouse"
        :addForm="false"
        submitButtonName="Create"
      ></w-form>
      <b-button
        variant="link"
        to="/users"
        class="w-ttn-go-back-link"
      >Go Back
      </b-button>
    </b-col>
  </b-row>
</template>

<script>

    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import WForm from '../../components/WTtnForm';

    export default {
        name: 'WTtnAddForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm
        },
        data() {
            return {
                number: '',
                dischargeDate: '',
                sender: '',
                carrier: '',
                transport: '',
                driver: '',
                dispatcher: '',
                description: '',
                type: '',
                goods: '',
                warehouse: '',
            };
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
