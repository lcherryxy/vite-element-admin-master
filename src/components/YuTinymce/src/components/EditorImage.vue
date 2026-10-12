<template>
  <div class="upload-container">
    <el-button
      :style="{ background: color, borderColor: color }"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible = true"
    >
      upload
    </el-button>
    <el-dialog v-model:visible="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="https://httpbin.org/post"
        list-type="picture-card"
      >
        <el-button size="small" type="primary"> Click upload </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false"> Cancel </el-button>
      <el-button type="primary" @click="handleSubmit"> Confirm </el-button>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Element Plus：图片未全部上传完时用 ElMessage 提示
import { ElMessage } from 'element-plus'

defineOptions( {
  name : 'EditorSlideUpload'
} )

defineProps( {
  color : {
    type : String,
    default : '#1890ff'
  }
} )

const emit = defineEmits( ['successCBK'] )

const dialogVisible = ref( false )
const listObj = ref( {} )
const fileList = ref( [] )

const checkAllSuccess = () => {
  return Object.keys( listObj.value ).every( ( item ) => listObj.value[item].hasSuccess )
}

const handleSubmit = () => {
  const arr = Object.keys( listObj.value ).map( ( v ) => listObj.value[v] )
  if ( !checkAllSuccess() ) {
    ElMessage(
      'Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!'
    )
    return
  }
  emit( 'successCBK', arr )
  listObj.value = {}
  fileList.value = []
  dialogVisible.value = false
}

const handleSuccess = ( response, file ) => {
  const uid = file.uid
  const objKeyArr = Object.keys( listObj.value )
  for ( let i = 0, len = objKeyArr.length; i < len; i++ ) {
    if ( listObj.value[objKeyArr[i]].uid === uid ) {
      listObj.value[objKeyArr[i]].url = response.files.file
      listObj.value[objKeyArr[i]].hasSuccess = true
      return
    }
  }
}

const handleRemove = ( file ) => {
  const uid = file.uid
  const objKeyArr = Object.keys( listObj.value )
  for ( let i = 0, len = objKeyArr.length; i < len; i++ ) {
    if ( listObj.value[objKeyArr[i]].uid === uid ) {
      delete listObj.value[objKeyArr[i]]
      return
    }
  }
}

const beforeUpload = ( file ) => {
  const _URL = window.URL || window.webkitURL
  const fileName = file.uid
  listObj.value[fileName] = {}
  return new Promise( ( resolve ) => {
    const img = new Image()
    img.src = _URL.createObjectURL( file )
    img.onload = function() {
      listObj.value[fileName] = {
        hasSuccess : false,
        uid : file.uid,
        width : this.width,
        height : this.height
      }
    }
    resolve( true )
  } )
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  :deep(.el-upload--picture-card) {
    width: 100%;
  }
}
</style>
