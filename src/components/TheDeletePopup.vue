<template>
    <!-- delete modal -->
    <div class="delete__modal--container">
        <div class="delete__modal--content">
            <img class="dangerous" src="../assets/img/dangerous.png" alt="">
            <p class="dangerous__text">
                <span>{{ deletePopupContent1 }}</span>
                <span style="font-weight: 600;">{{ deletePopupContent2 }}</span>
                <span>{{ deletePopupContent3 }}</span>
            </p>
        </div>
        <div class="delete__modal--buttons" ref="deletePopupButtons">
            <button
                class="outline__button--default cancel-delete-button delete__modal--button"
                @click="emitCloseDeletePopupEvent"
                ref="firstDeleteButton"
                @keydown.tab="handleTab"
            >
                {{ deletePopupButtonText[0] }}
            </button>
            <button 
                class="sub__button--default not-apply-button delete__modal--button"
                @click="emitCloseDeletePopupAndModal"
                :class="{ hide: !isUpdateModal }"
                @keydown.tab="handleTab"
            >
                {{ deletePopupButtonText[1] }}
            </button>
            <button 
                class="main__button--default apply-delete-button space-right delete__modal--button"
                @click="submitButton"
                @keydown.tab="handleTab"
            >
                {{ deletePopupButtonText[2] }}
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { baseUrl } from '@/utils/apiRoute';
export default {
    props: {
        deletePopupContent1: String,        // text of the delete popup.
        deletePopupContent2: String,        // text of the delete popup.
        deletePopupContent3: String,        // text of the delete popup.
        deletePopupButtonText: Array,       // text of the button.
        isUpdateModal: Boolean,             // the current modal is update or not.
        isOpenDeletePopup: Boolean,
        deleteId: String
    },
    watch: {
        /**
         * Focus on the first button of popup.
         * @param {Boolean} newValue - new value of prop isOpenDeletePopup.
         * @author vu
         */
        isOpenDeletePopup(newValue) {
            if (newValue === true) {
                setTimeout(() => {
                    this.$refs.firstDeleteButton.focus();
                }, 0);
            }
        }
    },
    emits: [
        'close-delete-popup',               // event when click the close button
        'open-success-popup',               // event when click 'Ok' button, and open the success popup.
        'close-delete-popup-and-modal',     // event when click 'cancel', close the popup and modal.
        'need-validate',
    ],
    methods: {
        /**
         * handle the 'close-delete-popup' event. Emit event to parent.
         * @author vu
         */
        emitCloseDeletePopupEvent() {
            this.$emit('close-delete-popup', false);
        },

        /**
         * handle the 'close-delete-popup-and-modal' event. Emit event to parent.
         * @author vu
         */
        emitCloseDeletePopupAndModal() {
            this.$emit('close-delete-popup-and-modal');
        },

        /**
         * handle the 'open-success-popup' event. Emit event to parent.
         * @author vu
         */
        emitOpenSuccessPopupEvent(msg) {
            this.$emit('open-success-popup', msg);
        },

        /**
         * handle the 'need-value' event. Emit event to parent.
         * @author vu
         */
        emitNeedValidateEvent() {
            this.$emit('need-validate');
        },

        /**
         * Handle tab index.
         * @param {Event} event 
         * @author vu
         */
        handleTab(event) {
            const buttons = this.$refs.deletePopupButtons;
            const focusableElements = buttons.querySelectorAll(
                'button:not([disabled]), [href]:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
            );
            console.log(focusableElements);
            const focusable = Array.prototype.filter.call(
                focusableElements,
                function (element) {
                // Ignore elements that are not visible, such as those inside a hidden div
                return element.offsetWidth > 0 || element.offsetHeight > 0;
                }
            );
            const currentIndex = focusable.indexOf(document.activeElement);
            if (event.shiftKey) {
                // If shift + tab is pressed, focus on the previous element
                if (currentIndex > 0) {
                    focusable[currentIndex - 1].focus();
                } else {
                // If the first element is currently focused, loop back to the last element
                    focusable[focusable.length - 1].focus();
                }
            } else {
                // If tab is pressed, focus on the next element
                if (currentIndex < focusable.length - 1) {
                    focusable[currentIndex + 1].focus();
                } else {
                    // If the last element is currently focused, loop back to the first element
                    focusable[0].focus();
                }
            }
            event.preventDefault();
        },

        async submitButton(event) {
            if (this.isUpdateModal) {
                this.emitNeedValidateEvent();
            } else {
                if (event.target.textContent === "Xóa") {
                    console.log(this.deleteId, typeof this.deleteId);
                    const deleteIdStr = this.deleteId;
                    await axios.delete(`${baseUrl}/api/fixedAssets`, {
                        headers: {
                            'Content-Type': 'application/json', 
                            'Accept': 'application/json' 
                        },
                        data: deleteIdStr
                    });

                    this.emitOpenSuccessPopupEvent('delete success');
                } else {
                    this.emitOpenSuccessPopupEvent();
                }
            }
        },
    },
};
</script>

<style lang="css" scoped>
.delete__modal--container {
    width: 400px;
    min-height: 150px;
    border-radius: 4px;
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.2);
    animation: modalFacein ease 0.5s;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

@keyframes modalFacein {
    from {
        transform: translateY(-1000px);
        opacity: 0;
    } to {
        transform: translateY(0);
        opacity: 1;
    }
}

.dangerous {
    height: 40px;
    width: auto;
}

.dangerous__text {
    font-size: 14px;
    margin-left: 24px;
}

.delete__modal--content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 24px;
}

.delete__modal--buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 24px;
}

.delete__modal--button {
    font-size: 12px;
    margin-left: 12px;
}

.hide {
    display: none;
}

.space-right {
    margin-right: 20px;
}

</style>