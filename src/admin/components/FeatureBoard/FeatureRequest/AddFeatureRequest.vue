<template>
  <form v-on:submit.prevent="addFeature">
    <h2 class="show-error">{{ this.error }}</h2>
    <div class="input-group">
      <label for="feature-title">Feature Title</label>
      <input
        required
        id="feature-title"
        type="text"
        placeholder="Feature Title"
        v-model.trim.lazy="featureTitle"
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
        v-model.trim.lazy="featureDetails"
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
      <span v-for="(tag, index) in featureTags" :key="index + 1">
        <span class="tag" @click="() => removeTag(index)">{{ tag }}</span>
      </span>
    </div>
    <div class="btn-group">
      <button type="submit" class="btn">Add Feature</button>
      <button @click="$router.push('/')" class="btn">Back To List</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "AddFeature",
  data() {
    return {
      featureTitle: "",
      featureDetails: "",
      featureTag: "",
      featureTags: [],
      message: "",
      error: "",
    };
  },
  methods: {
    addFeature() {
      if (this.featureTags.length < 0) {
        this.error = "Must have add feature tags to create a new feature";
        return;
      }
      const formData = new FormData();
      formData.append("action", "wpsfb_insert_feature");
      formData.append("title", this.featureTitle);
      formData.append("details", this.featureDetails);
      formData.append("tags", this.featureTags);
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
              this.$router.push("/");
            }
          });
        })
        .catch((err) =>
          this.$alert("Error occured while posting data", "", "error")
        );
    },
    addTags() {
      !this.featureTags.includes(this.featureTag) &&
        this.featureTags.push(this.featureTag);
      this.featureTag = "";
    },
    removeTag(index) {
      // const selected = event.target.innerHTML;
      this.featureTags.splice(index, 1);
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