<template>
  <v-container fluid grid-list-lg mb-12 pb-12>
    <Terms></Terms>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Terms from '~/components/Terms.vue'

@Component({
  components: {
    Terms
  }
})
export default class OthersTerms extends Vue {}
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
