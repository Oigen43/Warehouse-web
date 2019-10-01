<template>
  <b-row>
    <b-col lg="4" offset-lg="4" md="6" offset-md="3" sm="12">
      <b-list-group>
        <b-list-group-item class="flex-column align-items-start w-storages-list-item">
          <div class="d-flex w-100">
            <div class="w-storages-list-item-capacity w-storages-list-item-title">
              Size
            </div>
            <div class="w-storages-list-item-type w-storages-list-item-title">
              Type
            </div>
          </div>
        </b-list-group-item>
        <b-list-group-item class="flex-column align-items-start w-storages-list-item" v-for="storage in storagesList" v-bind:key="storage.id">
          <div class="d-flex w-100">
            <div class="w-storages-list-item-capacity">
              {{storage.storageCapacity}}
            </div>
            <div class="w-storages-list-item-type">
              {{storage.storageType}}
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
    import {
        BRow,
        BCol,
        BListGroup,
        BListGroupItem
    } from 'bootstrap-vue';

    export default {
        name: 'WList',
        components: {
            BRow,
            BCol,
            BListGroup,
            BListGroupItem
        },
        props: ['storagesList'],
        data: function () {
            return {
                fields: [
                    {key: 'storageType', label: 'Type'},
                    {key: 'storageCapacity', label: 'Size'}
                ]
            };
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
