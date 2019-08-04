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
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <nuxt-link to="/">
        <h1 class="nav__heading">
          <v-toolbar-title v-text="title" />
        </h1>
      </nuxt-link>
      <v-spacer />
    </v-toolbar>
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
  drawer: boolean = true
  items: object[] = [
    {
      icon: 'list',
      title: 'マンスリー課題・画像',
      to: '/admin/'
    },
    {
      icon: 'add',
      title: '課題追加',
      to: '/admin/register/problems'
    },
    {
      icon: 'image',
      title: 'TOP画像追加',
      to: '/admin/register/image'
    },
  ]
  miniVariant:boolean = false
  title:string = 'Rock Drunkard'
}
</script>

<style lang='scss' scoped >
</style>
