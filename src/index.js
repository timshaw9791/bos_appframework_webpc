import Breadcrumb from './Breadcrumb/index';
import defineTextarea from './defineTextarea/index';


const components = [
  Breadcrumb,
  defineTextarea
];

//script标签方式映入
const all = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

//支持使用标签方式引入
if (typeof window !== 'undefined' && window.Vue) {
  all(window.Vue);
}


export default {
  //总体
  all,
  //支持按需引入
  Breadcrumb,
  defineTextarea
}