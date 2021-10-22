<template>
  <form v-on:submit.prevent="addFeatureBoard">
    <h2 class="show-error">{{ error }}</h2>
    <div class="input-group">
      <label for="feature-board-title">Feature Board Title</label>
      <input
        required
        id="feature-borad-title"
        type="text"
        placeholder="Feature Board Title"
        v-model.trim.lazy="featureBoardTitle"
      />
    </div>
    <div class="input-group">
      <label for="feature-board-details">Feature Board Details</label>
      <textarea
        required
        id="feature-board-details"
        type="text"
        placeholder="Feature Board Details"
        cols="50"
        rows="5"
        v-model.trim.lazy="featureBoardDetails"
      ></textarea>
    </div>
    <div class="btn-group">
      <button type="submit" class="btn">Add Feature Board</button>
      <button @click="$emit('closeAdd')" class="btn">Back To List</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddFeatureBoard",
  data() {
    return {
      featureBoardTitle: "",
      featureBoardDetails: "",
      message: "",
      error: "",
    };
  },
  methods: {
    addFeatureBoard() {
      var self = this;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_insert_feature_board",
          title: self.featureBoardTitle,
          details: self.featureBoardDetails,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.message = data.data;
          self
            .$fire({
              title: "",
              text: self.message,
              type: "success",
            })
            .then((okay) => {
              if (okay) {
                self.$router.go("/");
              }
            });
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