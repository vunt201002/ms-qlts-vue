<template>
  <!-- container -->
  <div v-if="isLogin" class="container">
    <the-sider tabindex="1"/>
    <div class="main">
      <the-navbar tabindex="2"/>
      <div class="main__content">
        <!-- <ts-page
          ref="tsPage"
          :isSubmit="isSubmit"
          @open-add-modal="handleOpenAddModal"
          @open-update-modal="handleOpenUpdateModal"
          @open-delete-popup="handleOpenDeletePopup"
          @check-body="handleBodyChecked"
          @send-id="handleSendId"
          @send-type="handleSendType"
          @send-department="handleSendDepartment"
        /> -->
        <router-view
          :isSubmit="isSubmit"
          @open-add-modal="handleOpenAddModal"
          @open-update-modal="handleOpenUpdateModal"
          @open-delete-popup="handleOpenDeletePopup"
          @check-body="handleBodyChecked"
          @send-id="handleSendId"
          @send-type="handleSendType"
          @send-department="handleSendDepartment"
          @open-import-and-export="handleOpenExportAndImportModal"
        />
      </div>
    </div>
  </div>

  <!-- auth page -->
  <auth-page v-if="!isLogin"/>

  <!-- modal -->
  <div class="modal" :class="{ show: isOpenModal }">
    <the-base-modal
      :isOpenModal="isOpenModal"
      :modalTitle="modalTitle"
      :dataId="dataId"
      :typeArr="typeArr"
      :departmentArr="departmentArr"
      :isUpdateModal="isUpdateModal"
      :infoBindingUpdateForm="infoBindingUpdateForm"
      :isOpenDeletePopup="isOpenDeletePopup"
      :needValidate="needValidate"
      @close-modal="handleCloseModal"
      @cancel="handleCancel"
      @submit="handleSubmit"
    />
  </div>

  <!-- delete popup -->
  <div class="delete-modal" :class="{ show: isOpenDeletePopup }">
    <the-delete-popup
      :deletePopupContent1="deletePopupContent1"
      :deletePopupContent2="deletePopupContent2"
      :deletePopupContent3="deletePopupContent3"
      :deletePopupButtonText="deletePopupButtonText"
      :isUpdateModal="isUpdateModal"
      :isOpenDeletePopup="isOpenDeletePopup"
      :deleteId="deleteId"
      @close-delete-popup="handleCloseDeletePopup"
      @close-delete-popup-and-modal="handleCloseDeletePopupAndModal"
      @open-success-popup="handleOpenSuccessPopup"
      @need-validate="handleNeedValidateEvent"
    />
  </div>

  <!-- success popup -->
  <div class="success-modal" :class="{ show: isOpenSuccessPopup }">
    <the-success-popup :successPopupTitle="successPopupTitle"/>
  </div>

  <!-- export and import modal -->
  <div class="export-and-import-modal" :class="{ show: isOpenExportAndImportModal }">
    <export-and-import-modal @close-import-and-export-modal="handleCloseExportAndImportModal" />
  </div>

  <div v-if="isShowLoading" class="progress-container">
    <the-progress :isShowLoading="isShowLoading"/>
  </div>
</template>

<script>
import TheSider from "./components/TheSider.vue";
import TheNavbar from "./components/TheNavbar.vue";
import TheBaseModal from "./components/TheBaseModal.vue";
import TheDeletePopup from "./components/TheDeletePopup.vue";
import TheSuccessPopup from "./components/TheSuccessPopup.vue";
import TheProgress from "./components/common/TheProgress.vue";
import ExportAndImportModal from './components/private/ExportAndImportModal.vue';
import AuthPage from './view/AuthPage.vue';
import { Resources } from "./resources/Resources";

export default {
  name: 'App',
  /**
   * Show the progress for 1 second.
   */
  mounted() {
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1000); 
  },
  beforeMount() {
    if (localStorage.getItem("user")) {
      this.isLogin = true;
    }
  },
  components: {
    TheSider,
    TheNavbar,
    TheBaseModal,
    TheDeletePopup,
    TheSuccessPopup,
    TheProgress,
    ExportAndImportModal,
    AuthPage,
  },
  data() {
    return {
      isOpenModal: false,
      isUpdateModal: false,
      modalTitle: "",
      isOpenDeletePopup: false,
      deletePopupContent1: "",
      deletePopupContent2: "",
      deletePopupContent3: "",
      deletePopupButtonText: [],
      isOpenSuccessPopup: false,
      dataId: [],
      typeArr: [],
      departmentArr: [],
      infoBindingUpdateForm: {},
      successPopupTitle: "",
      needValidate: false,
      isShowLoading: true,
      deleteId: "",
      isSubmit: false,
      isOpenExportAndImportModal: false,
      isLogin: true,
    };
  },
  watch: {
    /**
     * If the modal is close, focus on the search input.
     * @param {Boolean} newIsOpenModal - new value of isOpenModal.
     * @author vu
    //  */
    // isOpenModal(newIsOpenModal) {
    //   if (newIsOpenModal === false) {
    //     setTimeout(() => {
    //       this.$refs.tsPage.$refs.tsHeader.$refs.tsSearch.focus();
    //     }, 0);
    //   }
    // },

    // /**
    //  * If the popup is close, focus on the search input.
    //  * @param {Boolean} newIsOpenDeletePopup - new value of isOpenDeletePopup.
    //  * @autho vu
    //  */
    // isOpenDeletePopup(newIsOpenDeletePopup) {
    //   if (newIsOpenDeletePopup === false) {
    //     setTimeout(() => {
    //       this.$refs.tsPage.$refs.tsHeader.$refs.tsSearch.focus();
    //     }, 0);
    //   }
    // },
    isSubmit(oldValue, newValue) {
      if (this.isUpdateModal === true && oldValue !== newValue) {
        this.isUpdateModal = false;
      }
    },
  },
  methods: {
    /**
     * Handle open add modal event
     * @param {String} msg - the title of modal.
     * @author vu
     */
    handleOpenAddModal(msg) {
      this.isUpdateModal = false;
      this.isOpenModal = true;
      this.modalTitle = msg;

      if (msg.data) {
        this.infoBindingUpdateForm = msg.data;
        this.modalTitle = msg.msg;
      }
    },

    /**
     * Handle close modal event.
     * @param {Boolean} msg - status of the modal (true of false).
     * @author vu
     */
    handleCloseModal(msg) {
      this.isOpenModal = msg;
      this.isUpdateModal = false;
    },

    /**
     * Handle open update modal event. Set the title
     * and binding data.
     * @param {Object} msg - data of the item clicked.
     * @author vu
     */
    handleOpenUpdateModal(msg) {
      this.isOpenModal = true;
      this.isUpdateModal = true;
      this.modalTitle = msg.modalTitle;
      this.infoBindingUpdateForm = msg.data;
    },

    /**
     * Handle open delete popup event.
     * @author vu
     */
    handleOpenDeletePopup() {
      this.isOpenDeletePopup = true;
      this.deletePopupButtonText = [
        Resources.cancelButtonText,
        Resources.defaultText,
        Resources.deleteButtonText
      ];
    },

    /**
     * Handle close delete popup event.
     * @param {Boolean} msg - status of the delete popup (close or open).
     * @author vu
     */
    handleCloseDeletePopup(msg) {
      this.isOpenDeletePopup = msg;
    },

    /**
     * Handle event when click the checkbox in table.
     * @param {Array} msg - an array of message to binding for delete popup.
     * @author vu
     */
    handleBodyChecked(msg) {
      if (msg[0].length < 10) {
        this.deletePopupContent2 = msg[0];
        this.deletePopupContent3 = msg[1];
        this.deleteId = msg[2];
        this.deletePopupContent1 = Resources.defaultText;
      } else {
        this.deletePopupContent2 = msg[0];
        this.deletePopupContent1 = msg[1];
        this.deleteId = msg[2];
        this.deletePopupContent3 = Resources.defaultText;
      }
    },

    /**
     * Handle open success popup event.
     * @author vu
     */
    handleOpenSuccessPopup(msg) {
      this.isOpenSuccessPopup = true;
      this.isOpenDeletePopup = false;
      if (this.isOpenModal && this.isUpdateModal) {
        this.successPopupTitle = Resources.submitSuccess;
      } else if (!this.isOpenModal) {
        this.successPopupTitle = Resources.deleteSuccess;
      } else {
        this.isOpenSuccessPopup = false;
      }
      this.isOpenModal = false;
      setTimeout(() => {
        this.isOpenSuccessPopup = false;
      }, 3000);

      if (msg === 'delete success') {
        this.isSubmit = !this.isSubmit;
      }
    },

    /**
     * Handle send id event.
     * @param {Array} dataId - an array of id.
     * @author vu
     */
    handleSendId(dataId) {
      this.dataId = dataId;
    },

    /**
     * Handle send type event.
     * @param {Array} data - an array of type.
     * @author vu
     */
    handleSendType(data) {
      this.typeArr = data;
    },

    /**
     * Handle send department event.
     * @param {Array} data - an array of department.
     * @author vu
     */
    handleSendDepartment(data) {
      this.departmentArr = data;
    },

    /**
     * Handle event when click cancel button.
     * @author vu
     */
    handleCancel() {
      this.isOpenDeletePopup = true;
      if (!this.isUpdateModal) {
        this.deletePopupContent1 = Resources.cancelAddAsset;
        this.deletePopupContent2 = Resources.defaultText;
        this.deletePopupContent3 = Resources.defaultText;
        this.deletePopupButtonText = [
            Resources.cancelButtonText,
            Resources.defaultText,
            Resources.cancelSaveButtonText
        ];
      } else {
        this.deletePopupContent1 = Resources.cancelSaveText;
        this.deletePopupContent2 = Resources.defaultText;
        this.deletePopupContent3 = Resources.defaultText;
        this.deletePopupButtonText = [
          Resources.cancelSaveButtonText,
          Resources.notSaveButtonText,
          Resources.submitButtonText
        ];
      }
    },

    /**
     * Handle when click submit button.
     * @author vu
     */
    handleSubmit() {
      this.isOpenSuccessPopup = true;
      this.isOpenModal = false;
      this.isSubmit = !this.isSubmit;
      setTimeout(() => {
        this.isOpenSuccessPopup = false;
      }, 3000);
      this.successPopupTitle = Resources.submitSuccess;
    },

    /**
     * Open both modal and popup.
     * @author vu
     */
    handleCloseDeletePopupAndModal() {
      this.isOpenDeletePopup = false;
      this.isOpenModal = false;
      this.isUpdateModal = false;
    },

    /**
     * Validate the form
     * @author vu
     */
    handleNeedValidateEvent() {
      this.isOpenDeletePopup = false;
      this.needValidate = true;
    },

    handleOpenExportAndImportModal() {
      this.isOpenExportAndImportModal = true;
    },

    handleCloseExportAndImportModal() {
      this.isOpenExportAndImportModal = false;
    },
  },
};
</script>

<style lang="css" scoped>
.container {
    display: flex;
    height: 100vh;
    /* overflow: hidden; */
}

.main {
    flex: 1;
}

.main__content {
    background-color: var(--main-bg);
    height: calc(100vh - 44px);
    padding: 0 16px;
}

.modal,
.delete-modal,
.export-and-import-modal {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: none;
    align-items: center;
    justify-content: center;
}

.progress-container {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal__container {
    width: 800px;
    background-color: white;
    animation: fadeIn ease 0.3s;
}

.success-modal {
    position: fixed;
    top: 47px;
    right: 0;
    display: none;
}

@keyframes fadeIn {
    from {
        transform: translateY(-1000px);
        opacity: 0;
    } to {
        transform: translateY(0);
        opacity: 1;
    }
}

.show {
  display: flex;
}

</style>
