<template>
  <div v-if="profile" class="profile container">
    <div class="card-panel">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s profile</h2>

      <form v-if="currentUser" @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment">
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
      </form>

      <ul v-if="comments.length" class="collection comments">
        <li class="collection-item" v-for="(comment, idx) of comments" :key="idx">
          <div class="deep-purple-text">{{ comment.from }}</div>
          <div class="grey-text text-darken-2">{{ comment.content }}</div>
        </li>
      </ul>
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
      comments: [],
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
    this.setProfile()
    this.setComments()
  },
  methods: {
    setComments () {
      return this.commentsRef.where('to', '==', this.userSlug)
        .onSnapshot(snapshot => {
          snapshot.docChanges.forEach(change => {
            if (change.type !== 'added') {
              return
            }
            const data = change.doc.data()
            const { from, content, date } = data
            const comment = { from, content, date }
            this.comments.unshift(comment)
          })
        })
    },
    setProfile () {
      return this.usersRef.doc(this.userSlug).get()
        .then(userDoc => {
          this.profile = userDoc.data()
        })
    },
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
        from: this.currentUser.alias,
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
