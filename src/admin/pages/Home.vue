<template>
  <div class="home">
    <button class="btn" @click="$router.push('add_new_feature')">Add a new feature</button>
    <FeatureLists :featureList='featureList' :error='error'></FeatureLists>
  </div>
</template>

<script>
import axios from 'axios';
import FeatureLists from '../components/FeatureLists.vue';
export default {
  name: 'Home',
  components: {
    FeatureLists
  },
  data () {
    return {
      featureList: [],
      error: ""
    }
  },
  methods: {
    getFeatureList () {
      const formData = new FormData();
      formData.append('action', 'wpsfb_get_features_list');
      axios.post(ajax_url.ajaxurl, formData)
      .then(res=> {
        this.featureList = res.data.data;
      })
      .catch(err => {
        error = "Error retriving data";
        console.log(err);
      });
    },
  },
  created() {
    this.getFeatureList();
  }
}
</script>

<style scoped>
</style>
