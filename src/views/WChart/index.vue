<template>
  <div>
      <chart
        :options="chartOptions"
      ></chart>
      <b-row>
       <b-col class="w-chart-form" lg="4" offset-lg="4">
          <w-chart-options-form
            @form-submitted="sendData"
            :date="date"
          >
          </w-chart-options-form>
        </b-col>
      </b-row>
  </div>
</template>

<script>
    import {Chart} from 'highcharts-vue'
    import { BRow, BCol } from 'bootstrap-vue';
    import { mapActions } from 'vuex';

    import WChartOptionsForm from '../../components/WChartOptionsForm/index';

    export default {
        name: 'WChart',
        components: {
            BRow,
            BCol,
            Chart,
            WChartOptionsForm
        },
        data() {
            return {
                chartOptions: {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Fruit Consumption'
                    },
                    xAxis: {
                        categories: ['Apples', 'Bananas', 'Oranges']
                    },
                    yAxis: {
                        title: {
                            text: 'Fruit eaten'
                        }
                    },
                    series: [{
                        name: 'Jane',
                        data: [1, 0, 4]
                    }, {
                        name: 'John',
                        data: [5, 7, 3]
                    }]
                },
                date: {
                    startDate: '',
                    finalDate: ''
                }
            };
        },
        methods: {
            ...mapActions({
                getPrices: 'getPrices'
            }),
            async sendData(date) {
                console.log(date);
                await this.getPrices(date);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import 'styles';
</style>
