<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <nuxt-link to="/admin">
        <h1 class="title">
          <v-toolbar-title v-text="title" />
        </h1>
      </nuxt-link>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  },
})
export default class AdminLayout extends Vue {
  clipped: boolean = true
  fixed: boolean = false
  drawer: boolean = false
  items: object[] = [
    {
      icon: 'list',
      title: 'マンスリー課題・画像',
      to: '/admin/'
    },
    {
      icon: 'image',
      title: 'TOP画像追加',
      to: '/admin/register/image'
    },
  ]
  miniVariant:boolean = false
  title:string = 'Rock Drunkard admin'
}
</script>

<style lang='scss' scoped >
</style>
