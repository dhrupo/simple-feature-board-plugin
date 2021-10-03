<template>
  <div>
    <button
      v-if="!showAddModal && !showEditModal"
      class="btn"
      @click="showAddModal = true"
    >
      Add a new feature board
    </button>
    <AddFeatureBoard
      v-if="showAddModal"
      @closeAdd="showAddModal = false"
    ></AddFeatureBoard>
    <div v-if="error">{{ error }}</div>
    <table v-if="!showAddModal && !showEditModal" id="feature-table">
      <tr>
        <th>Feature Baord Title</th>
        <th>Feature Details</th>
        <th>Shortcode</th>
        <th>Actions</th>
      </tr>
      <tr
        v-for="(featureBoard, index) in featureBoardList"
        :key="featureBoard.id"
      >
        <td>{{ featureBoard.title }}</td>
        <td>{{ featureBoard.details }}</td>
        <td>
          <div class="tooltip">
            <input
              ref="copycode"
              class="input-tooltip"
              readonly
              @click="copyShortcode(index)"
              @mouseleave="moveMove"
              :value="`[wpsfb-feature-board id=${featureBoard.id}]`"
            />
            <span class="tooltip-text">{{ copyMessage }}</span>
          </div>
        </td>
        <td>
          <button
            class="btn"
            @click="$router.push('feature_board_details/' + featureBoard.id)"
          >
            Details
          </button>
          <button
            class="btn"
            @click="() => deleteFeatureBoard(featureBoard.id)"
          >
            Delete
          </button>
          <button class="btn" @click="() => getFeatureBoard(featureBoard.id)">
            Edit
          </button>
        </td>
      </tr>
    </table>
    <EditFeatureBoard
      :featureBoard="featureBoard"
      v-if="showEditModal"
      @closeEdit="showEditModal = false"
    ></EditFeatureBoard>
  </div>
</template>

<script>
import axios from "axios";
import AddFeatureBoard from "../FeatureBoard/AddFeatureBoard.vue";
import EditFeatureBoard from "../FeatureBoard/EditFeatureBoard.vue";
export default {
  name: "FeatureBoardLists",
  components: {
    EditFeatureBoard,
    AddFeatureBoard,
  },
  data() {
    return {
      error: "",
      featureBoard: {},
      copyMessage: "click to copy the text",
      showAddModal: false,
      showEditModal: false,
    };
  },
  props: {
    featureBoardList: Array,
  },
  methods: {
    getFeatureBoard(id) {
      this.showEditModal = true;
      const formData = new FormData();
      formData.append("action", "wpsfb_get_single_feature_board");
      formData.append("id", id);
      axios
        .post(ajax_url.ajaxurl, formData)
        .then((res) => {
          this.featureBoard = res.data.data;
        })
        .catch((err) => {
          this.error = "Error retriving data";
          console.log(err);
        });
    },
    deleteFeatureBoard(id) {
      this.$confirm("Are you want to delete the data?")
        .then((okay) => {
          if (okay) {
            const formData = new FormData();
            formData.append("action", "wpsfb_delete_feature_board");
            formData.append("id", id);
            axios
              .post(ajax_url.ajaxurl, formData)
              .then((res) => {
                this.$router.go("/");
              })
              .catch((err) =>
                this.$alert("Error occured while deleting data", "", "error")
              );
          }
        })
        .catch((err) => {});
    },
    copyShortcode(index) {
      const copy = this.$refs.copycode[index].value;
      navigator.clipboard.writeText(copy);
      this.copyMessage = "text copied!";
    },
    moveMove() {
      this.copyMessage = "click to copy the text";
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
  cursor: default;
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