### 安装

```git
pnpm i @dirtywei/vue3-emoji-input

```

### 注册

在 main.ts 注册插件

```js
import { createApp } from 'vue'

import App from './App.vue'
import EmojiInput from '@dirtywei/vue3-emoji-input'
import '@dirtywei/vue3-emoji-input/dist/style.css'

const app = createApp(App)
app.use(EmojiInput) // 新增
app.mount('#app')
```

### 使用

```html
<template>
  <EmojiInput></EmojiInput>
</template>

<script setup lang="ts"></script>
```
