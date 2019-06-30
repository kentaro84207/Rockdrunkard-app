import firebase from "~/plugins/firebase"

export default ({ app, redirect, store }) => {
  app.router.afterEach((to, from) => {
    firebase.auth().onAuthStateChanged((user) => {
      store.commit("setUser", user)

      if (user) {
        if (to.name === "signin") {
          redirect("/")
        }
      }
    })
  })
}
