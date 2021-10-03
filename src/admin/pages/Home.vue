<template>
  <div class="home">
    <FeatureBoardLists
      :featureBoardList="featureBoardList"
      :error="error"
    ></FeatureBoardLists>
    <!-- <FeatureLists :featureList="featureList" :error="error"></FeatureLists> -->
  </div>
</template>

<script>
import axios from "axios";
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
      const formData = new FormData();
      formData.append("action", "wpsfb_get_features_board_list");
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.featureBoardList = res.data.data;
        })
        .catch((err) => {
          error = "Error retriving data";
          console.log(err);
        });
    },
  },
  created() {
    this.getFeatureBoardList();
  },
};
</script>

<style scoped>
</style>
