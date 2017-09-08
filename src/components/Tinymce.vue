<template>
  <div>
    <textarea :id="id">
        <slot></slot>
    </textarea>
    <input style="display: none;" :id="inputId" type="file" accept="image/*">
  </div>
</template>
<script>
let tinymceInitIndex = 0
export default {
    name: 'tinymce',
    props: {
      height: {
        type: Number,
        default: 400,
        required: false
      },
      content:{
        type: String,
        default: "",
        required: false
      },
    },
    components: {
    },
    methods:{
      setContent(content){
        this.Promise.then((editors)=>{
          this.editor.setContent(content)
        })
      },
      getContent(){
        console.log(this.editor.getContent())
        return this.editor.getContent()
      },
      clearContent(){
        this.editor.setContent("");
      }
    },
    computed: {
      inputId(){
        return `${this.id}-input`
      }
    },
    data () {
      return {
        id: `tinymce-${tinymceInitIndex++}`,
        Promise: undefined,
        editor: undefined,
      }
    },
    mounted(){
      const vm = this;
      this.Promise = tinymce.init({
        selector: `#${this.id}`,
        height: this.height,
        theme: 'modern',
        language: 'zh_CN',
        plugins: [
          'lineheight advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons template powerpaste textcolor colorpicker textpattern imagetools'
        ],
        toolbar1: 'insertfile undo redo | fontselect | fontsizeselect | styleselect | lineheightselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
        toolbar2: 'link image media | forecolor backcolor emoticons print preview', //| example
        font_formats: '宋体=SimSun,STSong;黑体=SimHei,STHeiti;微软雅黑=Microsoft YaHei;楷体=KaiTi,STKaiti;Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',
        lineheight_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 60pt 72pt',
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 60pt 72pt',
        indentation: '2em',
        init_instance_callback: function (editor) {
          // 初始化实例回调函数
          editor.on('keydown', function (e) {
            // tab键缩紧2格
            if(e.keyCode == 9){
                e.preventDefault();
                this.execCommand("Indent");
            }
          });
          editor.on('keyup', function (e) {
            if(e.keyCode == 9){

            }
          });
        },
        file_picker_callback: function(callback, value, meta) {
          // Provide file and text for the link dialog
          if (meta.filetype == 'file') {
            // callback('mypage.html', {text: 'My text'});
          }
          // Provide image and alt text for the image dialog
          if (meta.filetype == 'image') {
            const input = document.getElementById(vm.inputId)
            input.click()
            input.onchange = (e)=>{
              var file = e.target.files[0]
              var formData = new FormData()
              // state.uploading = true
              formData.append('file', file)
              Promise.resolve($.ajax({
                  url: '/v1/common/upload',
                  data: formData,
                  type: "POST",
                  processData: false,
                  contentType: false,
                  cache: false
              })).then(function(res){
                  console.log(res)
                  callback("https://api.fa-zai.com/upload/"+res.data)
                  input.value = ''
              })
              // 上传图片api
              // 成功之后调用callback写入url
              
              // 成功之后记得清除input的值，否则无法再次触发change事件
              
            }
          }
          if (meta.filetype == 'media') {
            // callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
          }
        },
        file_browser_callback_types: 'image',
        powerpaste_word_import: 'propmt',// propmt, merge, clear
        powerpaste_html_import: 'propmt',// propmt, merge, clear
        powerpaste_allow_local_images: true,
        paste_data_images: true,
        images_upload_handler: function (blobInfo, success, failure) {
          // 提取word中的图片上传至服务器
          // var fd = new FormData();
          // fd.append("file",blobInfo.blob());
          // 接着进行ajax
        },
        content_style: "body{font-family: sans-serif !important;}"
      })
      .then((editors)=>{
        this.editor = editors[0];
        setTimeout(() => {
            this.editor.setContent(this.content);
        }, 1000);
      })

    }
}
</script>
