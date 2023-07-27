<template>
  <div class="bp-container">
    <div class="input-part">
      <div ref="emojiInputRef" class="input-panel" placeholder="说点什么好呢~" contenteditable="true"> </div>
      <div id="input-action-bar" class="action-bar">
        <div class="input-content-type">
          <span class="input-type" @click.stop="handleEmojiPanelVisibility">
            <img class="emoji" src="https://cdn.sunofbeaches.com/emoji/21.png" width="16" height="16" />
            表情包
          </span>
          <span class="input-type">
            <img class="emoji" src="https://cdn.sunofbeaches.com/emoji/21.png" width="16" height="16" />
            图片
          </span>
        </div>
        <div class="input-post-btn">
          <span class="post-btn">发布</span>
        </div>
      </div>
    </div>
    <div v-show="isEmojiShow" id="emoji-part" class="emoji-part" @click.stop>
      <div class="emoji-list">
        <div v-if="historyList.length !== 0" class="emoji-title-history"> 最近使用 </div>
        <div v-if="historyList.length !== 0" class="emoji-history-list">
          <span v-for="i in historyList" :key="i">
            <img
              class="emoji-item"
              :src="'https://cdn.sunofbeaches.com/emoji/' + i + '.png'"
              @click="onEmojiClick(i)"
            />
          </span>
        </div>
        <div class="emoji-title-all"> 全部 </div>
        <div class="emoji-all-list">
          <span v-for="i in 130" :key="i">
            <img
              class="emoji-item"
              :src="'https://cdn.sunofbeaches.com/emoji/' + i + '.png'"
              @click="onEmojiClick(i)"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="emojiInput">
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  const emojiInputRef = ref()
  const historyList = ref([])
  const isEmojiShow = ref(false)
  let inputPart: HTMLElement
  let emojiPart: HTMLElement

  onMounted(() => {
    preventEmoji()
    updateHistory()
    document.addEventListener(
      'click',
      () => {
        isEmojiShow.value = false
      },
      false
    )
  })
  onBeforeUnmount(() => {
    inputPart.removeEventListener('mousedown', function (e) {
      e.preventDefault()
    })
    emojiPart.removeEventListener('mousedown', function (e) {
      e.preventDefault()
    })
    document.removeEventListener(
      'click',
      () => {
        isEmojiShow.value = false
      },
      false
    )
  })

  function preventEmoji() {
    //防止点击表情的时候输入框失去焦点
    inputPart = document.getElementById('input-action-bar')
    if (inputPart) {
      inputPart.addEventListener('mousedown', function (e) {
        e.preventDefault()
      })
    }
    emojiPart = document.getElementById('emoji-part')
    if (emojiPart) {
      emojiPart.addEventListener('mousedown', function (e) {
        e.preventDefault()
      })
    }
  }
  function handleEmojiPanelVisibility(e) {
    isEmojiShow.value = !isEmojiShow.value
    e.preventDefault()
  }
  // function removeHistory() {
  //   //清空历史
  // }
  function onEmojiClick(i) {
    //如果输入框没有焦点，那么让它获取焦点
    if (emojiInputRef.value !== document.activeElement) {
      emojiInputRef.value.focus()
    }
    //往焦点出插入内容
    let targetUrl = 'https://cdn.sunofbeaches.com/emoji/' + i + '.png'
    console.log('targetUrl==> ' + targetUrl)
    let imageTag = `<img src="${targetUrl}" class="emoji" width="20" height="20">`
    document.execCommand('insertHtml', false, imageTag)
    //保存历史记录
    //先要获取出来，然后进行拼接
    let targetStr = i.toString()
    let items = window.localStorage.getItem('emoji-history')
    if (items) {
      //进行切割
      let currentIndex = 0
      let itemArray = items.split(',')
      for (let j = 0; j < itemArray.length; j++) {
        //从头开始加,targetStr一定是有的了
        //所以，先添加逗号
        //判断i是否已经包含了
        let item = itemArray[j]
        if (targetStr.indexOf(item) === -1) {
          targetStr += ','
          targetStr += item
          currentIndex++
        }
        //1+1,2,3,4,5==>6个元素
        if (currentIndex > 5) {
          break
        }
      }
    }
    //console.log("targetStr ==> " + targetStr);
    //最多保存7个，也就是最近使用
    window.localStorage.setItem('emoji-history', targetStr)
    updateHistory()
  }

  function updateHistory() {
    let items = window.localStorage.getItem('emoji-history')
    if (items) {
      historyList.value = items.split(',')
    }
  }
</script>

<style scoped lang="less">
  .bp-container {
    position: relative;
    width: 660px;
    margin: 30px auto;
  }
  .input-part {
    padding: 10px;
  }
  .input-panel:focus {
    outline: #42b883 2px solid;
  }

  :deep(.input-panel img) {
    cursor: default;
    height: 20px;
    margin: 0 4px;
    vertical-align: sub;
    width: 20px;
  }
  .input-panel {
    font-size: 14px;
    line-height: 20px;
    min-height: 120px;
    outline: 2px solid #e5e6e7;
    padding: 10px;
    word-break: break-all;
    text-align: left;
  }
  .input-panel:empty:before {
    content: attr(placeholder);
    position: absolute;
    color: gray;
    background-color: transparent;
  }
  .action-bar {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .input-type {
    display: inline-flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
  }
  .input-type img {
    margin-right: 4px;
  }

  .post-btn {
    cursor: pointer;
    border-radius: 4px;
    padding: 5px 20px;
    background: dodgerblue;
    color: white;
    display: block;
  }

  .emoji-part {
    position: relative;
    width: 420px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .emoji-item {
    cursor: pointer;
    width: 35px;
    height: 35px;
    padding: 10px;
    transition: all 0.3s linear;
  }
  .emoji-item:hover {
    transform: scale(1.3);
    transition: transform 0.3s;
  }

  .emoji-list {
    box-shadow: 0px 0px 7px 1px #efefef;
    width: 400px;
    height: 300px;
    padding: 10px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  /*滚动条效果*/
  .emoji-list::-webkit-scrollbar {
    width: 10px;
  }

  .emoji-list::-webkit-scrollbar-track {
    background-color: #f9fafb;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }

  .emoji-list::-webkit-scrollbar-thumb {
    background-color: #e5e6eb;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }
</style>
