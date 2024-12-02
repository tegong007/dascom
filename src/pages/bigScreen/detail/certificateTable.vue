<template>
  <div class="table-wrap relative h-90% w-full">
    <vxe-table
      class="mytable-style"
      height="auto"
      auto-resize
      border
      :row-class-name="rowClassName"
      :header-cell-class-name="headerCellClassName"
      :cell-class-name="cellClassName"
      :column-config="{ resizable: true }"
      :row-config="{ isHover: true }"
      :data="tableData"
      @sort-change="sortChangeEvent"
    >
      <vxe-column type="seq" width="70" align="center" fixed="left" />
      <vxe-column
        v-for="(item, index) in colums"
        :key="index"
        :field="item.field"
        :title="item.title"
        :formatter="item.formatter"
        show-overflow
        align="center"
      />

      <!-- <vxe-column title="操作" fixed="right" width="200">
        <a>按钮</a>
      </vxe-column> -->
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
import type {
  VxeColumnPropTypes,
  VxeTableEvents,
  VxeTablePropTypes,
} from 'vxe-table';

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
const resultList = [
  { label: '成本', value: 0 },
  { label: '制作中', value: 1 },
  { label: '废本', value: 2 },
];
const formatterRetult: VxeColumnPropTypes.Formatter<RowVO> = ({
  cellValue,
}: any) => {
  const item = resultList.find(item => item.value === cellValue);
  return item ? item.label : cellValue;
};
const sortChangeEvent: VxeTableEvents.SortChange<RowVO> = ({ sortList }) => {
  console.info(
    sortList.map(item => `${item.field},${item.order}`).join('; '),
  );
};
// const sortConfig = ref<VxeTablePropTypes.SortConfig<RowVO>>({
//   multiple: true,
// });
const headerCellClassName: VxeTablePropTypes.HeaderCellClassName<RowVO> = ({
  column,
}: any) => {
  column;
  // if (column.field === 'name') {
  return 'col-blue';
  // }
  // return null;
};

const rowClassName: VxeTablePropTypes.RowClassName<RowVO> = ({
  rowIndex,
}: any) => {
  rowIndex;
  // if ([0].includes(rowIndex)) {
  //   return 'row-style-first';
  // } else {
  return 'row-style';
  // }
  // return null;
};
const cellClassName: VxeTablePropTypes.CellClassName<RowVO> = ({
  row,
  $rowIndex,
  column,
}: any) => {
  row + $rowIndex + column;
  // console.log('🚀 ~ file: table.vue:67 ~ $rowIndex:', $rowIndex);
  // if ($rowIndex === pageVO.pageSize - 1) return 'row-last-cell-style';

  // else
  return 'cell-style';
};
const colums = ref([
  {
    title: '证本号',
    field: 'docId',
    width: 150,
  },
  {
    title: '工位',
    field: 'position',
    width: 150,
  },
  {
    title: '状态',
    field: 'result',
    formatter: formatterRetult,
    width: 150,
  },
  {
    title: '废本原因',
    field: 'resultMsg',
    width: 250,
    // isTip: true,
  },
  {
    title: '开始时间',
    field: 'startTime',
    width: 250,
  },
]);
// const tableData = ref<RowVO[]>([]);

const tableData = [
  {
    docId: 123234,
    result: 2,
    resultMsg: '我是个废本，为什么我是个废本呢 因为...',
  },
  { docId: 45 },
  {
    docId: 12356234,
    result: 1,
  },
  { docId: 3245653456 },
  {
    docId: 123234,
    result: 1,
  },
  { docId: 325643456 },
  { docId: 12378234, resultMsg: '我是个废本，为什么我是个废本呢 因为...' },
  { docId: 32953456 },
  { docId: 127893234, resultMsg: '我是个废本，为什么我是个废本呢 因为...' },
  { docId: 325643456 },
];
</script>

<style lang="scss" scoped>
::v-deep(.mytable-style) {
  font-size: 14px;
  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 17px;
    height: 17px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ffffff38;
    border-radius: 15px;
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
  background-color: rgba(255, 255, 255, 0.12);
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
::v-deep(.mytable-style.vxe-table .vxe-header--column.col-blue) {
  background: linear-gradient(246deg, rgba(144, 236, 255, 0.65) 3%, rgba(0, 106, 245, 0.06) 50%);
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
