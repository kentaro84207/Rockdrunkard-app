<template>
  <v-container fluid grid-list-lg mb-12 pb-12>
    <Privacy></Privacy>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Privacy from '~/components/Privacy.vue'

@Component({
  components: {
    Privacy
  }
})
export default class OthersPrivacy extends Vue {}
</script>

<style lang='scss' scoped >
section {
  margin-bottom: 30px;
}

ul,
ol {
  margin-top: 10px;
}

ul,
ol,
li {
  margin-bottom: 10px;
}
</style>
