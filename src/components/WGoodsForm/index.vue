<template>
  <b-form @submit.prevent="onSubmit" class="w-storages-form">
    <h1 class="w-goods-add-form-h1">{{ headerName }}</h1>
    <b-form-input
      size="lg"
      v-model="form.name"
      required
      placeholder="Name"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.count"
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
      placeholder="Volume(m²)"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.weight"
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
      min="1"
      required
      placeholder="Price($)"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.recommendation"
      required
      placeholder="Recommendation"
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
