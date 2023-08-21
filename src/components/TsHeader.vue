<template>
    <div class="content__header">
        <!-- left -->
        <div class="content__header--left">
            <div class="content__header--left-search">
                <div class="search-sprite c-header-left-position-icon"></div>
                <input
                    v-model="searchText"
                    ref="tsSearch"
                    tabindex="3"
                    type="text"
                    placeholder="Tìm kiếm tài sản"
                    @change="handleEmitSearch"
                >
            </div>
            
            <dropdown-component
                :filterObject="filterObject"
                :tabIndex="3"
                :typeArr="typeArr"
                placeholderText="Loại tài sản"
                @send-filter="handleEmitCategoryFilter"
            />
            <dropdown-component
                :filterObject="filterObject"
                :tabIndex="4"
                :departmentArr="departmentArr"
                placeholderText="Bộ phận sử dụng"
                @send-filter="handleEmitDepartmentFilter"
            />
        </div>
        <!-- right -->
        <div class="content__header--right">
            <button
                class="addBtn tooltip"
                @click="emitOpenAddModalEvent"
                tabindex="4"
            >
                <span class="tooltiptext bottomtooltip">Thêm tài sản</span>
                +  Thêm tài sản
            </button>
            <button @click="handleEmitOpenImportAndExport" tabindex="4" class="tooltip content__header--right-export"
            >
                <span class="tooltiptext bottomtooltip">Xuất file</span>
                <div class="export-sprite"></div>
            </button>
            <button
                tabindex="4"
                class="delete-ts-button tooltip"
                @click="emitOpenDeletePopupEvent"
                :disabled="btnDisabled"
                :class="{ disableButton: btnDisabled }"
            >
                <span class="tooltiptext bottomtooltip">Xóa tài sản</span>
                <div class="red-trash-sprite"></div>
            </button>
        </div>
    </div>
</template>

<script>
import DropdownComponent from "./DropdownComponent.vue";

export default {
    props: {
        typeArr: Array,
        departmentArr: Array,
        isTableChecked: Boolean,
        filterObject: Object,
    },
    watch: {
        isTableChecked(newIsTableChecked) {
            this.btnDisabled = !newIsTableChecked;
            console.log(newIsTableChecked, this.btnDisabled);
        },
    },
    data() {
        return {
            btnDisabled: true,
            departments: [],
            categories: [],
            searchText: '',
        };
    },
    components: {
        DropdownComponent,
    },
    emits: [
        'open-add-modal',       // event when click 'add' button.
        'open-delete-popup',     // evnet when click 'delete' button.
        'send-department-filter',
        'send-category-filter',
        'send-search',
        "open-import-and-export",
    ],
    methods: {
        /**
         * handle the 'open-add-modal' event.
         * @author vu
         */
        emitOpenAddModalEvent() {
            this.$emit('open-add-modal', 'Thêm tài sản');
        },

        /**
         * handle the 'open-delete-popup' event.
         * @author vu
         */
        emitOpenDeletePopupEvent() {
            console.log('open', this.isTableChecked);
            this.$emit('open-delete-popup');
        },

        handleEmitDepartmentFilter(data) {
            this.$emit('send-department-filter', data);
        },

        handleEmitCategoryFilter(data) {
            this.$emit('send-category-filter', data);
        },
        handleEmitSearch() {
            setTimeout(() => {
                this.$emit('send-search', this.searchText);
            }, 1000);
        },

        handleEmitOpenImportAndExport() {
            this.$emit('open-import-and-export');
        },
    },
}
</script>

<style lang="css" scoped>

.c-header-left-position-icon {
    position: absolute;
    top: 50%;
    left: 6px;
    transform: translateY(-50%);
}

.c-header-right-position-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
}

.content__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 0;
}


.content__header--left,
.content__header--right {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 8px;
}

.content__header--left-search {
    position: relative;
    height: 35px;
    width: 179px;
}

.content__header--right .addBtn {
    color: white;
    background-color: #1597b7;
    border: 1.5px solid #1597b7;
    border-radius: 3px;
    width: 100px;
    height: 32px;
    font-size: 12px;
    cursor: pointer;
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, .16);
    padding: 1px 6px;
}

.content__header--right-export {
    background-color: white;
    border: none;
    border-radius: 3px;
    width: 30px;
    height: 32px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .16);
    padding: 1px 6px;
}

.content__header--right .delete-ts-button {
    background-color: white;
    border: none;
    border-radius: 3px;
    width: 30px;
    height: 32px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .16);
    padding: 1px 6px;
}

.content__header--left input,
.content__header--left select {
    width: 100%;
    height: 100%;
    padding-left: 32px;
    border: 1px solid var(--border-color);
    border-radius: 2.5px;
    outline: none;
}

.content__header--right .disableButton {
    cursor: not-allowed;
    background-color: #c7c1c1;
}

</style>