<template>
  <v-bottom-nav :active.sync="bottomNav" :value="true" fixed color="blue lighten-1">
    <v-btn color="white" flat value="list">
      <span>List</span>
      <v-icon>view_headline</v-icon>
    </v-btn>

    <v-btn color="white" flat value="mypage">
      <span>MyPage</span>
      <v-icon>account_circle</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>
