import breadCrumb from './breadCrumb/index';
import defineTextarea from './defineTextarea/index';
import defineRow from './defineRow/index'
import defineSearch from './defineSearch/index'
import baseButton from './baseButton/index'
import entityInput from './entityInput/index'
import defineForm from './defineForm/index'
import bosTabs from './bosTabs/index'
import defineTable from './defineTable/index'
import defineColumn from './defineColumn/index'
import bosPaginator from './bosPaginator/index'
import baseSelect from './Input/baseSelect/index'
import dateSelect from './Input/dateSelect/index'
import defineInput from './Input/defineInput/index'
import textInput from './Input/textInput/index'


const components = [
  breadCrumb,
  defineTextarea,
  defineRow,
  defineSearch,
  baseButton,
  entityInput,
  defineForm,
  bosTabs,
  defineTable,
  defineColumn,
  bosPaginator,
  baseSelect,
  dateSelect,
  defineInput,
  textInput,
];

//script标签方式映入
const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

//支持使用标签方式引入
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  //总体
  install,
  //支持按需引入
  breadCrumb,
  defineTextarea,
  defineRow,
  defineSearch,
  baseButton,
  entityInput,
  defineForm,
  bosTabs,
  defineTable,
  defineColumn,
  bosPaginator,
  baseSelect,
  dateSelect,
  defineInput,
  textInput,
}