<template>
  <div>
    <div>
      <button
        v-if="!showAddModal && !showEditModal"
        class="btn"
        @click="$router.go(-1)"
      >
        Back
      </button>
      <button
        v-if="!showAddModal && !showEditModal"
        class="btn"
        @click="showAddModal = true"
      >
        Add feature Request
      </button>
    </div>
    <AddFeatureRequest
      v-if="showAddModal"
      @closeAdd="showAddModal = false"
    ></AddFeatureRequest>
    <h2 class="show-error">{{ error }}</h2>
    <table v-if="!showAddModal && !showEditModal" id="feature-table">
      <tr>
        <th @click="sortTitle">Feature Request Title</th>
        <th>Feature Request Details</th>
        <th>Feature Request Tags</th>
        <th @click="sortStatus">Status</th>
        <th>Username</th>
        <th>Actions</th>
      </tr>
      <tr v-for="feature in featureRequest" :key="feature.id">
        <td>{{ feature.title }}</td>
        <td>{{ feature.details }}</td>
        <td>{{ feature.tags }}</td>
        <td>{{ feature.status }}</td>
        <td>{{ feature.username }}</td>
        <td>
          <button
            class="btn"
            @click="$router.push('/feature_request_details/' + feature.id)"
          >
            Details
          </button>
          <button class="btn" @click="() => deleteFeature(feature.id)">
            Delete
          </button>
          <button class="btn" @click="() => getFeatureToEdit(feature.id)">
            Edit
          </button>
        </td>
      </tr>
      <div class="pagination">
        <a
          class="paginate"
          v-for="page in totalPages"
          :key="page"
          @click="getFeatureRequest(page)"
          >{{ page }}</a
        >
      </div>
    </table>
    <EditFeatureRequest
      :feature="feature"
      v-if="showEditModal"
      @closeEdit="showEditModal = false"
    ></EditFeatureRequest>
  </div>
</template>

<script>
import AddFeatureRequest from "./AddFeatureRequest.vue";
import EditFeatureRequest from "./EditFeatureRequest.vue";
export default {
  name: "FeatureRequestLists",
  data() {
    return {
      showEditModal: false,
      showAddModal: false,
      error: "",
      featureRequest: [],
      feature: {},
      reqPerPage: 5,
      totalCount: 0,
      totalPages: 0,
      pageno: 1,
    };
  },
  components: {
    AddFeatureRequest,
    EditFeatureRequest,
  },
  methods: {
    sortTitle() {
      const req = this.featureRequest.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    },
    sortStatus() {
      const req = this.featureRequest.sort((a, b) =>
        a.status.localeCompare(b.status)
      );
    },
    getFeatureToEdit(id) {
      var self = this;
      self.showEditModal = true;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_get_single_feature_to_edit",
          id: id,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.feature = data.data;
          self.feature.tags = self.feature.tags
            ? self.feature.tags.split(",")
            : [];
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
    deleteFeature(id) {
      var self = this;
      self.$confirm("Are you want to delete the data?").then((okay) => {
        if (okay) {
          var self = this;
          jQuery.ajax({
            type: "POST",
            url: ajax_url.ajaxurl,
            data: {
              action: "wpsfb_delete_feature_request",
              id: id,
              wpsfb_nonce: ajax_url.wpsfb_nonce,
            },
            success: function (data) {
              self.$router.go("/");
            },
            error: function (err) {
              self.$alert("Error occured while deleting data", "", "error");
            },
          });
        }
      });
    },
    getFeatureRequest(pageno) {
      pageno = pageno ? pageno : 1;
      var self = this;
      const id = self.$route.params.id;

      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_get_features_request_list",
          id: id,
          pageno: pageno,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.featureRequest = data.data;
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
    getFeatureRequestCount() {
      var self = this;
      const id = self.$route.params.id;
      jQuery.ajax({
        type: "POST",
        url: ajax_url.ajaxurl,
        data: {
          action: "wpsfb_get_features_request_count",
          id: id,
          wpsfb_nonce: ajax_url.wpsfb_nonce,
        },
        success: function (data) {
          self.totalCount = data.data && parseInt(data.data.count);
          self.totalPages = Math.ceil(self.totalCount / self.reqPerPage);
        },
        error: function (error) {
          self.error = error.responseJSON.data;
        },
      });
    },
  },
  created() {
    this.getFeatureRequest();
    this.getFeatureRequestCount();
  },
};
</script>

<style scoped>
#feature-table {
  width: 90%;
  margin: 20px auto 0;
  border-collapse: collapse;
}

#feature-table th {
  padding: 10px 0;
  background-color: darkgray;
}

#feature-table td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
  vertical-align: middle;
}

#feature-table tr:nth-child(even) {
  background-color: #ddd;
}

#feature-table tr:hover {
  cursor: pointer;
  background-color: #ccc;
}

.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border: 1px solid #ddd;
}

.pagination-active {
  background-color: #4caf50;
  color: white;
  border: 1px solid #4caf50;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}

.pagination a:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.pagination a:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>