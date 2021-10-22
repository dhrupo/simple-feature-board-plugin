<template>
  <form v-on:submit.prevent="addFeature">
    <h2 class="show-error">{{ error }}</h2>
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
      <select v-model="selectedStatus" id="status">
        <option disabled>Please select one</option>
        <option value="published">Published</option>
        <option value="unpublished">Unpublished</option>
        <option value="pending">Pending</option>
        <option value="planned">Planned</option>
        <option selected value="under review">Under Review</option>
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
      var self = this;
      const id = self.$route.params.id;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_insert_feature_request",
          boardId: id,
          title: self.featureRequestTitle,
          details: self.featureRequestDetails,
          tags: self.featureRequestTags,
          status: self.status,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.message = data.data;
          self.$fire({
            title: "",
            text: self.message,
            type: "success",
          });
          self.$router.go(0);
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
    addTags() {
      this.featureRequestTag = this.featureRequestTag.toUpperCase();
      !this.featureRequestTags.includes(this.featureRequestTag) &&
        this.featureRequestTags.push(this.featureRequestTag);
      this.featureRequestTag = "";
    },
    removeTag(index) {
      this.featureRequestTags.splice(index, 1);
    },
  },
  computed: {
    selectedStatus: {
      get() {
        return (this.status = "under review");
      },
      set(value) {
        this.status = value;
      },
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