<template>
  <b-form @submit.prevent="onSubmit" class="w-goods-update-form">
    <b-form-input
      size="lg"
      v-model="form.name"
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
      required
      placeholder="Count"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.volume"
      type="number"
      min="1"
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
      placeholder="Volume(m²)"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.weight"
      type="number"
      min="1"
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
      type="number"
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
      UPDATE ITEM
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
