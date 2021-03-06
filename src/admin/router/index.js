import Vue from 'vue'
import Router from 'vue-router'
import Home from 'admin/pages/Home.vue'
import AddFeatureBoard from 'admin/components/FeatureBoard/AddFeatureBoard.vue'
import FeatureRequestLists from 'admin/components/FeatureBoard/FeatureRequest/FeatureRequestLists.vue'
import FeatureRequestDetails from 'admin/components/FeatureBoard/FeatureRequest/FeatureRequestDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/add_new_feature_board',
      name: 'AddFeatureBoard',
      component: AddFeatureBoard
    },
    {
      path: '/feature_board_details/:id',
      name: 'FeatureRequestLists',
      component: FeatureRequestLists
    },
    {
      path: '/feature_request_details/:id',
      name: 'FeatureRequestDetails',
      component: FeatureRequestDetails
    },
  ]
})
