// vxe-table 4.x：默认导出是整个命名空间对象，同时有 install 和 setup 方法
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// 全局默认参数
VXETable.setup({
  size: 'medium',
  zIndex: 999,
  version: 0,
  loadingText: '加载中，请稍后...',
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
    tooltipConfig: { enterable: true },
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
