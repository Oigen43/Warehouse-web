<template>
  <b-table
    head-variant="dark"
    class="w-companies-list-table"
    bordered
    stacked="md"
    :items="companies"
    :fields="fields">

    <template
      v-slot:cell(active)="data">
      <b-form-checkbox
        v-model="data.value"
        disabled>
      </b-form-checkbox>
    </template>
    <template
      v-slot:cell(warehouses)="data">
      <b-button
        variant="light"
        size="sm"
        @click="clickedWarehousesButton(data.item)">
        Warehouses
      </b-button>
    </template>
    <template
      v-slot:cell(update)="data">
      <b-button
        variant="warning"
        size="sm"
        @click="clickedUpdateButton(data.item)">
        Update
      </b-button>
    </template>
    <template
      v-slot:cell(delete)="data">
      <b-button
        variant="outline-dark"
        size="sm"
        @click="clickedDeleteButton(data.item)">
        ✕
      </b-button>
    </template>

  </b-table>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { BTable, BFormCheckbox, BButton } from 'bootstrap-vue';

    import router from '../../../../router';
    import * as modal from '../../../../constants/modal';

    export default {
        name: 'WList',
        components: {
            BTable,
            BFormCheckbox,
            BButton
        },
        props: ['companies'],
        computed: {
            ...mapState([
                'modalValue'
            ])
        },
        watch: {
            modalValue(newVal, oldVal) {
                if (newVal) {
                    this.deleteCompany(this.clickedCompany);
                    this.setModalValue(false);
                }
            }
        },
        data: function () {
            return {
                fields: [
                    'active', 'companyName', 'address', 'description', 'date',
                    { key: 'warehouses', label: '' },
                    { key: 'update', label: '' },
                    { key: 'delete', label: '' }
                ],
                clickedCompany: {}
            };
        },
        methods: {
            ...mapActions({
                getUpdatedCompanyData: 'getUpdatedCompany',
                sendDeletedCompanyData: 'deleteCompany',
                setCurrentCompany: 'setCurrentCompany',
                setModalValue: 'setModalValue'
            }),
            clickedWarehousesButton(item) {
              this.setCurrentCompany({ id: item.id, companyName: item.companyName });
              router.push('/warehouses');
            },
            clickedUpdateButton(item) {
                this.getUpdatedCompanyData(item);
                router.push('/companies/update');
            },
            clickedDeleteButton(item) {
                this.clickedCompany = item;
                this.$bvModal.msgBoxConfirm(modal.COMPANY_TEXT, {
                    title: `${modal.COMPANY_TITLE} ${item.companyName}`,
                    size: modal.SIZE,
                    buttonSize: modal.BUTTON_SIZE,
                    okVariant: modal.OK_VARIANT,
                    cancelVariant: modal.CANCEL_VARIANT,
                    okTitle: modal.OK_TITLE,
                    cancelTitle: modal.CANCEL_TITLE,
                    hideHeaderClose: modal.HIDE_HEADER_CLOSE,
                    centered: modal.CENTERED
                })
                    .then(value => {
                        this.setModalValue(value);
                    });
            },
            deleteCompany(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
