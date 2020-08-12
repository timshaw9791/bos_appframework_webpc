import defineProgress from './defineProgress.vue'

defineProgress.intall = function (Vue){
  Vue.component(defineProgress.name, defineProgress);
};

export default defineProgress;

