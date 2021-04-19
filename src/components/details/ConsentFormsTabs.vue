<template>
  <div v-if="tabs.length">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a
          v-for="tab of tabs"
          @click="onTabSelect(tab)"
          class="nav-item nav-link"
          data-toggle="tab"
          role="tab"
          v-bind:class="{ active: tab === selectedTab }"
        >
          {{ tab.short_title }}
        </a>
      </div>
    </nav>
    <div v-if="contentItems.length" class="tab-content">
      <div class="tab-pane active">
        <ul class="list-group list-group-flush">
          <li v-for="item in contentItems" class="list-group-item">
            <strong
              class="name-field form-check-input"
              v-if="isSelectedCheckbox(item)"
              >{{ initials }}</strong
            >
            <input
              v-if="!isSelectedCheckbox(item) && item.need_initials"
              v-model="checkedInitials"
              :value="item"
              type="checkbox"
              class="form-check-input"
            />
            <span class="pl-1">{{ item.content }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Services from "../../Services/Room.services";

export default {
  name: "consent-forms-tabs",
  props: ["tabs", "initials"],
  data() {
    return {
      selectedTab: null,
      contentItems: [],
      checkedInitials: [],
    };
  },
  created() {
    this.setFirstTab();
  },
  watch: {
    tabs() {
      this.setFirstTab();
    },
  },
  methods: {
    setFirstTab() {
      if (!this.tabs || !this.tabs.length) {
        this.selectedTab = null;
      }

      this.selectedTab = this.tabs[0];
      this.loadTabContent();
    },
    onTabSelect(tab) {
      this.selectedTab = tab;
      this.loadTabContent();
    },
    loadTabContent() {
      Services.getConsentFormDetails(this.selectedTab.code).then((res) => {
        this.contentItems = res;
      });
    },
    isSelectedCheckbox(item) {
      return this.checkedInitials.includes(item);
    },
  },
};
</script>

<style lang="scss">
.name-field {
  margin-top: 0px;
}
</style>