<template>
    <div class="dialog" :data-title="title">
        <el-dialog :title="title" :visible.sync="showFlag" v-if="showFlag" center :before-close="handleClose"
                   :width="width">
            <slot></slot>

            <el-dialog
                    v-if="secondary"
                    width="30%"
                    title="提示"
                    :visible.sync="innerVisible"
                    append-to-body
                    center>
                <div class="_dialogDiv">
                    您确定要放弃本次操作吗?
                </div>
                <div slot="footer" class="dialog-footer" v-if="!ismore">
                    <el-button @click="innerVisible = false" data-test="button" >取 消</el-button>
                    <el-button type="primary" @click="cancel" data-test="button" >确 定</el-button>
                </div>
            </el-dialog>

            <div slot="footer" class="dialog-footer" v-if="button">
                <el-button @click="cancelDb" data-test="button" name="取消">{{ cancelInfo }}</el-button>
                <el-button type="primary" :disabled="disabled" @click="dialogConfirm" data-test="button" name="确定">{{ confirmInfo
                    }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'serviceDialog',
        data() {
            return {
                showFlag: false,
                innerVisible: false,
                disabled: false,
            }
        },
        props: {
            title: {
                type: String,
                default: '标题'
            },
            width: {
                type: String,
            },
            button: {
                type: Boolean,
                default: true
            },
            secondary: {
                type: Boolean,
                default: true
            },
            confirmInfo: {
                type: String,
                default: "确 定"
            },
            cancelInfo: {
                type: String,
                default: "取 消"
            },
            ismore: {
                type: Boolean,
                default: false
            },
            isShow: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            show() {
                this.showFlag = true;
            },
            hide() {
                this.showFlag = false;
            },
            dialogConfirm() {
                this.disabled = true;
                setTimeout(() => this.disabled = false, 1000)
                this.$emit('confirm');
                this.$emit('confirmWare')
            },
            cancel() {
                this.innerVisible = false;
                this.showFlag = false;
                this.$emit('cancel', 'end');
            },
            handleClose(done) {
                if (this.secondary) {
                    this.innerVisible = true;
                } else {
                    this.hide();
                    this.$emit('firstCancel')
                }
            },
            cancelDb() {
                if (this.secondary) {
                    this.innerVisible = true
                } else {
                    this.hide();
                    this.$emit('firstCancel')
                }
            }
        },
        watch: {
            'isShow': {
                handler(newVal) {
                    if (newVal) {
                        console.log(newVal)
                        this.showFlag = true;
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .dialog {
        font-size: 0.0833rem;

        /deep/ .el-dialog__header {
            background: #2F2F76 !important;
        }

        /deep/ .el-dialog__title {
            color: white;
        }

        /deep/ .el-dialog__headerbtn /deep/ .el-dialog__close {
            color: white;
        }
    }
</style>