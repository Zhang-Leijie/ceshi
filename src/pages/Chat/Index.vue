<template>
  <div class="chat1-bg" :style="{'width':`${getWidth}px`}">
    <div class="chat-basic chat-list-bg">
      <div class="chat-title">
        <el-radio-group v-model="chatChoose">
          <el-badge :value="1" :max="99">
            <el-radio-button :label="1" size="mini" class="chat-radio-button">接待中</el-radio-button>
          </el-badge>
          <el-badge :value="1" :max="99">
            <el-radio-button :label="2" size="mini" class="chat-radio-button">等待中</el-radio-button>
          </el-badge>
        </el-radio-group>
        <a class="chat-basic-button is-bottom" @click="close"></a>
      </div>
      <div class="chat-list-content">
        <div class="chat-list" v-for="(item,index) in 5" :key="item" @click="rightChat(index+1)">
          <span class="chat-headImg chat-list-header"></span>
          <div class="chat-list-content">
            <h1>客服1</h1>
            <h2>这里是我和你的聊天</h2>
          </div>
          <div class="chat-list-footer">
            <h2>15:00</h2>
            <h3>1</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-basic chat-content-bg" v-show="showContent">
      <div class="chat-title is-content">
        <h1>客服1</h1>
        <a class="chat-basic-button is-cancel" @click="close"></a>
        <a class="chat-basic-button is-left" @click="showContent = false"></a>
      </div>
      <div class="chat-content-content">
        <div class="chat-left">
          <span class="chat-headImg"></span>
          <div class="chat-left-content">
            <h1><span>客服1</span><span>16:30</span></h1>
            <h2>有什么可以帮您的吗？</h2>
          </div>
        </div>
        <div class="chat-right">
          <div class="chat-right-content">
            <h1><span>16:30</span><span>我</span></h1>
            <h2>没有</h2>
          </div>
          <span class="chat-headImg"></span>
        </div>
        <div class="chat-left">
          <span class="chat-headImg"></span>
          <div class="chat-left-content">
            <h1><span>客服1</span><span>16:30</span></h1>
            <h2>有什么可以帮您的吗？</h2>
          </div>
        </div>
        <div class="chat-right">
          <div class="chat-right-content">
            <h1><span>16:30</span><span>我</span></h1>
            <h2>没有</h2>
          </div>
          <span class="chat-headImg"></span>
        </div>
        <div class="chat-left">
          <span class="chat-headImg"></span>
          <div class="chat-left-content">
            <h1><span>客服1</span><span>16:30</span></h1>
            <h2>有什么可以帮您的吗？</h2>
          </div>
        </div>
        <div class="chat-right">
          <div class="chat-right-content">
            <h1><span>16:30</span><span>我</span></h1>
            <h2>没有</h2>
          </div>
          <span class="chat-headImg"></span>
        </div>
      </div>
      <div class="chat-content-footer">
        <div class="footer-button-bg">
          <a class="emoji"></a>
          <a class="img"></a>
        </div>
        <el-input type="textarea" :rows="3" v-model="textarea" class="chat-textarea">
        </el-input>
        <div class="chat-footer-footer">
          <el-button class="chat-end" size="small">结束会话</el-button>
          <el-button type="primary" size="small" class="send">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        chatChoose: 1,
        textarea: "",
        showContent: false,
        flagNum: 0
      }
    },
    props: ["chat"],
    computed: {
      getWidth() {
        if (this.showContent) {
          return 535
        } else {
          return 220
        }
      }
    },
    methods: {
      close() {
        this.$emit('update:chat', false)
      },

      rightChat(index) {
        if (this.flagNum == index) {
          this.showContent = false
          this.flagNum = 0
        } else {
          this.showContent = true
          this.flagNum = index
        }
      }
    }
  }

</script>

<style lang="less">
  .chat-radio-button .el-radio-button__inner {
    color: #fff;
    background: #43bd56;
    border: 1px solid #fff;
    width: 70px;
    height: 25px;
    line-height: 4px;
  }

  .chat-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
  }

  .chat-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
  }

  .chat-radio-button .el-radio-button__inner:hover {
    color: #fff;
  }

  .chat-radio-button .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #42bd56;
    background-color: #fff;
    border-color: #fff;
    box-shadow: -1px 0 0 0 #42bd56;
  }

  .el-badge__content {
    border-radius: 9px;
    font-size: 14px;
    width: 18px;
    padding: 0px;
  }

  .el-badge__content.is-fixed {
    top: 5px;
    right: 15px;
    position: absolute;
    z-index: 20;
    -ms-transform: translateY(-50%) translateX(100%);
    transform: translateY(-50%) translateX(100%);
  }

  .chat-textarea {
    .el-textarea__inner {
      padding: 0 5px;
      line-height: 1em;
      border: none;
    }
  }

  .chat1-bg {
    display: flex;
    justify-content: space-between;
  }

  .chat-basic {
    position: relative;
    z-index: 999;
    background: #fff;
    border: 1px solid #cccccc;
    height: 400px;
    margin-bottom: 10px;
    text-align: center;
  }

  .chat-headImg {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #666;
  }

  .chat-list-bg {
    flex: 0 0 220px;
  }

  .chat-title {
    width: 100%;
    height: 40px;
    background: #42bd56;
    padding: 0 10px;
    text-align: left;
    padding-top: 7px;
    h1 {
      font-size: 16px;
      color: #FFF;
      display: inline-block;
    }
    .chat-basic-button {
      display: block;
      width: 18px;
      height: 18px;
      float: right;
      margin-top: 4px;
    }
    .is-bottom {
      background: url('../../assets/image/bottom.png');
      background-size: 100% 100%;
    }
  }

  .chat-list-content {
    margin-left: 10px;
    height: 360px;
    overflow: auto;
    h1 {
      font-size: 12px;
      color: #666666;
    }
    h2 {
      font-size: 10px;
      color: #cccccc;
    }
    h3 {
      width: 18px;
      height: 18px;
      background: #e62222;
      color: #FFF;
      border-radius: 50%;
      float: right;
    }
    .chat-list {
      width: 100%;
      height: 50px;
      padding: 10px 10px 10px 0;
      border-bottom: 1px solid #cccccc;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      .chat-list-header {
        flex: 0 0 30px;
      }
      .chat-list-content {
        flex: 0 0 125px;
        text-align: left;
        height: 40px;
      }
      .chat-list-footer {
        flex: 0 0 25px;
      }
    }
  }

  .chat-content-bg {
    flex: 0 0 310px;
    .is-content {
      padding-left: 20px;
      padding-right: 10px;
    }
    .is-cancel {
      background: url('../../assets/image/cancel.jpg');
      background-size: 100% 100%;
      border-radius: 50%;
      margin-left: 10px;
    }
    .is-left {
      background: url('../../assets/image/left.png');
      background-size: 100% 100%;
    }
  }

  .chat-content-content {
    width: 100%;
    height: 250px;
    border-bottom: 1px solid #ddd;
    padding: 0 10px;
    overflow: auto;
    .chat-left {
      height: 60px;
      padding: 10px 0;
      text-align: left;
    }
    .chat-left-content {
      display: inline-block;
      margin-left: 10px;
      height: 40px;
      h1 {
        font-size: 12px;
        color: #999;
      }
      span {
        &:last-child {
          margin-left: 5px;
        }
      }
      h2 {
        color: #333;
        font-size: 12px;
      }
    }
    .chat-right {
      height: 60px;
      padding: 10px 0;
      text-align: right;
    }
    .chat-right-content {
      display: inline-block;
      margin-right: 10px;
      height: 40px;
      h1 {
        font-size: 12px;
        color: #999;
      }
      span {
        &:first-child {
          margin-right: 5px;
        }
      }
      h2 {
        color: #333;
        font-size: 12px;
      }
    }
  }

  .chat-content-footer {
    .footer-button-bg {
      height: 30px;
      text-align: left;
      .emoji,
      .img {
        display: inline-block;
        margin-left: 10px;
        margin-top: 6px;
        width: 18px;
        height: 18px;
      }
      .emoji {
        background: url('../../assets/image/emoji.png');
        background-size: 100% 100%;
      }
      .img {
        background: url('../../assets/image/img.png');
        background-size: 100% 100%;
      }
    }

    .chat-footer-footer {
      text-align: right;
      .send,
      .chat-end {
        border-radius: 14px;
      }
      .send {
        margin-right: 10px;
      }
    }
  }

</style>
