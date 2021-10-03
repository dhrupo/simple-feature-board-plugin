<template>
  <form v-on:submit.prevent="() => editFeatureBoard(featureBoard.id)">
    <div class="input-group">
      <label for="feature-title">Feature Board Title</label>
      <input
        required
        id="feature-board-title"
        type="text"
        placeholder="Feature Board Title"
        v-model.trim.lazy="featureBoard.title"
      />
    </div>
    <div class="input-group">
      <label for="feature-board-details">Feature Board Details</label>
      <textarea
        required
        id="feature-board-details"
        type="text"
        placeholder="Feature Baord Details"
        cols="50"
        rows="5"
        v-model.trim.lazy="featureBoard.details"
      ></textarea>
    </div>
    <div class="btn-group">
      <button type="submit" class="btn">Edit Feature</button>
      <button class="btn" @click="$emit('closeEdit')">Close</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "EditFeatureBoard",
  data() {
    return {};
  },
  props: {
    featureBoard: Object,
  },
  methods: {
    editFeatureBoard(id) {
      let formData = new FormData();
      formData.append("action", "wpsfb_edit_feature_board");
      formData.append("id", id);
      formData.append("title", this.featureBoard.title);
      formData.append("details", this.featureBoard.details);
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