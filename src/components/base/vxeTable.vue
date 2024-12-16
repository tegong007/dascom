<template>
  <div class="wh-full">
    <div class="h-50px">
      <!-- 根据数组长度渲染对应数量的按钮，并绑定点击事件和名字 -->

      <vxe-button
        v-for="(item, index) in props.funArr"
        :key="index"
        @click="getSelectEvent(item.action)"
      >
        {{ item.name }}
      </vxe-button>
    </div>

    <div class="h-80% w-full">
      <vxe-table
        ref="tableRef"
        class="mytable-style"
        height="auto"
        auto-resize
        border
        :row-class-name="rowClassName"
        :header-cell-class-name="headerCellClassName"
        :cell-class-name="cellClassName"
        :column-config="{ resizable: true }"
        :row-config="{ keyField: props.keyField, isHover: true }"
        :data="props.data"
        @checkbox-change="selectChangeEvent"
        @sort-change="sortChangeEvent"
      >
        <vxe-column v-if="props.checkbox" type="checkbox" width="60" />
        <!-- <vxe-column type="seq" width="70" align="center" fixed="left" /> -->

        <vxe-column
          v-for="(item, index) in props.colums"
          :key="index"
          :field="item.field"
          :title="item.title"
          :formatter="item.formatter"
          show-header-overflow
          :width="item.width"
          show-overflow="title"
          show-footer-overflow
          align="center"
        />

        <!-- <vxe-column title="操作" fixed="right" width="200">
                <a>按钮</a>
             </vxe-column> -->
      </vxe-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { VxeTableEvents, VxeTablePropTypes } from 'vxe-table';
// import type { VxePagerEvents } from 'vxe-pc-ui';

const props = defineProps({
  colums: Array, // 表头
  data: Array, // 数据
  keyField: String, // 主键
  checkbox: Boolean, // 复选框
  funArr: Array,
});

const tableRef = ref();

function selectChangeEvent({ checked }) {
  const $table = tableRef.value;
  if ($table) {
    const records = $table.getCheckboxRecords();
    console.log(checked ? '勾选事件' : '取消事件', records);
  }
}
interface RowVO {
  name?: string;
  role?: string;
  docId?: number;
  result?: number;
  sex?: string;
  resultMsg?: string;
  age?: number;
  address?: string;
}

const sortChangeEvent: VxeTableEvents.SortChange<RowVO> = ({ sortList }) => {
  console.info(
    sortList.map(item => `${item.field},${item.order}`).join('; '),
  );
};
// const sortConfig = ref<VxeTablePropTypes.SortConfig<RowVO>>({
//    multiple: true,
// });
const headerCellClassName: VxeTablePropTypes.HeaderCellClassName<RowVO> = ({
  column,
}: any) => {
  column; // if (column.field === 'name') {
  return 'col-blue'; // }
  // return null;
};

const rowClassName: VxeTablePropTypes.RowClassName<RowVO> = ({
  rowIndex,
}: any) => {
  rowIndex; // if ([0].includes(rowIndex)) {
  //    return 'row-style-first';
  // } else {
  return 'row-style'; // }
  // return null;
};
const cellClassName: VxeTablePropTypes.CellClassName<RowVO> = ({
  row,
  $rowIndex,
  column,
}: any) => {
  row + $rowIndex + column; // console.log('🚀 ~ file: table.vue:67 ~ $rowIndex:', $rowIndex);
  // if ($rowIndex === pageVO.pageSize - 1) return 'row-last-cell-style';
  // else
  return 'cell-style';
};

// const loading = ref(false);
// const tableData = ref<RowVO[]>();
// function setSelectRow(rows, checked) {
//   const $table = tableRef.value;
//   if ($table) {
//     $table.setCheckboxRow(rows, checked);
//   }
// }
function getSelectEvent(fun: any) {
  const $table = tableRef.value;
  if ($table) {
    const selectRecords = $table.getCheckboxRecords();
    fun(selectRecords); // VxeUI.modal.alert(`${selectRecords.length}条数据`);
  }
}
</script>

<style scoped lang="scss">
::v-deep(.mytable-style) {
  // max-width: 400px;
  font-size: 16px;
  //   font-family: siyuan;
  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    // border-left: 3px solid #7ff3fd;
  }
  ::-webkit-scrollbar-thumb {
    // background-color: #ffffff38;
    background-color: #ffffff69;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-track {
    background-image: linear-gradient(to bottom, rgba(0, 140, 255, 0.329) 0%, rgba(255, 255, 255, 0.205) 100%);
  }
  /* 表头样式 */
  thead {
    background: transparent;
  }
}

/* 表格样式 */
::v-deep(.vxe-table--render-wrapper) {
  background-color: transparent;
}
::v-deep(.vxe-table--render-default .vxe-table--body-wrapper) {
  //   background-color: rgba(255, 255, 255, 0.12);
  background-color: rgba(255, 255, 255, 0);
  //   font-family: siyuan;
}

/* 行样式 */
::v-deep(.mytable-style.vxe-table .vxe-body--row.row-style-first),
::v-deep(.mytable-style.vxe-table .vxe-body--row.row-style) {
  background-color: rgba(255, 255, 255, 0);
  color: #fff;
}

/* 表头样式 */
::v-deep(.vxe-table--render-default.border--full .vxe-table--header-wrapper) {
  background-color: transparent;
}
::v-deep(.vxe-cell--title) {
  font-weight: 400;
}
::v-deep(.mytable-style.vxe-table .vxe-header--column.col-blue) {
  //   background: linear-gradient(
  //     246deg,
  //     rgba(144, 236, 255, 0.65) 3%,
  //     rgba(0, 106, 245, 0.06) 50%
  //   );
  background: rgba(255, 255, 255, 0.2);
  border-right: 3px solid #7ff3fd;
  color: #fff;
}

/* 单元格样式 */
::v-deep(.mytable-style.vxe-table .vxe-body--column.cell-style) {
  border: 3px solid #7ff3fd;
  border-top: none;
  border-left: none;
  color: #fff;
}

/* 固定列样式 */
::v-deep(.mytable-style .vxe-table--fixed-right-wrapper td),
::v-deep(.mytable-style .vxe-table--fixed-right-wrapper th),
::v-deep(.mytable-style .vxe-table--fixed-left-wrapper td),
::v-deep(.mytable-style .vxe-table--fixed-left-wrapper th) {
  background-color: #4d7ca4 !important;
}
::v-deep(.mytable-style .vxe-table--fixed-right-wrapper td) {
  border-right: none !important;
}

/* 边框样式 */
::v-deep(.vxe-table--render-default.border--full .vxe-body--column) {
  background-image: none;
}
::v-deep(.vxe-table .vxe-cell--sort) {
  position: absolute;
  right: 10px;
}

/* 固定列背景样式 */
::v-deep(.vxe-table--render-default .vxe-table--fixed-right-wrapper),
::v-deep(.vxe-table--render-default .vxe-table--fixed-left-wrapper) {
  background-color: unset;
}
//分页
::v-deep(.vxe-pager) {
  background-color: unset;
  color: #fff;
  .vxe-pager--jump-next,
  .vxe-pager--jump-prev,
  .vxe-pager--next-btn,
  .vxe-pager--num-btn,
  .vxe-pager--prev-btn {
    background-color: unset;
  }
}
</style>
