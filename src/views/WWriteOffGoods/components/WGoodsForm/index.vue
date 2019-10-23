<template>
  <b-form @submit.prevent="onSubmit" class="w-goods-update-form">
    <b-form-input
      size="lg"
      v-model="form.name"
      type="string"
      required
      disabled
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.count"
      required
      disabled
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.updatedCount"
      type="number"
      min="1"
      required
      placeholder="Count"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.volume"
      required
      disabled
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.updatedVolume"
      type="number"
      min="1"
      required
      placeholder="Volume(m³)"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.weight"
      required
      disabled
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.updatedWeight"
      type="number"
      min="1"
      required
      placeholder="Weight(kg)"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.price"
      required
      disabled
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.updatedPrice"
      type="number"
      min="1"
      required
      placeholder="Price($)"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.status"
      type="string"
      required
      placeholder="Status"
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
