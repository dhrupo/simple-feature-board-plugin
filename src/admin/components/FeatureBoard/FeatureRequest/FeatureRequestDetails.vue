<template>
  <div>
    <button class="btn" @click="$router.go(-1)">Back</button>
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
          type="text"
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
import axios from "axios";
export default {
  name: "FeatureRequestDetails",
  data() {
    return {
      featuresRequestComments: [],
      featuresRequest: {},
      comment: "",
      votesCount: "",
      isUserVoted: Boolean,
    };
  },
  methods: {
    getFeatureRequestById() {
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("action", "wpsfb_get_single_feature_request");
      formData.append("id", id);
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.featuresRequest = res.data.data;
          this.featuresRequest.tags = this.featuresRequest.tags
            ? this.featuresRequest.tags.split(",")
            : [];
        })
        .catch((err) => {
          this.error = "Error retriving data";
          console.log(err);
        });
    },
    getFeatureRequestComments() {
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("action", "wpsfb_get_feature_request_comments");
      formData.append("id", id);
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.featuresRequestComments = res.data.data;
        })
        .catch((err) => {
          this.error = "Error retriving data";
          console.log(err);
        });
    },
    getVotescount() {
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("action", "wpsfb_get_feature_requests_votes_count");
      formData.append("id", id);
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.votesCount = res.data.data[0].vote_count;
        })
        .catch((err) => {
          this.error = "Error retriving data";
          console.log(err);
        });
    },
    getVotedUser() {
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("action", "wpsfb_get_voted_user");
      formData.append("id", id);
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.isUserVoted = res.data.data.length > 0;
        })
        .catch((err) => {
          this.error = "Error retriving data";
          console.log(err);
        });
    },
    addComment() {
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("action", "wpsfb_add_feature_request_comment");
      formData.append("id", id);
      formData.append("comment", this.comment);
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.$router.go(0);
        })
        .catch((err) => {
          this.error = "Error while commenting";
          console.log(err);
        });
    },
    vote() {
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("action", "wpsfb_add_vote");
      formData.append("id", id);
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.$alert(res.data.data).then((okay) => {
            if (okay) {
              this.$router.go(0);
            }
          });
        })
        .catch((err) => {
          this.$alert("Unsuccessful attempt to vote");
        });
    },
    unvote() {
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("action", "wpsfb_remove_vote");
      formData.append("id", id);
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.$alert(res.data.data).then((okay) => {
            if (okay) {
              this.$router.go(0);
            }
          });
        })
        .catch((err) => {
          this.$alert("Unsuccessful attempt to remove vote");
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