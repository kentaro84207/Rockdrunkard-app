import { firebaseAuth } from '~/plugins/firebase';

export default function ({ store, route, redirect }) {
  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      if (route.name === 'auth-login') redirect('/')
    } else {
      if (route.name !== 'auth-login') redirect('/auth/login')
    }
  })
}
