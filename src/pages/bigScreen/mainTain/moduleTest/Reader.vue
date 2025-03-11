<template>
  <div class="box-border w-full">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>读写器</span>
    </div>
    <section class="box-border flex flex-wrap gap-20">
      <div
        v-for="(reader, index) in props.data"
        :key="index"
        class="box-border w450px p-l-3em p-t-1em"
      >
        <div class="text-[18px]">
          {{ reader.readerName }}：
        </div>
        <br>
        <a-input
          v-model:value="reader.value"
          size="large"
          placeholder="读卡器数据"
          allow-clear
          :maxlength="40"
        />
        <div class="mt10 box-border flex justify-between">
          <a-button
            type="link"
            class="btn hover:text-[#89f7ff]!"
            @click="
              transfer('/ips-r/read-test-data', index, reader.deviceIndex)
            "
          >
            读测试数据
          </a-button>
          <a-button
            type="link"
            class="btn hover:text-[#89f7ff]!"
            @click="transfer('/ips-r/read-card-uid', index, reader.deviceIndex)"
          >
            读卡UID
          </a-button>
          <a-button
            type="link"
            class="btn hover:text-[#89f7ff]!"
            @click="
              transfer(
                '/ips-r/write-test-data',
                index,
                reader.deviceIndex,
                reader.value,
              )
            "
          >
            写入测试数据
          </a-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { App } from 'ant-design-vue';
import { getApiTransfer } from '@/apis/webApi';
import { useAppStore } from '@/store/index';

const props = defineProps({
  data: Object,
  updateItem: Function,
});
const { notification } = App.useApp();
async function transfer(url, index, deviceIndex, inputData) {
  try {
    useAppStore().setSpinning(true);
    const params = {
      transURI: url,
      paraIn: {
        objs: [{ deviceIndex, data: inputData }],
      },
    };
    const data = await getApiTransfer(params);
    if (data.rslts[0].code === 0) {
      props.updateItem(
        'readers',
        index,
        url === '/ips-r/read-test-data'
          ? data.rslts[0].data
          : data.rslts[0].cardUid,
      );
      if (url === '/ips-r/write-test-data') {
        notification.success({
          message: `成功`,
          description: '操作成功',
          placement: 'bottomRight',
          class: 'notification-custom-class',
        });
      }
    }
    else {
      notification.error({
        message: `错误`,
        description: data.rslts[0].msg,
        placement: 'bottomRight',
        class: 'notification-custom-class',
      });
      props.updateItem('readers', index, undefined);
    }
  }
  catch (error) {
    notification.error({
      message: `错误`,
      description: error,
      class: 'notification-custom-class',
      placement: 'bottomRight',
    });
    props.updateItem('readers', index, undefined);
  }
  finally {
    useAppStore().setSpinning(false);
  }
}
</script>

<style scoped>
.btn {
  border-radius: 6px;
  opacity: 1;
  background: linear-gradient(209deg, #90ecff 2%, #006af5 69%);
  box-sizing: border-box;
  border: 2px solid #89f7ff;
  padding: 6px 20px;
  color: white;
  height: 40px;
}
::v-deep(.ant-select-selection-item) {
  font-size: 16px;
}
</style>
