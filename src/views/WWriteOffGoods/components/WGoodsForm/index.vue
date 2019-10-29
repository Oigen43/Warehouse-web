<template>
  <b-form @submit.prevent="onSubmit" class="w-goods-update-form">
    <label
      class="w-goods-form-input-label"
      for="goods-name">
      Goods name:
    </label>
    <b-form-input
      id="goods-name"
      size="lg"
      v-model="form.name"
      type="string"
      required
      disabled
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-ttn-count">
      Count according to TTN:
    </label>
    <b-form-input
      id="goods-ttn-count"
      size="lg"
      v-model="form.count"
      required
      disabled
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-count">
      Current count:
    </label>
    <b-form-input
      id="goods-count"
      size="lg"
      v-model="form.updatedCount"
      type="number"
      min="1"
      required
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-ttn-volume">
      Volume according to TTN (m³):
    </label>
    <b-form-input
      id="goods-ttn-volume"
      size="lg"
      v-model="form.volume"
      required
      disabled
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-volume">
      Current volume (m³):
    </label>
    <b-form-input
      id="goods-volume"
      size="lg"
      v-model="form.updatedVolume"
      type="number"
      min="1"
      required
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-ttn-weight">
      Weight according to TTN (kg):
    </label>
    <b-form-input
      id="goods-ttn-weight"
      size="lg"
      v-model="form.weight"
      required
      disabled
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-weight">
      Current weight (kg):
    </label>
    <b-form-input
      id="goods-weight"
      size="lg"
      v-model="form.updatedWeight"
      type="number"
      min="1"
      required
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-ttn-price">
      Price according to TTN ($):
    </label>
    <b-form-input
      id="goods-ttn-price"
      size="lg"
      v-model="form.price"
      required
      disabled
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-price">
      Current price ($):
    </label>
    <b-form-input
      id="goods-price"
      size="lg"
      v-model="form.updatedPrice"
      type="number"
      min="1"
      required
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-status">
      Status:
    </label>
    <b-form-input
      id="goods-status"
      size="lg"
      v-model="form.status"
      type="string"
      required
      class="w-goods-form-input"
    ></b-form-input>
    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-goods-form-button">
      WRITE-OFF ITEM
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WGoodsForm',
        components: {
            BForm,
            BFormInput,
            BButton
        },
        props: {
            name: {
                type: String
            },
            volume: {
                type: Number
            },
            count: {
                type: Number
            },
            weight: {
                type: Number
            },
            price: {
                type: String
            }
        },
        data: function () {
            return {
                form: {
                    name: this.name,
                    volume: this.volume,
                    updatedVolume: '',
                    count: this.count,
                    updatedCount: '',
                    weight: this.weight,
                    updatedWeight: '',
                    price: this.price,
                    updatedPrice: '',
                    status: ''
                },
            };
        },
        methods: {
            onSubmit() {
                this.$emit('form-submitted', this.form);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
