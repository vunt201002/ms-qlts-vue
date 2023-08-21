<template>
  <ts-header
    ref="tsHeader"
    :filterObject="filterObject"
    :isTableChecked="isTableChecked"
    @open-add-modal="emitOpenAddModalEvent"
    @open-delete-popup="emitOpenDeletePopup"
    @open-import-and-export="openImportAndExport"
    :typeArr="typeArr"
    :departmentArr="departmentArr"
    @send-department-filter="handleSendDepartmentFilter"
    @send-category-filter="handleSendCategoryFilter"
    @send-search="handleSendSearch"
  />
  <ts-table
    :isSubmit="isSubmit"
    @open-update-modal="emitOpenUpdateModal"
    @check-body="emitCheckBodyEvent"
    @send-id="emitSendId"
    @send-type="emitSendType"
    @send-department="emitSendDepartment"
    @replication-asset="emitOpenAddModalEvent"
    :departmentFilter="departmentFilter"
    :categoryFilter="categoryFilter"
    :search="search"
  />
</template>

<script>
import TsHeader from "../components/TsHeader.vue";
import TsTable from "../components/TsTable.vue";

export default {
  props: {
    isSubmit: Boolean,
  },
  components: {
    TsHeader,
    TsTable,
  },
  data() {
    return {
      isTableChecked: false,
      deletePopupMsg: "",
      typeArr: [],
      departmentArr: [],
      filterObject: {},
      departmentFilter: '',
      categoryFilter: '',
      search: '',
    };
  },
  emits: [
      'open-add-modal',
      'open-update-modal',
      'open-delete-popup',
      'check-body',
      'send-id',
      'send-type',
      'send-department',
      "open-import-and-export",
  ],
  methods: {
    /**
     * Handle open add modal event.
     * @param {string} msg - msg is title of the modal.
     * @author vu
     */
    emitOpenAddModalEvent(msg, data) {
      this.$emit('open-add-modal', msg, data);
    },

    /**
     * Handle open update modal event.
     * @param {string} msg - msg is title of the modal.
     * @author vu
     */
    emitOpenUpdateModal(msg) {
      this.$emit('open-update-modal', msg);
    },

    /**
     * Handle open delete popup event
     * @author vu
     */
    emitOpenDeletePopup() {
      if (this.isTableChecked !== false) {
        this.$emit('open-delete-popup');
      }
    },

    /**
     * Handle event when click the checkbox in table.
     * @param {Object} msg - data receive from table when click the checkbox.
     * @author vu
     */
    emitCheckBodyEvent(msg) {
      if (msg) {
        this.isTableChecked = true;
        this.$emit('check-body', msg);
      } else {
        this.isTableChecked = false;
      }
    },

    /**
     * Send id of items to the parent.
     * @param {Array} dataIds - an array of item's id.
     * @author vu
     */
    emitSendId(dataIds) {
      this.$emit('send-id', dataIds);
    },

    /**
     * Send type to the parent.
     * @param {Array} data - an array of type.
     * @author vu
     */
    emitSendType(data) {
      this.typeArr = data;
      this.$emit('send-type', data);
    },

    /**
     * Send department to the parent.
     * @param {Array} data - an array of department.
     */
    emitSendDepartment(data) {
      this.departmentArr = data;
      this.$emit('send-department', data);
    },
    handleSendFilterObject(data) {
      this.filterObject = data;
    },
    handleSendDepartmentFilter(data) {
      this.departmentFilter = data;
    },
    handleSendCategoryFilter(data) {
      this.categoryFilter = data;
    },
    handleSendSearch(data) {
      this.search = data;
    },
    openImportAndExport() {
      this.$emit('open-import-and-export');
    }
  },
};
</script>

<!-- event bus -->