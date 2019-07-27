import { firebaseAuth } from '~/plugins/firebase';

export default function ({ store, route, redirect }) {
  firebaseAuth.onAuthStateChanged((user) => {
    const authPage: string[] = ['auth-login', 'auth-signup']
    if (user) {
      if (route.name === 'auth-login') redirect('/')
    } else {
      if (!authPage.includes(route.name)) {
        redirect('/auth/login')
      }
    }
  })
}
