<template>
  <form v-on:submit.prevent="() => editFeature(feature.id)">
    <div class="input-group">
      <label for="feature-title">Feature Title</label>
      <input
        required
        id="feature-title"
        type="text"
        placeholder="Feature Title"
        v-model.trim.lazy="feature.title"
      />
    </div>
    <div class="input-group">
      <label for="feature-details">Feature Details</label>
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
      <label for="feature-tags">Feature Tags</label>
      <input
        id="feature-tags"
        @keyup.space="addTags"
        type="text"
        placeholder="Add tags by space"
        v-model.trim="featureTag"
      />
    </div>
    <div>
      <span v-for="(tag, index) in feature.tags" :key="index + 1">
        <span class="tag" @click="() => removeTag(index)">{{ tag }}</span>
      </span>
    </div>
    <div class="btn-group">
      <button type="submit" class="btn">Edit Feature</button>
      <button class="btn" @click="$emit('close')">Close</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "EditFeature",
  data() {
    return {
      featureTag: "",
    };
  },
  props: {
    feature: Object,
  },
  // computed: {
  // featureTags: function() {
  //   return this.feature.tags ? this.feature.tags.split(',') : [];
  // }
  // },
  methods: {
    editFeature(id) {
      let formData = new FormData();
      formData.append("action", "wpsfb_edit_feature");
      formData.append("id", id);
      formData.append("title", this.feature.title);
      formData.append("details", this.feature.details);
      formData.append("tags", this.feature.tags);
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
              this.$router.go("/");
            }
          });
        })
        .catch((err) =>
          this.$alert("Error occured while posting data", "", "error")
        );
    },
    addTags() {
      !this.feature.tags.includes(this.featureTag) &&
        this.feature.tags.push(this.featureTag);
      this.featureTag = "";
    },
    removeTag(index) {
      this.feature.tags.splice(index, 1);
      console.log(this.feature.tags);
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