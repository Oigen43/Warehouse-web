<template>
  <b-form @submit.prevent="onSubmit" class="w-chart-form">
    <div>
      <b-col>
      <b-form-input
        id="start-date-input"
        size="lg"
        :max="maxDate"
        v-model="form.startDate"
        required
        type="date"
        class="w-chart-form-input"
      ></b-form-input>
      </b-col>

      <b-col>
      <b-form-input
        id="end-date-input"
        size="lg"
        :max="maxDate"
        v-model="form.finalDate"
        required
        type="date"
        class="w-chart-form-input"
      ></b-form-input>
      </b-col>

      <b-col>
      <b-button
        type="submit"
        variant="outline-dark"
        size="lg"
        class="w-chart-form-button">
        Draw chart
      </b-button>
      </b-col>
    </div>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton, BCol } from 'bootstrap-vue';

    export default {
        name: 'WChartOptions',
        components: {
            BCol,
            BForm,
            BFormInput,
            BButton
        },
        props: {
            date: {
                type: Object
            }
        },
        data() {
            return {
                form: {
                    startDate: this.date.startDate,
                    finalDate: this.date.finalDate
                }
            };
        },
        computed: {
            maxDate() {
                const date = new Date();
                const year = date.getFullYear();
                const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                const day = (date.getDate() + 1) < 10 ? '0' + (date.getDate()) : (date.getDate());

                return `${year}-${month}-${day}`;
            }
        },
        methods: {
            onSubmit() {
                this.$emit('form-submitted', this.form);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import 'styles';
</style>
