import YuCountTo from './src/index.vue'
export const CountTo = Object.assign( YuCountTo, {
  install( app ) {
    app.component( YuCountTo.name, YuCountTo )
  }
} )

export default CountTo
