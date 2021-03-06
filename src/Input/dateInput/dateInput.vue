<template>
    <div data-input-container="entity-input-container" :data-label="label"
         class="date-input-container" ref="dateInput" :style="`width:${fixWidth};float:${align};margin:${fixMargin};}`"
         :class="[styleObj,{'disabled':disabled&&inTableStateContrl,'border':(tableEdit&&edit),'inTable':inTable}]"
         @click="changeEditState(true)">
        <div class="label" v-if="!inTable">{{ label }}
            <span class="required" v-if="required">*</span>
        </div>
        <input type="text" class="input" :disabled="disabled" v-model="insideValue"
               :style="`text-align: ${fixInputTextAlign}`" :class="{inTable:inTable}"
               @change="reg" :readonly="!(tableEdit&&edit)" :placeholder="placeholder"
               @blur="changeEditState(false)" @keydown.13="changeEditState(false)"/>
        <div class="icon">
            <i class="iconfont iconwenbenkuangshanchu" @click="clear"
               v-show="insideValue!=''&&clearable&&!disabled&&tableEdit&&edit"></i>
        </div>
    </div>
</template>
<script>
    import {stampToNow, interval} from '../../js/index'

    export default {
        name: "dateInput",
        data() {
            return {
                insideValue: "",
                inTable: false,
                edit: true, // 内部判断是否只读
                inTableStateContrl: true,
                styleObj: {
                    error: false,
                    'table-error': false
                },
            }
        },
        props: {
            filter: {
                type: String,
                default: 'toDay'
            },
            label: {
                type: String,
                default: "标题"
            },
            value: {
                type: [String, Number],
                default: ""
            },
            column: {
                type: Number,
                default: 3
            },
            align: {
                type: String,
                default: "none"
            },
            margin: {
                type: String,
                default: "3px 0.0521rem"
            },
            disabled: {
                type: Boolean,
                default: false
            },
            tableEdit: {
                type: Boolean,
                default: true
            },
            clearable: { // 是否可清空
                type: Boolean,
                default: true
            },
            required: { // 是否必填
                type: Boolean,
                default: false
            },
            placeholder: {
                type: [Number, String],
                default: "--"
            },
            validate: { // 验证函数
                type: [Function, Boolean],
                default: false
            },
        },
        methods: {
            clear() {
                this.insideValue = "";
                this.reg(); // 这里貌似没有触发change事件。暂且手动触发
            },
            reg() {
                if (this.required && !this.value) {
                    this.inTable ? this.styleObj['table-error'] = true : this.styleObj['error'] = true;
                    return false;
                }
                this.inTable ? this.styleObj['table-error'] = false : this.styleObj['error'] = false;
                return true;
            },
            changeEditState(state) {
                if (!this.inTable || this.disabled) return;
                this.edit = state;
            },
            fixValue(value) {
                if (this.validate) {
                    this.insideValue = this.validate(value);
                    return;
                }
                switch (this.filter) {
                    case 'toDay':
                        this.insideValue = value < 0 ? 0 : Math.floor(value / 1000 / 3600 / 24) || '';
                        break;
                    case 'since':
                        this.insideValue = stampToNow(value);
                        break;
                    case 'interval':
                        this.insideValue = interval(value);
                        break;
                    default:
                        this.insideValue = value
                        break;
                }
            }
        },
        computed: {
            fixWidth() {
                return this.inTable ? `calc(100% - 0.1042rem)` : `calc(${8.33 * this.column}% - 0.1042rem)`;
            },
            fixMargin() {
                return this.inTable ? '0' : this.margin
            },
            fixInputTextAlign() {
                return this.inTable ? 'center' : 'left'
            }
        },
        watch: {
            insideValue(val) {
                if (this.validate) {
                    return;
                }
                switch (this.filter) {
                    case 'toDay':
                        this.$emit('input', val * 1000 * 24 * 3600);
                        break;
                    case 'since':
                        break;
                    case 'interval':
                        break;
                    default:
                        this.$emit('input', val);
                        break;
                }
            },
            value(newVal, oldVal) {
                if (!oldVal && newVal) {
                    this.fixValue(this.value);
                }
            }
        },
        created() {
            this.fixValue(this.value);
        },
        mounted() {
            try {
                if (this.$refs.dateInput.parentNode.parentNode.nodeName == 'TD') {
                    this.inTable = true;
                    this.edit = false;
                    this.disabled && (this.inTableStateContrl = false);
                }
            } catch (error) {
                console.log("当前组件不存在上两级节点");
            }
        }
    };
</script>

<style lang="scss" scoped>
    input[type=Number]::-webkit-inner-spin-button {
        display: none;
    }

    .date-input-container {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        height: 40px;
        max-height: 40px;
        border-radius: 4px;
        box-sizing: border-box;
        margin: 0 0.0521rem;
        min-width: 50px;

        .icon {
            width: 35px;
            padding: 0 10px 0 0;
            position: absolute;
            right:0;
        }
        .iconwenbenkuangshanchu {
            display: none;
        }

        .label {
            min-width: 55px;
            padding: 0 10px;
            color: #909399;
            overflow: hidden;
            flex-shrink: 0;
        }

        .required {
            color: red;
        }


        .input {
            width: 100%;
            // flex-grow: 1;
            height: 100%;
            font-size: 16px;
            outline-style: none;
            border-radius: 4px;
            border: 0px;
            background-color: transparent;
            color: #707070;
        }

        input::-webkit-input-placeholder {
            color: #C0C4CC;
        }


    }

    .border {
        border: 1px solid #DCDFE6;
    }

    .error {
        border: 1px solid red;
    }

    .table-error {
        .input {
            color: red;
        }
    }

    .disabled {
        background: rgba(248, 249, 251, 1);
        border: 1px solid rgba(220, 223, 230, 1);

        .input {
            color: rgba(192, 196, 204, 1);
        }
    }

    .inTable{
        height: 30px;
    }

    .date-input-container:hover {
        .iconwenbenkuangshanchu {
            display: inline-block;
        }
    }
</style>