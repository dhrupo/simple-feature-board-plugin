<template>
  <div>
    <button class="btn" @click="$router.go(-1)">Back</button>
    <h2 class="show-error">{{ error }}</h2>
    <div class="feature-request-wrapper">
      <div>
        <h2>{{ featuresRequest.title }}</h2>
        <span class="status">{{ featuresRequest.status }}</span>
        <p>{{ featuresRequest.details }}</p>
      </div>
      <div>
        <h3>Total Votes: {{ votesCount }}</h3>
        <div>
          <button class="btn" v-if="isUserVoted" @click="unvote">Unvote</button>
          <button class="btn" v-else @click="vote">Vote</button>
        </div>
      </div>
    </div>
    <div class="feature-request-comment-wrapper">
      <div
        class="comment"
        v-for="comment in featuresRequestComments"
        :key="comment.id"
      >
        <p>{{ comment.comment }}</p>
        <span class="comment-user">by {{ comment.user_login }}</span>
      </div>
      <form @submit.prevent="addComment">
        <textarea
          required
          id="comment"
          placeholder="Add a comment..."
          rows="3"
          v-model.trim.lazy="comment"
        ></textarea>
        <div>
          <button type="submit" class="btn">comment</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeatureRequestDetails",
  data() {
    return {
      featuresRequestComments: [],
      featuresRequest: {},
      comment: "",
      votesCount: "",
      isUserVoted: Boolean,
      error: "",
    };
  },
  methods: {
    getFeatureRequestById() {
      var self = this;
      const id = self.$route.params.id;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_get_single_feature_request",
          id: id,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.featuresRequest = data.data;
          self.featuresRequest.tags = self.featuresRequest.tags
            ? self.featuresRequest.tags.split(",")
            : [];
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
    getFeatureRequestComments() {
      var self = this;
      const id = self.$route.params.id;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_get_feature_request_comments",
          id: id,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.featuresRequestComments = data.data;
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
    getVotescount() {
      var self = this;
      const id = self.$route.params.id;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_get_feature_requests_votes_count",
          id: id,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.votesCount = data.data.vote_count;
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
    getVotedUser() {
      var self = this;
      const id = self.$route.params.id;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_get_voted_user",
          id: id,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.isUserVoted = data.data;
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
    addComment() {
      var self = this;
      const id = self.$route.params.id;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_add_feature_request_comment",
          id: id,
          comment: self.comment,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.$router.go(0);
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
    vote() {
      var self = this;
      const id = self.$route.params.id;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_add_vote",
          id: id,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.$router.go(0);
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
    unvote() {
      var self = this;
      const id = self.$route.params.id;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_remove_vote",
          id: id,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.$router.go(0);
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
  },
  created() {
    this.getFeatureRequestById();
    this.getFeatureRequestComments();
    this.getVotescount();
    this.getVotedUser();
  },
};
</script>

<style scoped>
.feature-request-wrapper {
  display: flex;
  justify-content: space-between;
  width: 95%;
  box-shadow: 5px 5px 10px #aaa;
  padding: 20px;
  margin: 10px auto;
}

.feature-request-wrapper .status {
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
  background-color: blueviolet;
  color: white;
  padding: 5px;
  border-radius: 5px;
}

.feature-request-comment-wrapper {
  width: 95%;
  box-shadow: 5px 5px 10px #aaa;
  padding: 20px;
  margin: 30px auto;
}

.feature-request-comment-wrapper .comment {
  box-shadow: 5px 5px 10px #aaa;
  padding: 10px;
  margin: 20px auto;
}

.feature-request-comment-wrapper .comment p {
  font-weight: 600;
  margin: 5px 0;
}

.feature-request-comment-wrapper .comment .comment-user {
  color: #999;
}

form textarea {
  width: 100%;
}
</style>