<template>
  <v-form>
    <v-container>
      <v-layout px-3 pb-12>
        <h1 class="headline font-weight-bold white--text">新規登録</h1>
      </v-layout>
      <v-col cols="12" sm="6" class="pt-0 pb-1">
        <div class="v-messages theme--light error--text px-3 mb-2" v-if="nicknameError">
          <div class="v-messages__wrapper">
            <div class="v-messages__message">{{ nicknameErrorMessage }}</div>
          </div>
        </div>
        <v-text-field
          solo
          v-model="nickname"
          :rules="[rules.required]"
          label="ニックネーム（必須）"
          color="white"
          background-color="white"
          required
          @input="checkNickname"
          @click="resetSubmitError"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pt-0 pb-1">
        <v-text-field
          solo
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="E-mail（必須）"
          color="white"
          background-color="white"
          required
          @click="resetSubmitError"
          @input="checkForm"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pt-0 pb-0">
        <v-text-field
          solo
          color="white"
          background-color="white"
          v-model="password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :rules="[rules.required, rules.min]"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-2"
          label="Password（必須 | 8文字以上）"
          hint="At least 8 characters"
          class="input-group--focused"
          @click:append="showPassword = !showPassword"
          @click="resetSubmitError"
          @input="checkForm"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pt-0 pb-8">
        <v-btn
          :disabled="!valid"
          large
          depressed
          color="info"
          width="100%"
          height="50"
          class="font-weight-bold black--text"
          @click="signupWithEmailAndPassword()"
        >登録する</v-btn>
        <div class="v-messages theme--light error--text px-3 mt-2" v-if="submitError">
          <div class="v-messages__wrapper">
            <div class="v-messages__message">{{ submitErrorMessage }}</div>
          </div>
        </div>
      </v-col>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebaseAuth } from '~/plugins/firebase'
import firestore from '~/plugins/firestore'

@Component({
  layout: 'auth'
})
export default class Signup extends Vue {
  // TODO: loginと共通化
  valid: boolean = false
  nickname: string = ''
  email: string = ''
  password: string = ''
  showPassword: boolean = false
  rules: {} = {
    required: value => !!value || 'Required.',
    min: v => v.length >= 8 || 'Min 8 characters',
    email: v => /.+@.+/.test(v) || 'E-mail must be valid'
  }
  nicknameError: boolean = false
  nicknameErrorMessage: string = 'このニックネームは存在します。他のニックネームを入力してください'
  submitError: boolean = false
  submitErrorMessage: string = ''

  private get nicknameIsValid() {
    return this.$store.state.nickname.isValid
  }

  async signupWithEmailAndPassword() {
    this.checkForm()
    if (this.valid) {
      try {
        await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )
        this.$router.replace('/')
      } catch (error) {
        console.log('Signup error', error)
        this.submitErrorMessage = error.message
        this.submitError = true
      }
    }
  }

  async checkNickname() {
    if (!this.nickname) {
      this.checkForm()
      this.nicknameError = false
      return
    }
    try {
      const nicknameRef = firestore.collection('nicknames').doc(this.nickname)
      const nicknameSnap = await nicknameRef.get()
      this.nicknameError = nicknameSnap.exists
      this.valid = !nicknameSnap.exists
    } catch (error) {
      console.log(error)
    }
  }

  resetSubmitError() {
    this.submitErrorMessage = ''
    this.submitError = false
  }

  checkForm() {
    const inputs = document.getElementsByTagName('input')
    const inputValues = []
    const error = document.getElementsByClassName('error--text')

    for (let i = 0; i < inputs.length; i++) {
      inputValues.push(inputs[i].value)
    }

    if (inputValues.every(value => value !== '') && error.length === 0) {
      this.valid = true
    } else {
      this.valid = false
    }
  }
}
</script>
<style lang='scss' scoped >
</style>
