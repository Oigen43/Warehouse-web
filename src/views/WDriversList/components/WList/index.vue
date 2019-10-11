<template>
  <b-spinner
    v-if="loading"
    style="width: 4rem; height: 4rem;"
    label="Large Spinner"
  ></b-spinner>
  <div v-else>
  <b-row v-if="isItemsExists">
    <b-col lg="3" sm="6" v-for="driver in drivers" v-bind:key="driver.id">
      <b-card no-body class="overflow-hidden w-drivers-card">
        <b-card-img src="https://newharvestsarang.org/wp/wp-content/uploads/2013/05/pf-300x300.png"
                    class="rounded-0 w-drivers-card-img"
                    alt="Driver image"></b-card-img>
        <b-card-body>
          <b-card-title class="mb-0 w-drivers-card-text">{{driver.firstName}} {{driver.surname}}</b-card-title>
          <hr>
          <b-card-text class="w-drivers-card-text"><span class="w-drivers-card-text-bold">Passport number:</span>
            {{driver.passportNumber}}
          </b-card-text>
          <b-card-text class="w-drivers-card-text"><span class="w-drivers-card-text-bold">Issuing date:</span>
            {{driver.issuingDate}}
          </b-card-text>
          <b-card-text class="w-drivers-card-text"><span class="w-drivers-card-text-bold">Carrier:</span>
            {{driver.carrierName}}
          </b-card-text>
        </b-card-body>
        <b-card-footer class="w-drivers-card-footer">
          <b-button
            class="w-drivers-update-card-button"
            variant="dark"
            size="sm"
            @click="clickedUpdateButton(driver)">
            Update
          </b-button>
          <b-button
            variant="light"
            size="sm"
            @click="clickedDeleteButton(driver)">
            ✕
          </b-button>
        </b-card-footer>
      </b-card>
    </b-col>
  </b-row>
  <w-empty-table v-else></w-empty-table>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import {
        BSpinner,
        BRow,
        BCol,
        BCard,
        BCardImg,
        BCardTitle,
        BCardBody,
        BCardText,
        BCardFooter,
        BButton
    } from 'bootstrap-vue';

    import router from '../../../../router';
    import * as modal from '../../../../constants/modal';
    import WEmptyTable from '../../../../components/WEmptyTable';
    import helpers from '../../../../utils/helpers';

    export default {
        name: 'WList',
        components: {
            BSpinner,
            BRow,
            BCol,
            BCard,
            BCardImg,
            BCardTitle,
            BCardText,
            BCardBody,
            BCardFooter,
            BButton,
            WEmptyTable
        },
        props: ['drivers'],
        data() {
            return {
                fields: [
                    'firstName', 'surname', 'passportNumber', 'issuingDate',
                    { key: 'update', label: '' },
                    { key: 'delete', label: '' }
                ]
            };
        },
        computed: {
            ...mapState([
                'loading'
            ]),
            isItemsExists() {
                return helpers.isItemsExists(this.drivers);
            }
        },
        methods: {
            clickedUpdateButton(item) {
                router.push(`drivers/${item.id}/update`);
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.DRIVER_TEXT, {
                    title: `${modal.DRIVER_TITLE} ${item.firstName} ${item.surname}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteDriver(item));
            },
            deleteDriver(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
