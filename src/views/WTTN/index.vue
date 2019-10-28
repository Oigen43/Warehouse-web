<template>
  <div id="content">
    <h1 class="w-ttn-form-h1">Goods Consignment Note #{{ updatedTTN.number }}</h1>
    <b-row v-if="updatedTTN.id && goods.length">
      <b-col class="w-ttn-form-col" lg="3" md="12" offset-lg="1" align-self="start">
        <w-form
          @click-download="clickedDownloadButton"
          :id="updatedTTN.id"
          :number="updatedTTN.number"
          :dischargeDate="updatedTTN.dischargeDate"
          :receiver="updatedTTN.Receiver"
          :sender="updatedTTN.Sender"
          :carrier="updatedTTN.Carrier"
          :transport="updatedTTN.Transport"
          :driver="updatedTTN.Driver"
          :warehouse="updatedTTN.Warehouse"
          :description="updatedTTN.description"
          :dispatcher="updatedTTN.User"
          :registrationDate="updatedTTN.registrationDate"
          :type="updatedTTN.type"
        ></w-form>
        <b-button
          variant="link"
          to="/gcn"
          class="w-ttn-go-back-link"
        >Go Back
        </b-button>
      </b-col>
      <b-col class="w-ttn-form-col" lg="6" md="12" offset-lg="1">
        <w-goods
          :goods="goods"
          :type="type"
        ></w-goods>
      </b-col>
    </b-row>
    <div id="pdf"></div>
  </div>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapState, mapActions } from 'vuex';
    import JsPDF from 'jspdf';
    import html2canvas from 'html2canvas';

    import types from '../../constants/TTNtypes';
    import WForm from './components/WForm';
    import WGoods from '../../components/WGoodsList';

    export default {
        name: 'WTTN',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
            WGoods
        },
        data() {
            return {
                name: ''
            };
        },
        computed: {
            ...mapState([
                'updatedTTN'
            ]),
            registrationDate() {
                return this.updatedTTN.registrationDate;
            },
            TTNId() {
                return +this.$route.params.TTNId;
            },
            goods() {
                return this.updatedTTN.Goods;
            },
            type() {
                return types.OUTCOMING_TYPE;
            }
        },
        methods: {
            ...mapActions({
                getUpdatedTTNData: 'getUpdatedTTN'
            }),
            clickedDownloadButton() {
                const pdfName = 'test';
                const doc = new JsPDF();
                const element = document.getElementById('content');

                html2canvas(element).then(canvas => {
                    const imgData = canvas.toDataURL('image/jpeg');
                    doc.addImage(imgData, 'JPEG', 0, -40, 190, 190);
                    doc.save(pdfName + '.pdf');
                });
            }
        },
        created: async function () {
            await this.getUpdatedTTNData(this.TTNId);
        }
    }
    ;
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
