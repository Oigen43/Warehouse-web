<template>
  <b-form @submit.prevent="onSubmit" class="w-storages-form">
    <h1 class="w-goods-form-h1">{{ headerName }}</h1>
    <label
      class="w-goods-form-input-label"
      for="goods-name">
      Goods name:
    </label>
    <b-form-input
      id="goods-name"
      size="lg"
      v-model="form.name"
      required
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-count">
      Count:
    </label>
    <b-form-input
      id="goods-count"
      size="lg"
      v-model="form.count"
      required
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-volume">
      Volume (m³):
    </label>
    <b-form-input
      id="goods-volume"
      size="lg"
      v-model="form.volume"
      type="number"
      min="1"
      required
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-weight">
      Weight (kg):
    </label>
    <b-form-input
      id="goods-weight"
      size="lg"
      v-model="form.weight"
      type="number"
      min="1"
      required
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-price">
      Price ($):
    </label>
    <b-form-input
      id="goods-price"
      size="lg"
      v-model="form.price"
      type="number"
      min="1"
      required
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-recommendation">
      Storage type recommendation:
    </label>
    <b-form-input
      id="goods-recommendation"
      size="lg"
      v-model="form.recommendation"
      required
      class="w-goods-form-input"
    ></b-form-input>
    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-goods-form-button">
      {{ submitButtonName }}
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
            submitButtonName: {
                type: String
            },
            headerName: {
                type: String
            },
            name: {
                type: String
            },
            volume: {
                type: String
            },
            count: {
              type: String
            },
            weight: {
                type: String
            },
            price: {
                type: String
            },
            recommendation: {
                type: String
            }
        },
        data: function () {
            return {
                form: {
                    name: this.name,
                    volume: this.volume,
                    count: this.count,
                    weight: this.weight,
                    price: this.price,
                    recommendation: this.recommendation
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
