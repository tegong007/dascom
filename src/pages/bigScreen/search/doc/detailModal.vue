<template>
  <a-modal
    :get-container="false"
    :open="props.open"
    wrap-class-name="test"
    :closable="false"
    :width="1000"
    destroy-on-close
    force-render
    @ok="props.handleOk"
  >
    <div class="delete-modal box-border h-[40em] p-t-50px">
      <div class="h-full flex flex-col items-center justify-start">
        <span class="mt10 text-[26px] color-[#627384] font-bold">
          {{ props.title }}</span>
        <div class="scoll-bar mt10px h-full w-90% overflow-y-auto bg-white">
          <a-descriptions title="" bordered>
            <a-descriptions-item label="任务号">
              {{ props.currentRow.taskID }}
            </a-descriptions-item>
            <a-descriptions-item label="批次号">
              {{ props.currentRow.batchID }}
            </a-descriptions-item>
            <a-descriptions-item label="证本号">
              {{ props.currentRow.docID }}
            </a-descriptions-item>
            <a-descriptions-item label="证本流水线号">
              {{ props.currentRow.docSN }}
            </a-descriptions-item>
            <a-descriptions-item label="证件号">
              {{ props.currentRow.idNum }}
            </a-descriptions-item>
            <a-descriptions-item label="证件类型">
              {{ formatterValue('idType', props.currentRow.idType) }}
            </a-descriptions-item>
            <!-- <a-descriptions-item label="加急程度">
              {{ formatterValue('urgentType', props.currentRow.urgentType) }}
            </a-descriptions-item> -->
            <a-descriptions-item label="当前工位">
              {{ formatterValue('position', props.currentRow.position) }}
            </a-descriptions-item>
            <a-descriptions-item label="证本状态">
              {{ formatterValue('docStatus', props.currentRow.docStatus) }}
            </a-descriptions-item>
            <a-descriptions-item label="证本类型">
              {{ formatterValue('type', props.currentRow.type) }}
            </a-descriptions-item>
            <a-descriptions-item label="姓(中)">
              {{ props.currentRow.cnSurname }}
            </a-descriptions-item>
            <a-descriptions-item label="名(中)">
              {{ props.currentRow.cnGivenName }}
            </a-descriptions-item>
            <a-descriptions-item label="人像照片">
              <vxe-image
                :width="100"
                mask-closable
                :src="`data:image/png;base64,${props.currentRow.photo}`"
              />
            </a-descriptions-item>
            <a-descriptions-item label="加注类型">
              {{ formatterValue('cnObsvType', props.currentRow.cnObsvType) }}
            </a-descriptions-item>
            <a-descriptions-item label="机读码1">
              {{ props.currentRow.mrz1 }}
            </a-descriptions-item>
            <a-descriptions-item label="机读码2">
              {{ props.currentRow.mrz2 }}
            </a-descriptions-item>
            <a-descriptions-item label="空白本照片">
              <vxe-image
                :src="`data:image/png;base64,${props.currentRow.blankDocPic}`"
                :width="100"
                mask-closable
              />
            </a-descriptions-item>
            <a-descriptions-item label="激光前定位照片">
              <vxe-image
                :width="100"
                mask-closable
                :src="`data:image/png;base64,${props.currentRow.laserPicLocation}`"
              />
            </a-descriptions-item>
            <a-descriptions-item label="激光后质检照片">
              <vxe-image
                :width="100"
                mask-closable
                :src="`data:image/png;base64,${props.currentRow.laserPicCheck}`"
              />
            </a-descriptions-item>
            <a-descriptions-item label="喷墨前定位照片(主)">
              <vxe-image
                :width="100"
                mask-closable
                :src="`data:image/png;base64,${props.currentRow.mainUVPicLocation}`"
              />
            </a-descriptions-item>
            <a-descriptions-item label="喷墨后质检照片(主)">
              <vxe-image
                :width="100"
                mask-closable
                :src="`data:image/png;base64,${props.currentRow.mainUVPicCheck}`"
              />
            </a-descriptions-item>
            <a-descriptions-item label="喷墨前定位照片(加)">
              <vxe-image
                :width="100"
                mask-closable
                :src="`data:image/png;base64,${props.currentRow.additionUVPicLocation}`"
              />
            </a-descriptions-item>
            <a-descriptions-item label="喷墨前定位照片(加)">
              <vxe-image
                :width="100"
                mask-closable
                :src="`data:image/png;base64,${props.currentRow.additionUVPicCheck}`"
              />
            </a-descriptions-item>
            <a-descriptions-item label="废本原因">
              {{ props.currentRow.obsoleteReason }}
            </a-descriptions-item>

            <a-descriptions-item label="开始时间">
              {{ props.currentRow.startTime }}
            </a-descriptions-item>
            <a-descriptions-item label="结束时间">
              {{ props.currentRow.endTime }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </div>
    <template #footer>
      <a-flex justify="center" align="center" class="pb-40px">
        <div
          class="cancelBtn h-100px w-200px transition-transform duration-300 hover:scale-105"
          @click="handleCancel"
        />
        <!-- <div
          class="okBtn h-110px w-220px transition-transform duration-300 hover:scale-105"
          @click="onSubmit"
        /> -->
      </a-flex>
    </template>
  </a-modal>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { getWorkstationName } from '@/utils/workstationDefinitions';
import { findLabelByValue } from '@/pages/bigScreen/batch/option.ts';

const props = defineProps({
  open: Boolean,
  handleOk: Function,
  title: String,
  handleCancel: Function,
  currentRow: Object,
});
function formatterValue(column, cellValue) {
  switch (column) {
    case 'position':
      return getWorkstationName(cellValue);
    case 'type':
      return findLabelByValue('docTypesOptions', cellValue);
    case 'docStatus':
      return findLabelByValue('docStatusOptions', cellValue);
    case 'idType':
      return findLabelByValue('idTypesOptions', Number(cellValue));
    case 'cnObsvType':
      return findLabelByValue('cnObsvTypeOptions', Number(cellValue));
    case 'dispatchUnit':
      return findLabelByValue('dispatchUnitOptions', cellValue);
    case 'isTeam':
      return findLabelByValue('teamOptions', cellValue);
    case 'dataSource':
      return findLabelByValue('dataSourceOptions', cellValue);
    case 'urgentType':
      return findLabelByValue('urgencyOptions', Number(cellValue));
    default:
      break;
  }
}
</script>

<style scoped lang="less">
::v-deep(.ant-modal-content) {
  padding: 0;
  border-radius: 2em;
  background-image: url('@/assets/image/bigScreen/modal-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-sizing: border-box;
}
::v-deep(.ant-modal-mask) {
  background: rgba(0, 0, 0, 0.9);
}
::v-deep(.ant-modal-mask) {
  background: rgba(0, 0, 0, 0.8);
}
::v-deep.scoll-bar {
  overflow-y: auto;
}
::v-deep(.ant-form-item) {
  label {
    color: #000 !important;
    font-size: 16px;
  }
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  // border-left: 3px solid #7ff3fd;
}
::-webkit-scrollbar-thumb {
  // background-color: #ffffff38;
  background-color: #1110100e;
  border-radius: 5px;
}
.cancelBtn {
  background-image: url('@/assets/image/bigScreen/btn/cancel.png');
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 不重复 */
}
.okBtn {
  background-image: url('@/assets/image/bigScreen/btn/ok.png');
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 不重复 */
}
</style>
