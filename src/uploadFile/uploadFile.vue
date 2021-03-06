<template>
    <div data-upload-container="entity-upload-container" :data-label="'上传'"
         class="upload-file-container" :class="[size,{border}]" 
        :style="`margin:${margin};float:${align}`">
        <input type="file" class="file" :accept="acceptType" @change="changeFile" ref="file">
        <div class="icon-box" @click="showFileSelect">
            <i class="iconfont iconjiahao" v-show="!disabled&&!fileName"></i>
            <i class="iconfont iconPDF" v-show="type=='pdf'&&fileName"></i>
            <i class="iconfont icondianshi-shipinsuolve" v-show="type=='video'&&fileName"></i>
            <i class="iconfont iconwenbenkuangshanchu1" v-show="fileName&&!disabled" @click.stop="remove"></i>
            <img :src="imgSrc" class="img" v-if="fileName&&type=='img'" alt="图片加载失败"  :onerror="noImgUrl">
            <img src="@/assets/noThumbnails.png" class="img" v-if="disabled&&!fileName" >
        </div>
        <span class="label" v-show="['pdf','video'].includes(type)">{{ fileName }}</span>
        <div class="progress-box" v-if="loading">
            <define-progress :percentage="percentage" :textInside="true" class="define-progress"></define-progress>
            <span class="cancel" @click="cancel">取消上传</span>
        </div>
    </div>
</template>

<script>
import { imgBaseUrl, pdfBaseUrl, videoBaseUrl, imgUpUrl, pdfUpUrl, videoUpUrl } from '../js/config'
import axios from 'axios'
import defineProgress from '../defineProgress/defineProgress.vue'
export default {
    name: 'uploadFile',
    components: { defineProgress },
    data() {
        return {
            fileName: '',
            fetch: '',
            loading: false,
            percentage: 0,
            cancelHandler: null, // 取消上传请求的实例
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: event => {
                    this.percentage = Number((event.loaded/event.total*100).toFixed(1));
                }
            },
            noImgUrl: "'this.src='"+ require('../assets/noImg.png')+"'"
        }
    },
    props: {
        size: {
            type: String,
            default: 'medium'
        },
        type: {
            type: String,
            default: 'img',
            validator: function(value) {
                return ['img','pdf','video'].includes(value)
            }
        },
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        margin: {
            type: String,
            default: '0'
        },
        align: {
            type: String,
            default: 'none'
        }
    },
    computed: {
        acceptType() {
            return this.type=='img'?'.jpg,.jpeg,.png,.JPG,.JPEG':this.type=='pdf'?'.pdf':'video/*'
        },
        imgSrc() {
            return `${imgBaseUrl}${this.fileName}`;
        },
        border() {
            return ['video', 'pdf'].includes(this.type)?true:(this.disabled||this.fileName)?false:true
        }
    },
    methods: {
        init() {
            this.fetch = axios.create({
                withCrDedentials: true
            });
        },
        showFileSelect() {
            if(this.disabled||this.loading||this.fileName) return;
            this.$refs.file.click();
        },
        changeFile() {
            let file = this.$refs.file.files[0];
            if(!file) return;
            switch (this.type) {
                case 'img':
                    this.upFile(imgUpUrl, file);
                    break;
                case 'pdf':
                    this.upFile(pdfUpUrl, file);
                    break;
                case 'video':
                    this.upFile(videoUpUrl, file);
                    break;
                default:
                    break;
            }
            // this.fileName = file.name;
            // this.$emit('input', this.fileName);
        },
        upFile(url, file) {
            let param = new FormData();
            param.append('file', file, file.name);
            this.cancelHandler = axios.CancelToken.source(); // 取消请求的工厂方法
            this.config.cancelToken = this.cancelHandler.token;
            this.loading = true;
            this.fetch.post(url, param, this.config).then(res => {
                this.fileName = res.data;
                this.loading = false;
                this.$emit('input', this.fileName);
            }).catch(err => {
                if(err.message) {
                    this.$message.info(err.message);
                }
                this.loading = false;
            })
        },
        cancel() {
            this.cancelHandler.cancel('取消上传');
            this.$refs.file.value = '';
            this.percentage = 0;
        },
        remove() { // 删除
            this.fileName = '';
            this.$emit('input', '');
            // 清空input[type=file]的选择缓存，避免选择同一文件不触发change事件
            this.$refs.file.value = '';
            this.percentage = 0;
        }
    },
    watch: {
        value: {
            handler(val) {
                this.fileName = val
                this.init()
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss" scoped>
.upload-file-container {
    display: inline-block;
    position: relative;
    text-align: center;
    vertical-align: top; // 解决fontSize导致div下沉问题
    .file {
        width: 0;
        height: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
    }
    .img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .progress-box {
        display: grid;
        // align-items: center;
        background-color: hsla(0,0%,100%,.8);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 10px;
        user-select: none;
    }
    .define-progress {
        align-self: flex-end;
    }
    .cancel {
        margin-top: 6px;
        color: #aaa;
        opacity: 0;
        cursor: pointer;
    }
}
.upload-file-container:hover {
    .iconwenbenkuangshanchu1 {
        display: block;
    }
    .cancel {
        opacity: 1;
    }
}
.border {
    border: 1px dashed #d9d9d9;
}
.tiny {
    width: 30px;
    height: 30px;
}
.mini {
    width: 60px;
    height: 60px;
}
.small {
    width: 100px;
    height: 100px;
}
.medium {
    width: 150px;
    height: 150px;
}
.large {
    width: 200px;
    height: 200px;
}
.icon-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.iconPDF,
.icondianshi-shipinsuolve {
    font-size: 60px;
}
.iconwenbenkuangshanchu1 {
    display: none;
    position: absolute;
    top: 2px;
    right: 0;
}
</style>