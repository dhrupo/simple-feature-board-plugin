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
    <div v-if="error">{{ error }}</div>
    <table v-if="!showAddModal && !showEditModal" id="feature-table">
      <tr>
        <th>Feature Request Title</th>
        <th>Feature Request Details</th>
        <th>Feature Request Tags</th>
        <th>Status</th>
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
    </table>
    <EditFeatureRequest
      :feature="feature"
      v-if="showEditModal"
      @closeEdit="showEditModal = false"
    ></EditFeatureRequest>
  </div>
</template>

<script>
import axios from "axios";
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
    };
  },
  props: {
    featureRequest: [],
  },
  components: {
    AddFeatureRequest,
    EditFeatureRequest,
  },
  methods: {
    getFeatureToEdit(id) {
      this.showEditModal = true;
      const formData = new FormData();
      formData.append("action", "wpsfb_get_single_feature_to_edit");
      formData.append("id", id);
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.feature = res.data.data;
          this.feature.tags = this.feature.tags
            ? this.feature.tags.split(",")
            : [];
        })
        .catch((err) => {
          this.error = "Error retriving data";
          console.log(err);
        });
    },
    deleteFeature(id) {
      this.$confirm("Are you want to delete the data?")
        .then((okay) => {
          if (okay) {
            const formData = new FormData();
            formData.append("action", "wpsfb_delete_feature_request");
            formData.append("id", id);
            axios
              .post(ajax_url.ajaxurl, formData)
              .then((res) => {
                this.$alert("Successfully Deleted the data");
              })
              .catch((err) =>
                this.$alert("Error occured while deleting data", "", "error")
              );
          }
          this.$router.go(0);
        })
        .catch((err) => this.$alert("Something error happened"));
    },
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

.tooltip {
  position: relative;
  display: inline-block;
  width: 100%;
}

.tooltip input {
  width: 100%;
  padding: 6px;
  text-align: center;
  border: 1px solid #222;
  border-radius: 4px;
}

.tooltip .tooltip-text {
  visibility: hidden;
  width: 150px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 115%;
  left: 50%;
  margin-left: -60px;
}

.tooltip .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
}

.tooltip input:hover {
  cursor: pointer;
}
</style>