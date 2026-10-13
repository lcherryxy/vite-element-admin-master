// vxe-table 4.x：默认导出是整个命名空间对象，同时有 install 和 setup 方法
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// 全局默认参数
// 项目统一使用 element-plus 的 v-loading 指令，不使用 vxe-table 内置的 loading（依赖未安装的 vxe-loading 组件），
// 因此此处不配置 loadingText，避免触发"缺少 vxe-loading 组件"的告警
VXETable.setup({
  size: 'medium',
  zIndex: 999,
  version: 0,
  table: {
    autoResize: true,
    border: false,
    emptyText: '暂无数据',
    keepSource: false,
    round: false,
    showFooter: false,
    showFooterOverflow: true,
    showHeader: true,
    showHeaderOverflow: true,
    showOverflow: true,
    stripe: false,
    rowConfig: {
      useKey: false,
      isCurrent: true,
      isHover: true,
      keyField: '_X_ROW_KEY'
    },
    radioConfig: { strict: true, reserve: false, trigger: 'default' },
    checkboxConfig: { strict: true, highlight: true, range: false, trigger: 'default' },
    sortConfig: { remote: false, trigger: 'default', orders: ['asc', 'desc', null], sortMethod: null },
    filterConfig: { remote: false, filterMethod: null },
    expandConfig: { trigger: 'default', showIcon: true },
    treeConfig: {
      rowField: 'id', parentField: 'parentId', children: 'children',
      hasChild: 'hasChild', mapChildren: '_X_ROW_CHILD', indent: 20, showIcon: true
    },
    // show-overflow=true 时 tooltip-config.mode 不能用默认值 tooltip，
    // tooltip 模式需要单独安装 vxe-pc-ui 的 VxeTooltip 组件，否则会报缺少组件错误；
    // 改用 title 模式：超出内容显示省略号，悬停时用原生 title 属性显示完整文本，无需额外组件
    tooltipConfig: { enterable: true, mode: 'title' },
    headerTooltipConfig: { mode: 'title' },
    footerTooltipConfig: { mode: 'title' },
    menuConfig: { className: 'vt-menus', visibleMethod() { } },
    editConfig: { mode: 'cell', showAsterisk: true },
    importConfig: { modes: ['insert', 'covering'] },
    exportConfig: { modes: ['current', 'selected'] },
    customConfig: { storage: false },
    scrollX: { gt: 60 },
    scrollY: { gt: 100 }
  },
  input: { clearable: true },
  textarea: { size: null, autosize: { minRows: 1, maxRows: 10 } }
})

export function useTable(app) {
  app.use(VXETable)
}
