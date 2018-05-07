<template>
  <div v-if="profile" class="profile container">
    <div class="card">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s profile</h2>
    </div>
  </div>
</template>


<script>
import db from '@/firestore'

export default {
  data () {
    return {
      profile: null,
    }
  },
  computed: {
    usersRef () {
      return db.collection('users')
    },
    userSlug () {
      return this.$route.params.userSlug
    },
  },
  created () {
    this.usersRef.doc(this.userSlug).get()
      .then(userDoc => {
        this.profile = userDoc.data()
      })
  },
}
</script>
