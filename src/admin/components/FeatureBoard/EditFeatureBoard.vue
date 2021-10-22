<template>
  <form v-on:submit.prevent="() => editFeatureBoard(featureBoard.id)">
    <h2 class="show-error">{{ this.error }}</h2>
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
export default {
  name: "EditFeatureBoard",
  data() {
    return {
      error: "",
    };
  },
  props: {
    featureBoard: Object,
  },
  methods: {
    editFeatureBoard(id) {
      var self = this;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_edit_feature_board",
          id: id,
          title: self.featureBoard.title,
          details: self.featureBoard.details,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.$router.go("/");
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
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