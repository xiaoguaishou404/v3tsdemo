<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <button @click=" selectGirlFun(index)" v-for="(item, index) in girls" :key="index">{{ item }}:{{ index
  }}</button>
  <div>{{ selectGirl }}</div>

  <div @click="overAction">{{ overText }}</div>
  <div>{{ nowTime }}</div>
  <div><button @click="getNowTime"> getNowTime</button></div>

  <div>随机笑话</div>
  <div v-if="!loading">Loading...</div>
  <div v-if="laoded">{{ result.content }}</div>
  <div v-if="laoded">{{ result.author }}</div>
  <div v-if="laoded">{{ result.authorSlug }}</div>
  <div v-if="laoded">{{ result.dateAdded }}</div>

  <Modal></Modal>
  <Suspense>
    <template #default>
      <AsyncShow></AsyncShow>
    </template>
    <template #fallback>
      <h1>Loading....</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onRenderTracked, onRenderTriggered, watch } from 'vue';
import { nowTime, getNowTime } from './hooks/userNowTime';
import useUrlAxios from './hooks/useUrlAxios';
import Modal from './components/Modal.vue';
import AsyncShow from './components/AsyncShow.vue';
import { onErrorCaptured } from 'vue';
interface dataProps {
  girls: string[];
  selectGirl: string;
  selectGirlFun: (index: number) => void;
}

export default ({
  name: 'App',
  components: {
    Modal, AsyncShow
  },
  setup() {
    onErrorCaptured((error) => {
      console.log(error);
      return true
      
    })
    const data: dataProps = reactive({
      girls: ['sls', 'zq'],
      selectGirl: '',
      selectGirlFun: (index: number) => {
        data.selectGirl = data.girls[index]
      }
    })






    // 状态跟踪钩子函数
    // onRenderTracked((event) => {
    //   console.log(event)
    // })
    // onRenderTriggered((event) => {
    //   console.log(event)F
    // })

    // 这样写模板使用可以省略data
    const refData = toRefs(data)
    const overText = ref('love you')

    const overAction = () => {
      overText.value = "完成" + 'love you'
    }
    watch([overText, () => data.selectGirl], (newValue, oldValue) => {
      console.log(newValue)
      document.title = newValue[0] + newValue[1]
    })
    // selectGirl这样监听也行
    // watch([overText,refData.selectGirl], (newValue, oldValue) => {
    //   console.log(newValue)
    //   document.title = newValue[0]+newValue[1]
    // })

    const { result, loading, laoded, error } = useUrlAxios("https://api.quotable.io/random")

    return {
      ...refData,
      overText,
      overAction,
      nowTime,
      getNowTime,
      result, loading, laoded, error

    }
    // 这样写要加上data，使用...扩展也不行
    // return {
    //   data
    // }
  }
});



// export default defineComponent({
//   name: 'App',
//   setup() {
//     const girls = ref(['sls', 'zq'])
//     const selectGirl = ref('')
//     const selectGirlFun = (index: number) => {
//       selectGirl.value = girls.value[index]
//     }
//     return {
//       girls,
//       selectGirl,
//       selectGirlFun
//     }
//   }
// });
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
