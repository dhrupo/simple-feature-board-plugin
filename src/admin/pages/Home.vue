<template>
  <div class="home">
    <h1 class="show-error">{{ error }}</h1>
    <div v-show="!error">
      <FeatureBoardLists
        :featureBoardList="featureBoardList"
      ></FeatureBoardLists>
    </div>
  </div>
</template>

<script>
import FeatureBoardLists from "../components/FeatureBoard/FeatureBoardLists.vue";
export default {
  name: "Home",
  components: {
    FeatureBoardLists,
  },
  data() {
    return {
      featureBoardList: [],
      error: "",
    };
  },
  methods: {
    getFeatureBoardList() {
      var self = this;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_get_features_board_list",
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.featureBoardList = data.data;
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
  },
  created() {
    this.getFeatureBoardList();
  },
};
</script>
<style>
.show-error {
  color: red;
}
</style>