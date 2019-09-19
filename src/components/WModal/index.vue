<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';
    import { ModalPlugin } from 'bootstrap-vue';

    Vue.use(ModalPlugin);

    export default {
        name: 'WModal',
        computed: {
            ...mapState([
                'modal'
            ])
        },
        watch: {
            modal(newVal, oldVal) {
                this.createModal(this.modal);
            }
        },
        methods: {
            ...mapActions({
                setModalValue: 'setModalValue'
            }),
            createModal(modal) {
                this.$bvModal.msgBoxConfirm(modal.text, {
                    title: modal.title,
                    size: modal.size,
                    buttonSize: modal.buttonSize,
                    okVariant: modal.okVariant,
                    cancelVariant: modal.cancelVariant,
                    okTitle: modal.okTitle,
                    cancelTitle: modal.cancelTitle,
                    footerClass: modal.footerClass,
                    hideHeaderClose: modal.hideHeaderClose,
                    centered: modal.centered
                })
                    .then(value => {
                        this.setModalValue(value);
                    });
            }
        }
    };
</script>

<style scoped>

</style>
