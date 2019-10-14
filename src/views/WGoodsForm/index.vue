<template>
  <b-row>
    <b-row>
      <b-col v-if="storages" lg="3" sm="6" v-for="good in goods" v-bind:key="good.id">
        <b-card no-body class="overflow-hidden w-drivers-card">
          <b-card-body>
            <b-card-title class="mb-0 w-drivers-card-text">{{good.name}}</b-card-title>
            <hr>
            <b-card-text class="w-drivers-card-text"><span class="w-drivers-card-text-bold">Size:</span>
              {{good.size}} m<sup><small>2</small></sup>
            </b-card-text>
            <b-card-text class="w-drivers-card-text"><span
              class="w-drivers-card-text-bold">Recommended storage type:</span>
              {{good.storageType}}
            </b-card-text>
          </b-card-body>
        </b-card>
        <w-multiselect
          :options="storages"
          :multiple="false"
          :custom-label="typeWithCapacity"
          size="lg"
          :allow-empty="false"
          :close-on-select="true"
          :placeholder="placeholder"
          v-model="good.storage"
        ></w-multiselect>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button
        @click="clickedSubmitButton">Finish</b-button>
      </b-col>
    </b-row>
  </b-row>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import {
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

    import WMultiselect from "../../components/WMultiselect/index";

    export default {
        name: "WGoodsForm",
        components: {
            WMultiselect,
            BRow,
            BCol,
            BCard,
            BCardImg,
            BCardTitle,
            BCardText,
            BCardBody,
            BCardFooter,
            BButton
        },
        data() {
            return {
                goods: [
                    {
                        id: 1,
                        name: "apples",
                        size: 20,
                        storageType: "cold",
                        storage: null
                    },
                    {
                        id: 2,
                        name: "wine",
                        size: 11,
                        storageType: "heated",
                        storage: null
                    },
                    {
                        id: 3,
                        name: "fish",
                        size: 30,
                        storageType: "refrigerated",
                        storage: null
                    },
                    {
                        id: 4,
                        name: "bricks",
                        size: 28,
                        storageType: "outside",
                        storage: null
                    },
                    {
                        id: 5,
                        name: "cucumbers",
                        size: 21,
                        storageType: "refrigerated",
                        storage: null
                    },
                ],
                placeholder: 'Please select storage'
            };
        },
        computed: {
            ...mapState([
                'storages'
            ])
        },
        methods: {
            ...mapActions({
                fetchStoragesList: 'fetchStoragesList'
            }),
            typeWithCapacity ({ StorageType, storageCapacity }) {
                return `${StorageType.type} — [${storageCapacity}]`
            },
            clickedSubmitButton () {
                console.log(this.goods);
            }
        },
        created: function () {
            this.fetchStoragesList({
                page: 1,
                perPage: 20,
                warehouseId: 1
            });
        }
    }
</script>

<style scoped>

</style>
