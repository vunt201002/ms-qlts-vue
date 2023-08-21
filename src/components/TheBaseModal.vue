<template>
    <form class="modal__container" @submit.prevent="onSubmit" ref="myForm">
        <!-- Header -->
        <div class="modal__header">
            <p class="modal__header--text">{{ modalTitle }}</p>
            <div
                class="close-sprite modal__header--close pointer"
                @click="handleCloseModal"
            >
            </div>
        </div>
        <!-- container -->
        <div class="modal-container">
            <!-- Hàng 1 -->
            <div
                class="form-group row-first space-top"
                :class="{ invalid: info.fixed_asset_code.error.status }"
                >
                <label for="" class="form-label form-label-require">Mã tài sản</label>
                <input
                    :ref="info.fixed_asset_code.ref"
                    v-model="info.fixed_asset_code.value"
                    class="form-input left-input form-control"
                    type="text"
                    @input="onInput('fixed_asset_code')"
                    @keydown.tab="handleTab"
                >
                <span class="form-message">{{ info.fixed_asset_code.error.text }}</span>
            </div>
            <div
                class="form-group row-second space-top"
                :class="{ invalid: info.fixed_asset_name.error.status }"
            >
                <label for="" class="form-label form-label-require">Tên tài sản</label>
                <input
                    :ref="info.fixed_asset_name.ref"
                    class="form-input left-input form-control"
                    type="text"
                    placeholder="Nhập tên tài sản"
                    v-model="info.fixed_asset_name.value"
                    @input="onInput('fixed_asset_name')"
                    @keydown.tab="handleTab"
                >
                <span class="form-message">{{ info.fixed_asset_name.error.text }}</span>
            </div>
            <!-- Hàng 2 -->
            <div
                class="form-group row-first"
                :class="{ invalid: info.department_code.error.status }"
            >
                <label for="" class="form-label form-label-require">Mã bộ phận sử dụng</label>
                <div class="postion-relative">
                    <div class="arrow-down-solid-sprite popup-right-position-icon"></div>
                    <dropdown-component
                        :isHideIcon="true"
                        :departmentArr="departmentArr"
                        placeholderText="Chọn mã bộ phận sử dụng"
                        class="custom-dropdown form-control"
                        @send-name="
                            ($event) => {
                                info.department_name.value = $event.name;
                                info.department_code.value = $event.id;
                                info.department_id.value = $event.guid;
                                onInput('department_code');
                            }
                        "
                        :ref="info.department_code.ref"
                        :showId="true"
                        :bindingData="info.department_code.value"
                        :isOpenModal="isOpenModal"
                        @keydown.tab="handleTab"
                    />
                </div>
                <span class="form-message">{{ info.department_code.error.text }}</span>
            </div>
            <div
                class="form-group row-second"
                :class="{ invalid: info.department_name.error.status }"
            >
                <label for="" class="form-label">Tên bộ phận sử dụng</label>
                <input
                    :ref="info.department_name.ref"
                    @input="onInput('department_name')"
                    v-model="info.department_name.value"
                    class="form-input left-input form-control"
                    disabled
                    type="text"
                    @keydown.tab="handleTab"
                >
                <span class="form-message">{{ info.department_name.error.text }}</span>
            </div>
            <!-- Hàng 3 -->
            <div
                class="form-group row-first"
                :class="{ invalid: info.fixed_asset_category_code.error.status }"
            >
                <label for="" class="form-label form-label-require">Mã loại tài sản</label>
                <div class="postion-relative">
                    <div class="arrow-down-solid-sprite popup-right-position-icon"></div>
                    <dropdown-component
                        :isHideIcon="true"
                        :typeArr="typeArr"
                        placeholderText="Chọn mã loại tài sản"
                        class="custom-dropdown form-control"
                        @send-name="
                            ($event) => {
                                info.fixed_asset_category_name.value = $event.name;
                                info.fixed_asset_category_code.value = $event.id;
                                info.fixed_asset_category_id.value = $event.guid;
                                onInput('fixed_asset_category_code');
                            }
                        "
                        :ref="info.fixed_asset_category_code.ref"
                        :showId="true"
                        :bindingData="info.fixed_asset_category_code.value"
                        :isOpenModal="isOpenModal"
                        @keydown.tab="handleTab"
                    />
                </div>
                <span class="form-message">{{ info.fixed_asset_category_code.error.text }}</span>
            </div>
            <div
                class="form-group row-second"
                :class="{ invalid: info.fixed_asset_category_name.error.status }"
            >
                <label for="" class="form-label">Tên loại tài sản</label>
                <input
                    :ref="info.fixed_asset_category_name.ref"
                    @input="onInput('fixed_asset_category_name')"
                    v-model="info.fixed_asset_category_name.value"
                    class="form-input left-input form-control"
                    disabled
                    type="text"
                    @keydown.tab="handleTab"
                >
                <span class="form-message">{{ info.fixed_asset_category_name.error.text }}</span>
            </div>
            <!-- Hàng 4 -->
            <div
                class="form-group row-first"
                :class="{ invalid: info.quantity.error.status }"
            >
                <label for="" class="form-label form-label-require">Số lượng</label>
                <div class="form-input">
                    <input
                        :ref="info.quantity.ref"
                        min="0"
                        class="right-input form-control"
                        style="width: 100%; height: 100%;"
                        type="number"
                        v-model="info.quantity.value"
                        @input="onInput('quantity')"
                        @keydown.tab="handleTab"
                    >
                    <div class="arrow-up-solid-sprite popup-right-top-position-icon"></div>
                    <div class="arrow-down-solid-sprite popup-right-bottom-position-icon"></div>
                </div>
                <span class="form-message">{{ info.quantity.error.text }}</span>
            </div>
            <div class="small-col">
                <div class="form-group" :class="{ invalid: info.cost.error.status }">
                    <label for="" class="form-label form-label-require">Nguyên giá</label>
                    <input
                        :ref="info.cost.ref"
                        @input="onInput('cost')"
                        v-model="info.cost.value"
                        class="form-input right-input form-control"
                        type="text"
                        @keydown="onLyNumber"
                        @change="() => {
                            countAmortizationOfYear();
                        }"
                        @keyup="formatNumberOnBlur('cost')"
                        @keydown.tab="handleTab"
                    >
                    <span class="form-message">{{ info.cost.error.text }}</span>
                </div>
                <div class="form-group" :class="{ invalid: info.life_time.error.status }">
                    <label for="" class="form-label form-label-require">Số năm sử dụng</label>
                    <input
                        :ref="info.life_time.ref"
                        @input="onInput('life_time')"
                        v-model="info.life_time.value"
                        class="form-input right-input form-control"
                        type="text"
                        @keydown="onLyNumber"
                        @change="coutdepreciation_rate"
                        @keyup="formatNumberOnBlur('life_time')"
                        @keydown.tab="handleTab"
                    >
                    <span class="form-message">{{ info.life_time.error.text }}</span>
                </div>
            </div>
            <!-- Hàng 5 -->
            <div
                class="form-group row-first"
                :class="{ invalid: info.depreciation_rate.error.status }"
            >
                <label for="" class="form-label form-label-require">Tỷ lệ hao mòn (%)</label>
                <div class="postion-relative">
                    <input
                        :ref="info.depreciation_rate.ref"
                        @input="onInput('depreciation_rate')"
                        v-model="info.depreciation_rate.value"
                        class="form-input right-input form-control"
                        style="width: 100%;"
                        type="number"
                        @change="countAmortizationOfYear"
                        @keydown.tab="handleTab"
                    >
                    <div class="arrow-up-solid-sprite popup-right-top-position-icon"></div>
                    <div class="arrow-down-solid-sprite popup-right-bottom-position-icon"></div>
                </div>
                <span class="form-message">{{ info.depreciation_rate.error.text }}</span>
            </div>
            <div class="small-col">
                <div class="form-group" :class="{ invalid: info.amortization_of_year.error.status }">
                    <label for="" class="form-label form-label-require">Giá trị hao mòn theo năm</label>
                    <input
                        :ref="info.amortization_of_year.ref"
                        @input="onInput('amortization_of_year')"
                        v-model="info.amortization_of_year.value"
                        class="form-input right-input form-control"
                        type="text"
                        @keydown="onLyNumber"
                        @keyup="formatNumberOnBlur('amortization_of_year')"
                        @keydown.tab="handleTab"
                    >
                    <span class="form-message">{{ info.amortization_of_year.error.text }}</span>
                </div>
                <div class="form-group" :class="{ invalid: info.tracked_year.error.status }">
                    <label for="" class="form-label">Năm theo dõi</label>
                    <input
                        :ref="info.tracked_year.ref"
                        @input="onInput('tracked_year')"
                        v-model="info.tracked_year.value"
                        class="form-input right-input form-control"
                        disabled
                        type="text"
                        @keydown.tab="handleTab"
                    >
                    <span class="form-message">{{ info.tracked_year.error.text }}</span>
                </div>
            </div>
            <!-- Hàng 6 -->
            <div
                class="form-group row-first"
                :class="{ invalid: info.purchase_date.error.status }"
            >
                <label for="" class="form-label form-label-require">Ngày mua</label>
                <input
                    :ref="info.purchase_date.ref"
                    @input="onInput('purchase_date')"
                    v-model="info.purchase_date.value"
                    class="form-input form-control"
                    type="date"
                    @keydown.tab="handleTab"
                >
                <span class="form-message">{{ info.purchase_date.error.text }}</span>
            </div>
            <div class="small-col">
                <div
                    class="form-group"
                    :class="{ invalid: info.started_use_date.error.status }"
                >
                    <label for="" class="form-label form-label-require">Ngày bắt đầu sử dụng</label>
                    <input
                        :ref="info.started_use_date.ref"
                        @input="() => {
                            onInput('started_use_date');
                        }"
                        v-model="info.started_use_date.value"
                        class="form-input form-control"
                        type="date"
                        @keydown.tab="handleTab"
                    >
                    <span class="form-message">{{ info.started_use_date.error.text }}</span>
                </div>
            </div>
        </div>
        <!-- Button -->
        <div class="modal-buttons"
        >
            <button
                class="outline__button--default cancel-button"
                @click="emitCancel"
                @keydown.tab="handleTab"
            >
                Hủy
            </button>
            <button 
                class="main__button--default submit-button"
                type="submit"
                @keydown.tab="handleTab"
            >
                Lưu
            </button>
        </div>
    </form>
</template>

<script>
import DropdownComponent from './DropdownComponent.vue';
import { formatNumber, reverseFormatNumber } from '../utils/utilsFunction.js';
import axios from 'axios';
import { baseUrl } from '../utils/apiRoute';

export default {
    mounted() {
        const genNewCode = async () => {
            const res = await axios.get(`${baseUrl}/newcode`);
            this.info.fixed_asset_code.value = res.data;
        };
        genNewCode();
    },
    components: {
        DropdownComponent,
    },
    props: {
        isOpenModal: Boolean,           // handle open and close modal
        modalTitle: String,             // the modal title
        dataId: Array,                  // An array of items id, use to validate duplicate id.
        typeArr: Array,                 // type of item array
        departmentArr: Array,           // department array
        isUpdateModal: Boolean,         // To distinguish the add form or update form
        infoBindingUpdateForm: Object,  // data receive when click the item, use to binding update form.
        isOpenDeletePopup: Boolean,
        needValidate: Boolean,
    },
    watch: {
        /**
        * When open update form, we need to binding data of item
        * to the form. We receive it from parent and when it change,
        * update this.
        * @param {object} newInfo - the data from parent.
        * @author vu
        */
        infoBindingUpdateForm(newInfo) {
            this.info.fixed_asset_id.value = newInfo.fixed_asset_id;
            this.info.fixed_asset_code.value = newInfo.fixed_asset_code;
            this.info.fixed_asset_name.value = newInfo.fixed_asset_name;
            this.info.department_id.value = newInfo.department_id;
            this.info.department_code.value = newInfo.department_code;
            this.info.department_name.value = newInfo.department_name;
            this.info.fixed_asset_category_id.value = newInfo.fixed_asset_category_id;
            this.info.fixed_asset_category_code.value = newInfo.fixed_asset_category_code;
            this.info.fixed_asset_category_name.value = newInfo.fixed_asset_category_name;
            this.info.quantity.value = newInfo.quantity;
            this.info.cost.value = formatNumber(newInfo.cost);
            this.info.life_time.value = newInfo.life_time;
            this.info.depreciation_rate.value = formatNumber(newInfo.depreciation_rate);
            this.info.amortization_of_year.value = formatNumber(newInfo.amortization_of_year);
            this.info.tracked_year.value = newInfo.tracked_year;
            this.info.purchase_date.value = newInfo.purchase_date;
            this.info.started_use_date.value = newInfo.started_use_date;
        },

        /**
        * block user enter negative number.
        * @param {number} newValue - the input of user.
        * @author vu
        */
        'info.quantity.value'(newValue) {
            if (newValue < 0) {
                this.info.quantity.value = 0;
            }
        },

        /**
         * If open modal, focus on the first input.
         * @param {Boolean} newValue - new value of prop 'isOpenModal'.
         * @author vu
         */
        isOpenModal(newValue) {
            if (newValue === true) {
                setTimeout(() => {
                    this.$refs.fixed_asset_code.focus();
                }, 0);
            } else {
                this.resetInput();
            }
        },

        /**
         * Focus on the first input when close popup.
         * @param {Boolean} newValue - new value of prop 'isOpenDeletePopup'.
         * @author vu
         */
        isOpenDeletePopup(newValue) {
            if (newValue === false && this.isOpenModal === true) {
                this.forcusIfError();
            }
        },

        /**
         * Validate when click submit button on delete popup.
         * @param {Boolean} newValue - new value of prop 'needValidate'.
         */
        needValidate(newValue) {
            if (newValue === true) {
                this.onSubmit();
            }
        },
    },
    data() {
        return {
            // form is validator or not.
            isValidator: false,

            // an object contain fields that we need to validate.
            info: {
                fixed_asset_id: {
                    value: "",
                    name: "id tài sản",
                    ref: 'fixed_asset_id',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                fixed_asset_code: {
                    value: "",
                    name: "Mã tài sản",
                    ref: 'fixed_asset_code',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                fixed_asset_name: {
                    value: "",
                    name: "Tên tài sản",
                    ref: 'fixed_asset_name',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                department_id: {
                    value: "",
                    name: "Id bộ phận sử dụng",
                    ref: 'department_id',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                department_code: {
                    value: "",
                    name: "Mã bộ phận sử dụng",
                    ref: 'department_code',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                department_name: {
                    value: "",
                    name: "Tên bộ phận sử dụng",
                    ref: 'department_name',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                fixed_asset_category_id: {
                    value: "",
                    name: "id loại tài sản",
                    ref: 'fixed_asset_category_id',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                fixed_asset_category_code: {
                    value: "",
                    name: "Mã loại tài sản",
                    ref: 'fixed_asset_category_code',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                fixed_asset_category_name: {
                    value: "",
                    name: "Tên loại tài sản",
                    ref: 'fixed_asset_category_name',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                quantity: {
                    value: 1,
                    name: "Số lượng",
                    ref: 'quantity',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                cost: {
                    value: 0,
                    name: "Nguyên giá",
                    ref: 'cost',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                life_time: {
                    value: 0,
                    name: "Số năm sử dụng",
                    ref: 'life_time',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                depreciation_rate: {
                    value: 0,
                    name: "Tỷ lệ hao mòn",
                    ref: 'depreciation_rate',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                amortization_of_year: {
                    value: 0,
                    name: "Giá trị hao mòn theo năm",
                    ref: 'amortization_of_year',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                tracked_year: {
                    value: "2021",
                    name: "Năm theo dõi",
                    ref: 'tracked_year',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                purchase_date: {
                    value: new Date().toISOString().slice(0,10),
                    name: "Ngày mua",
                    ref: 'purchase_date',
                    error: {
                        text: "",
                        status: false,
                    },
                },
                started_use_date: {
                    value: new Date().toISOString().slice(0,10),
                    name: "Ngày bắt đầu sử dụng",
                    ref: 'started_use_date',
                    error: {
                        text: "",
                        status: false,
                    },
                },
            },
        };
    },
    emits: [
        'close-modal',      // event when click close button.
        'cancel',           // event when click cancel button.
        'submit'            // event when submit form.
    ],
    methods: {
        /**
         * Focus on the first error input.
         * @author vu
         */
        forcusIfError() {
            let isError = false;
            for (const prop in this.info) {
                if (this.info[prop].error.status === true) {
                    isError = true;
                    if (prop === 'department_code' || prop === 'fixed_asset_category_code') {
                        setTimeout(() => {
                            this.$refs[prop].$refs.dropdownInput.focus();
                        }, 0);
                    } else {
                        setTimeout(() => {
                            this.$refs[prop].focus();
                        }, 0);
                    }
                    break;
                }
            }

            if (!isError) {
                setTimeout(() => {
                    this.$refs.fixed_asset_code.focus();
                }, 0);
            }
        },

        /**
        * Clear input and the error status when click close,
        * cancel or submit button.
        * @author vu
        */
        resetInput() {
            this.info.fixed_asset_id.value = "";
            this.info.fixed_asset_code.value = "TS00001";
            this.info.fixed_asset_name.value = "";
            this.info.department_id.value = "";
            this.info.department_code.value = "";
            this.info.department_name.value = "";
            this.info.fixed_asset_category_id.value = "";
            this.info.fixed_asset_category_code.value = "";
            this.info.fixed_asset_category_name.value = "";
            this.info.quantity.value = 1;
            this.info.cost.value = 0;
            this.info.life_time.value = 0;
            this.info.depreciation_rate.value = 0;
            this.info.amortization_of_year.value = 0;
            this.info.tracked_year.value = "2021";
            this.info.purchase_date.value = new Date().toISOString().slice(0,10);
            this.info.started_use_date.value = new Date().toISOString().slice(0,10);

            this.info.fixed_asset_code.error.status = false;
            this.info.fixed_asset_code.error.text = "";

            this.info.fixed_asset_name.error.status = false;
            this.info.fixed_asset_name.error.text = "";

            this.info.department_code.error.status = false;
            this.info.department_code.error.text = "";

            this.info.department_name.error.status = false;
            this.info.department_name.error.text = "";

            this.info.fixed_asset_category_code.error.status = false;
            this.info.fixed_asset_category_code.error.text = "";

            this.info.fixed_asset_category_name.error.status = false;
            this.info.fixed_asset_category_name.error.text = "";

            this.info.quantity.error.status = false;
            this.info.quantity.error.text = "";

            this.info.cost.error.status = false;
            this.info.cost.error.text = "";

            this.info.life_time.error.status = false;
            this.info.life_time.error.text = "";

            this.info.depreciation_rate.error.status = false;
            this.info.depreciation_rate.error.text = "";

            this.info.amortization_of_year.error.status = false;
            this.info.amortization_of_year.error.text = "";

            this.info.tracked_year.error.status = false;
            this.info.tracked_year.error.text = "";

            this.info.purchase_date.error.status = false;
            this.info.purchase_date.error.text = "";

            this.info.started_use_date.error.status = false;
            this.info.started_use_date.error.text = "";
        },

        /**
        * Handle the 'close-modal' event. Reset input and emit
        * event to parent.
        * @author vu 
        */
        handleCloseModal() {
            this.resetInput();
            this.$emit('close-modal', false);
        },

        /**
         * Handle tab index.
         * @param {Event} event 
         * @author vu
         */
        handleTab(event) {
            const form = this.$refs.myForm;
            const focusableElements = form.querySelectorAll(
                'button:not([disabled]), [href]:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
            );
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
                    // If the first element is currently foclife_time, loop back to the last element
                    focusable[focusable.length - 1].focus();
                }
            } else {
                // If tab is pressed, focus on the next element
                if (currentIndex < focusable.length - 1) {
                    focusable[currentIndex + 1].focus();
                } else {
                    // If the last element is currently foclife_time, loop back to the first element
                    focusable[0].focus();
                }
            }   
            event.preventDefault();
        },

        /**
         * handle the 'cancel' event. Reset input and emit
         * the event to parent.
         * @author vu
         */
        emitCancel($event) {
            $event.preventDefault();
            this.$emit('cancel');
        },

        /**
         * validate if the input is empty.
         * @param {string} name - name of the field we validate.
         * @param {string} input - input from user.
         * @author vu
         */
        validateEmpty(name, input) {
            if (input === '') {
                this.info[name].error.status = true;
                this.info[name].error.text = `Vui lòng nhập trường ${this.info[name].name}`;
            }
        },

        /**
         * validate max length of input.
         * @param {string} name - name of field we validate. 
         * @param {string} input - input from user.
         * @author vu
         */
        validateMaxLength(name, input) {
            if (input.length > 255) {
                this.info[name].error.status = true;
                this.info[name].error.text = `${this.info[name].name} tối đa 6 ký tự`;
            }
        },

        /**
         * validate the field id. If input exists, we throw error.
         * @param {string} name - name of field we validate. 
         * @param {string} input - input from user.
         * @author vu
         */
        validateDuplicateId(name, input) {
            for (let i = 0; i < this.dataId.length; i++) {
                if (this.dataId[i] === input) {
                    this.info[name].error.status = true;
                    this.info[name].error.text = "Mã tài sản bị trùng";
                    break;
                }
            }
        },

        /**
         * validate the depreciation value.
         * @param {string} name - name of field we validate. 
         * @param {string} input - input from user.
         * @author vu
         */
        validateamortization_of_year(name, input) {
            if (reverseFormatNumber(input) > reverseFormatNumber(this.info.cost.value)) {
                this.info[name].error.status = true;
                this.info[name].error.text = "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá";
            }
        },


        validateDepreciationRate(name, input) {
            if (reverseFormatNumber(this.info.life_time.value) !== 0) {
                if (reverseFormatNumber(input) !== 1 / reverseFormatNumber(this.info.life_time.value)) {
                    this.info[name].error.status = true;
                    this.info[name].error.text = "Tỷ lệ hao mòn bằng 1 chia số năm sử dụng (%)";
                }
            }
        },

        /**
         * count the depreciation value if original price or
         * wear and tear are change.
         * @author vu
         */
        countAmortizationOfYear() {
            this.info.amortization_of_year.value = 
                formatNumber(
                    reverseFormatNumber(this.info.cost.value) *
                    (this.info.depreciation_rate.value / 100)
                )
            ;
        },

        /**
         * count the wear and tear if depreciation value is change.
         * @author vu
         */
        coutdepreciation_rate() {
            this.info.depreciation_rate.value = (100 / this.info.life_time.value).toFixed(2);
            this.countAmortizationOfYear();
        },

        /**
         * validate if the form is add form.
         * @author vu
         */
        async validateAddItem() {
            this.validateEmpty('fixed_asset_name' ,this.info.fixed_asset_name.value);
            this.validateEmpty('fixed_asset_code' ,this.info.fixed_asset_code.value);
            this.validateEmpty('department_code' ,this.info.department_code.value);
            this.validateEmpty('fixed_asset_category_code' ,this.info.fixed_asset_category_code.value);
            this.validateEmpty('quantity' ,this.info.quantity.value);
            this.validateEmpty('cost' ,this.info.cost.value);
            this.validateEmpty('life_time' ,this.info.life_time.value);
            this.validateEmpty('depreciation_rate' ,this.info.depreciation_rate.value);
            this.validateEmpty('amortization_of_year' ,this.info.amortization_of_year.value);
            this.validateEmpty('tracked_year' ,this.info.tracked_year.value);
            this.validateEmpty('purchase_date' ,this.info.purchase_date.value);
            this.validateEmpty('started_use_date' ,this.info.started_use_date.value);

            this.validateMaxLength('fixed_asset_name', this.info.fixed_asset_name.value);

            this.validateDuplicateId('fixed_asset_code', this.info.fixed_asset_code.value);

            this.validateamortization_of_year('amortization_of_year', this.info.amortization_of_year.value);
            this.validateDepreciationRate('depreciation_rate', this.info.depreciation_rate.value);

            // check mã trùng
            const res = await axios.post(
                `${baseUrl}/duplicate/00000000-0000-0000-0000-000000000000/${this.info.fixed_asset_code.value}`,
                "00000000-0000-0000-0000-000000000000",
                this.info.fixed_asset_code.value
            );

            console.log(res);

            if (res.data !== 1) {
                this.info['fixed_asset_code'].error.status = true;
                this.info['fixed_asset_code'].error.text = "Mã tài sản bị trùng";
            }
        },

        /**
         * validate if the form is update form
         * @author vu
         */
        async validateUpdateItem() {
            this.validateEmpty('fixed_asset_name' ,this.info.fixed_asset_name.value);
            this.validateEmpty('fixed_asset_code' ,this.info.fixed_asset_code.value);
            this.validateEmpty('department_code' ,this.info.department_code.value);
            this.validateEmpty('fixed_asset_category_code' ,this.info.fixed_asset_category_code.value);
            this.validateEmpty('quantity' ,this.info.quantity.value);
            this.validateEmpty('cost' ,this.info.cost.value);
            this.validateEmpty('life_time' ,this.info.life_time.value);
            this.validateEmpty('depreciation_rate' ,this.info.depreciation_rate.value);
            this.validateEmpty('amortization_of_year' ,this.info.amortization_of_year.value);
            this.validateEmpty('tracked_year' ,this.info.tracked_year.value);
            this.validateEmpty('purchase_date' ,this.info.purchase_date.value);
            this.validateEmpty('started_use_date' ,this.info.started_use_date.value);

            this.validateMaxLength('fixed_asset_name', this.info.fixed_asset_name.value);
            this.validateamortization_of_year('amortization_of_year', this.info.amortization_of_year.value);
            this.validateDepreciationRate('depreciation_rate', this.info.depreciation_rate.value);

            // check mã trùng
            const res = await axios.post(
                `${baseUrl}/duplicate/${this.info.fixed_asset_category_id.value}/${this.info.fixed_asset_code.value}`,
                this.info.fixed_asset_category_id.value,
                this.info.fixed_asset_code.value
            );

            if (res.data !== 1) {
                this.info['fixed_asset_code'].error.status = true;
                this.info['fixed_asset_code'].error.text = "Mã tài sản bị trùng";
            }
        },

        /**
         * only allow to enter number, backspace or use the arrow.
         * @param {Event} event - the default event param.
         * @author vu
         */
        onLyNumber(event) {
            if (!/[0-9]/.test(event.key) &&
                event.key !== 'Backspace' &&
                event.key !== 'ArrowLeft' &&
                event.key !== 'ArrowRight' &&
                event.key !== 'Tab' &&
                event.key !== '.'
            ) {
                event.preventDefault();
            }
        },
        
        formatNumberOnBlur(name) {
            console.log(this.info[name].value, name);
            console.log(this.info.amortization_of_year.value);
            this.info[name].value = formatNumber(this.info[name].value);
        },

        /**
         * clear error status when user input.
         * @param {Event} e - the default event param.
         */
        onInput(e) {
            this.info[e].error.status = false;
            this.info[e].error.text = "";
        },

        /**
         * submit the form.
         * @author vu
         */
        async onSubmit() {
            console.log(this.info);

            if (this.isUpdateModal) {
                this.validateUpdateItem();
            } else {
                this.validateAddItem();
            }

            let countValid = 0;
            let len = 0;
            for (let key in this.info) {
                if (key === 'department_id' || key === 'fixed_asset_category_id') {
                    continue;
                }

                if (this.info[key].error.status === false) {
                    countValid++;
                }
                len++;
            }
            
            // add new fixed_asset
            if (countValid === len && this.isUpdateModal === false) {
                
                const data = {
                    fixed_asset_code: this.info.fixed_asset_code.value,
                    fixed_asset_name: this.info.fixed_asset_name.value,
                    department_id: this.info.department_id.value,
                    department_code: this.info.department_code.value,
                    department_name: this.info.department_name.value,
                    fixed_asset_category_id: this.info.fixed_asset_category_id.value,
                    fixed_asset_category_code: this.info.fixed_asset_category_code.value,
                    fixed_asset_category_name: this.info.fixed_asset_category_name.value,
                    purchase_date: this.info.purchase_date.value,
                    started_use_date: this.info.started_use_date.value,
                    cost: this.info.cost.value,
                    quantity: this.info.quantity.value,
                    depreciation_rate: this.info.depreciation_rate.value,
                    amortization_of_year: this.info.amortization_of_year.value,
                    tracked_year: this.info.tracked_year.value,
                    life_time: this.info.life_time.value,
                };

                await axios.post(`${baseUrl}/api/fixedAssets/new`, data);
                console.log(data);
                this.$emit('submit');
                this.resetInput();
            } else if (countValid === len && this.isUpdateModal === true) {
                // update fixed_asset
                const data = {
                    fixed_asset_id: this.info.fixed_asset_id.value,
                    fixed_asset_code: this.info.fixed_asset_code.value,
                    fixed_asset_name: this.info.fixed_asset_name.value,
                    department_id: this.info.department_id.value,
                    department_code: this.info.department_code.value,
                    department_name: this.info.department_name.value,
                    fixed_asset_category_id: this.info.fixed_asset_category_id.value,
                    fixed_asset_category_code: this.info.fixed_asset_category_code.value,
                    fixed_asset_category_name: this.info.fixed_asset_category_name.value,
                    purchase_date: this.info.purchase_date.value,
                    started_use_date: this.info.started_use_date.value,
                    cost: reverseFormatNumber(this.info.cost.value),
                    quantity: this.info.quantity.value,
                    depreciation_rate: reverseFormatNumber(this.info.depreciation_rate.value),
                    amortization_of_year: reverseFormatNumber(this.info.amortization_of_year.value),
                    tracked_year: this.info.tracked_year.value,
                    life_time: this.info.life_time.value,
                };

                console.log(data);
                await axios.put(`${baseUrl}/api/fixedAssets/${data.fixed_asset_id}`, data);
                this.$emit('submit');
                this.resetInput();
            } else {
                this.forcusIfError();
            }
        },
    },
};
</script>

<style lang="css" scoped>
.modal-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 16px;
    font-size: 14px;
    padding: 0 16px;
}

.modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    padding-top: 20px;
}

.modal__header--text {
    font-size: 16px;
    font-weight: 600;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}

.form-group:first {
    margin-top: 20px;
}

.form-label {
    margin-bottom: 8px;
    font-size: 12px;
}

.form-label-require::after {
    content: "*";
    color: red;
    margin-left: 4px;
}

.form-input,
.form-input input {
    height: 36px;
    position: relative;
    outline: none;
}

.form-input select {
    outline: none;
}

.form-input select {
    padding: 0;
}

.form-input select:invalid,
.form-input select option[value=""] {
  color: gray;
  font-style: italic;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {  

   opacity: 0;

}

.form-group input[type=date] {
    position: relative;
}

.form-group input[type=date]::-webkit-calendar-picker-indicator {
    color: transparent;
    background: none;
    z-index: 1;
}

.form-group input[type="date"]:before {
    color: transparent;
    display: block;
    content: '\f073';
    /* This is the calendar icon in FontAwesome */
    background: url('../assets/icon/qlts-icon.svg') no-repeat -287px -67px;
	width: 18px;
	height: 18px;
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
  }

.form-group .left-input,
.form-input select,
.form-group input[type=date] {
    padding-left: 12px;
}

.form-group .right-input {
    padding-right: 8px;
    text-align: right;
}

.form-input .right-input {
    padding-right: 12px;
}

.popup-right-position-icon {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    z-index: 1;
}

.popup-right-top-position-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-115%);
    right: 8px;
}

.popup-right-bottom-position-icon {
    position: absolute;
    right: 8px;
    bottom: 50%;
    transform: translateY(135%);
}

.modal-buttons {
    height: 52px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 12px;
    margin-top: 24px;
}

.modal-buttons .cancel-button {
    font-size: 12px;
    border: none;
}

.submit-button {
    font-size: 12px;
    margin-right: 18px;
    margin-left: 10px;
}

.row-first {
    grid-column-start: 1;
    grid-column-end: 2;   
}

.row-second {
    grid-column-start: 2;
    grid-column-end: 4;
}

.small-col {
    grid-column-start: 2;
    grid-column-end: 4;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.space-top {
    margin-top: 20px;
}

.postion-relative {
    position: relative;
}

</style>