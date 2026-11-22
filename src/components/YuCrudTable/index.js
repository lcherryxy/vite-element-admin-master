import YuCrudTable from './src/index.vue'

export const CrudTable = Object.assign( YuCrudTable, {
  install( app ) {
    app.component( YuCrudTable.name, YuCrudTable )
  }
} )

export default YuCrudTable
