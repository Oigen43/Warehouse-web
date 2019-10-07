<template>
  <b-row>
    <b-col lg="3" sm="6" v-for="storage in storagesList" v-bind:key="storage.id">
      <b-card no-body class="overflow-hidden w-storage-card">
        <div class="rounded-0 w-storage-card-header">
          <div class="w-storage-card-header-text">
            {{storage.storageCapacity}} m<sup><small>2</small></sup>
          </div>
        </div>
        <b-card-body>
          <b-card-title class="mb-0 w-storage-card-text">{{storage.StorageType.type}}</b-card-title>
        </b-card-body>
        <b-card-footer class="w-storage-card-footer">
          <b-button
            class="w-storage-update-card-button"
            variant="dark"
            size="sm"
            @click="clickedUpdateButton(storage)">
            Update
          </b-button>
          <b-button
            variant="light"
            size="sm"
            @click="clickedDeleteButton(storage)">
            ✕
          </b-button>
        </b-card-footer>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
    import { mapActions } from 'vuex';
    import {
        BRow,
        BCol,
        BCard,
        BCardTitle,
        BCardBody,
        BCardFooter,
        BButton
    } from 'bootstrap-vue';

    import router from '../../../../router';
    import * as modal from '../../../../constants/modal';

    export default {
        name: 'WList',
        components: {
            BRow,
            BCol,
            BCard,
            BCardTitle,
            BCardBody,
            BCardFooter,
            BButton
        },
        props: ['storagesList'],
        methods: {
            ...mapActions({
                fetchStorageTypes: 'fetchStorageTypes',
                getUpdatedStorageData: 'getUpdatedStorage'
            }),
            async clickedUpdateButton(item) {
                await this.fetchStorageTypes();
                await this.getUpdatedStorageData(item);
                router.push('/storages/update');
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.STORAGE_TEXT, {
                    title: `${modal.STORAGE_TITLE}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteStorage(item));
            },
            deleteStorage(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
