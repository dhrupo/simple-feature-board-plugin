<template>
  <form v-on:submit.prevent="addFeature">
    <h2 class="show-error">{{ this.error }}</h2>
    <div class="input-group">
      <label for="feature-request-title">Feature Request Title</label>
      <input
        required
        id="feature-request-title"
        type="text"
        placeholder="Feature Request Title"
        v-model.trim.lazy="featureRequestTitle"
      />
    </div>
    <div class="input-group">
      <label for="feature-request-details">Feature Request Details</label>
      <textarea
        required
        id="feature-request-details"
        placeholder="Feature Request Details"
        cols="50"
        rows="5"
        v-model.trim.lazy="featureRequestDetails"
      ></textarea>
    </div>
    <div class="input-group">
      <label for="status">Status</label>
      <select v-model="status" id="status">
        <option disabled value="">Please select one</option>
        <option value="published">Published</option>
        <option value="unpublished">Unpublished</option>
        <option value="pending">Pending</option>
      </select>
    </div>
    <div class="input-group">
      <label for="feature-request-tags">Feature Request Tags</label>
      <input
        id="feature-request-tags"
        @keyup.space="addTags"
        type="text"
        placeholder="Add tags by space"
        v-model.trim="featureRequestTag"
      />
    </div>
    <div>
      <span v-for="(tag, index) in featureRequestTags" :key="index + 1">
        <span class="tag" @click="() => removeTag(index)">{{ tag }}</span>
      </span>
    </div>
    <div class="btn-group">
      <button type="submit" class="btn">Add Feature Request</button>
      <button @click="$emit('closeAdd')" class="btn">Back To List</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "AddFeature",
  data() {
    return {
      featureRequestTitle: "",
      featureRequestDetails: "",
      featureRequestTag: "",
      featureRequestTags: [],
      message: "",
      error: "",
      status: "",
    };
  },
  methods: {
    addFeature() {
      if (this.featureRequestTags.length < 0) {
        this.error =
          "Must have add feature tags to create a new feature Request";
        return;
      }
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("action", "wpsfb_insert_feature_request");
      formData.append("title", this.featureRequestTitle);
      formData.append("details", this.featureRequestDetails);
      formData.append("id", id);
      formData.append("tags", this.featureRequestTags);
      formData.append("status", this.status);
      console.log(this.featureRequestTags);
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.message = res.data.data;
          this.$fire({
            title: "",
            text: this.message,
            type: "success",
          }).then((okay) => {
            if (okay) {
              this.$router.go(0);
            }
          });
        })
        .catch((err) =>
          this.$alert("Error occured while posting data", "", "error")
        );
    },
    addTags() {
      !this.featureRequestTags.includes(this.featureRequestTag) &&
        this.featureRequestTags.push(this.featureRequestTag.toUpperCase());
      this.featureRequestTag = "";
    },
    removeTag(index) {
      this.featureRequestTags.splice(index, 1);
    },
  },
};
</script>

<style scoped>
form {
  width: 60%;
  background-color: #eee;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 20px;
  margin: 50px auto;
}
form:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.btn-group {
  margin-top: 16px;
}
.tag {
  background-color: #aaa;
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px 10px;
  margin-right: 8px;
}
.tag:hover {
  background-color: #999;
  cursor: pointer;
}
.show-error {
  color: red;
}
</style>