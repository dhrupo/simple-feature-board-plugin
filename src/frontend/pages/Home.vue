<template>
  <div class="home">
    <FeatureRequestLists
      :featureBoardList="featureRequestList"
      :error="error"
    ></FeatureRequestLists>
    <!-- <FeatureLists :featureList="featureList" :error="error"></FeatureLists> -->
  </div>
</template>

<script>
import axios from "axios";
import FeatureRequestLists from "../components/FeatureRequest/FeatureRequestLists.vue";
export default {
  name: "Home",
  components: {
    FeatureRequestLists,
  },
  data() {
    return {
      FeatureRequestLists: [],
      error: "",
    };
  },
  methods: {
    getFeatureRequest() {
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("action", "wpsfb_get_features_request_list");
      formData.append("id", id);
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.FeatureRequestLists = res.data.data;
          // this.FeatureRequestLists.tags = this.FeatureRequestLists.tags
          //   ? this.FeatureRequestLists.tags.split(",")
          //   : [];
        })
        .catch((err) => {
          this.error = "Error retriving data";
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
