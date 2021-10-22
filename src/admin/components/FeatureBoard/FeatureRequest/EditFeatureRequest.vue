<template>
  <form v-on:submit.prevent="editFeatureRequest(feature.id)">
    <h2 class="show-error">{{ error }}</h2>
    <div class="input-group">
      <label for="feature-title">Feature Request Title</label>
      <input
        required
        id="feature-title"
        type="text"
        placeholder="Feature Request Title"
        v-model.trim.lazy="feature.title"
      />
    </div>
    <div class="input-group">
      <label for="feature-details">Feature Request Details</label>
      <textarea
        required
        id="feature-details"
        type="text"
        placeholder="Feature Details"
        cols="50"
        rows="5"
        v-model.trim.lazy="feature.details"
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
        <option value="under review">Under Review</option>
      </select>
    </div>
    <div class="input-group">
      <label for="feature-tags">Feature Request Tags</label>
      <input
        id="feature-tags"
        @keyup.space="addTags"
        type="text"
        placeholder="Add tags by space"
        v-model.trim="featureRequestTag"
      />
    </div>
    <div>
      <span v-for="(tag, index) in feature.tags" :key="index + 1">
        <span class="tag" @click="() => removeTag(index)">{{ tag }}</span>
      </span>
    </div>
    <div class="btn-group">
      <button type="submit" class="btn">Edit Feature Request</button>
      <button class="btn" @click="$emit('closeEdit')">Close</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "EditFeatureRequest",
  data() {
    return {
      featureRequestTag: "",
      error: "",
    };
  },
  props: {
    feature: Object,
  },
  methods: {
    editFeatureRequest(id) {
      var self = this;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_edit_feature_request",
          id: id,
          title: self.feature.title,
          details: self.feature.details,
          tags: self.feature.tags,
          status: self.feature.status,
          board_id: self.feature.feature_board_id,
          user_id: self.feature.user_id,
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
    addTags() {
      this.featureRequestTag = this.featureRequestTag.toUpperCase();
      !this.feature.tags.includes(this.featureRequestTag) &&
        this.feature.tags.push(this.featureRequestTag);
      this.featureRequestTag = "";
    },
    removeTag(index) {
      this.feature.tags.splice(index, 1);
    },
  },
  computed: {
    selectedStatus: {
      get() {
        return this.feature.status;
      },
      set(value) {
        this.feature.status = value;
      },
    },
  },
};
</script>

<style scoped>
form {
  width: 50%;
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
</style>