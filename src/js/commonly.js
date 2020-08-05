import Vue from 'vue'
export function resStatus(res,path='',text='保存成功',text2='操作失败',code=200,){
  if(res.data == ''){
    this.$Message.error(text2)
  }else if(res.status == code){
    this.$Message.success(text)
    if(path != ''){
      this.$router.push(path)
    }
  }
}

export function exportData(url,data=''){
    let a = document.createElement('a')
    let burl = this.$baseURL
    let clickurl = `${burl}${url}${data}`
    a.href = clickurl
    a.click();
}

export function formatTime(res){
  res.forEach(item => {
    item.createTime = this.$filterTime(item.createTime)
    item.updateTime = this.$filterTime(item.updateTime)
  })
}