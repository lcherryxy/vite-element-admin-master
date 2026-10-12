import { usePermissionStore } from '@/store'

const permission = {
  mounted : function( el, binding ) {
    const permissionStore = usePermissionStore()
    const { value: permissionRoles } = binding
    const roleData = permissionStore.directivePermission
    if ( permissionRoles && permissionRoles instanceof Array ) {
      if ( permissionRoles.length > 0 ) {

        const hasPermission = roleData.some( role => {
          return permissionRoles.includes( role )
        } )

        if ( !hasPermission ) {
          el.parentNode && el.parentNode.removeChild( el )
        }
      }
    } else {
      throw new Error( `权限指令错误，可参考 v-permission="['admin','editor']"` )
    }
  }
}

export default permission
