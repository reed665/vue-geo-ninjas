<template>
  <div v-if="profile" class="profile container">
    <div class="card-panel">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s profile</h2>

      <ul class="comments collection">
        <li>Comment</li>
      </ul>

      <form v-if="currentUser" @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment">
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import firebase from 'firebase'
import db from '@/firestore'

export default {
  data () {
    return {
      profile: null,
      newComment: '',
      feedback: '',
      currentUser: null,
    }
  },
  computed: {
    usersRef () {
      return db.collection('users')
    },
    commentsRef () {
      return db.collection('comments')
    },
    userSlug () {
      return this.$route.params.userSlug
    },
    authUser () {
      return firebase.auth().currentUser
    }
  },
  created () {
    this.setCurrentUser()
    this.usersRef.doc(this.userSlug).get()
      .then(userDoc => {
        this.profile = userDoc.data()
      })
  },
  methods: {
    setCurrentUser () {
      return this.usersRef.where('userId', '==', this.authUser.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.currentUser = { id: doc.id, ...doc.data() }
          })
        })
    },
    addComment () {
      if (!this.newComment) {
        this.feedback = 'Comment cannot be empty'
        return
      }
      this.feedback = ''
      const newCommentObj = {
        content: this.newComment,
        date: Date.now(),
        from: this.currentUser.id,
        to: this.userSlug,
      }
      this.commentsRef.add(newCommentObj)
        .then(() => {
          this.newComment = ''
        })
        .catch(console.error)
    }
  }
}
</script>


<style scoped>
.profile {
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
