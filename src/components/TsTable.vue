<template>
    <div class="table__container">
        <table>
            <thead>
                <tr>
                    <th class="thead-th-first">
                        <input
                            tabindex="5"
                            type="checkbox"
                            :checked="isHeaderChecked"
                            @click="checkHeader($event.target.checked)"
                            @keydown="handleKeydownHeader"
                        >
                    </th>
                    <th>
                        <div class="tooltip">
                            <span class="tooltiptext bottomtooltip">Số thứ tự</span>
                            STT
                        </div>
                    </th>
                    <th>Mã tài sản</th>
                    <th>Tên tài sản</th>
                    <th>Loại tài sản</th>
                    <th>Bộ phận sử dụng</th>
                    <th>Số lượng</th>
                    <th>Nguyên giá</th>
                    <th class="z-index-1">
                        <div class="tooltip">
                            <span class="tooltiptext bottomtooltip">Hao mòn/ khấu hao lũy kế</span>
                            HM/KM Lũy kế
                        </div>
                    </th>
                    <th>Giá trị còn lại</th>
                    <th>Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="table-row-body"
                    v-for="(item, index) in tableItems" :key="index"
                    @dblclick="emitOpenUpdateModalEvent(index)"
                >
                    <td class="table-row-body-td">
                        <input
                            tabindex="5"
                            type="checkbox"
                            class="table-cb-body"
                            :checked="item.isChecked"
                            @click="checkedBody($event.target.checked, index)"
                            @keydown="handleKeydownBody($event, index)"
                        >
                    </td>
                    <td align="right">
                        {{ (filterObject.pageNumber - 1) * filterObject.pageSize + index + 1 }}
                    </td>
                    <td :title="item.fixed_asset_code">{{ item.fixed_asset_code }}</td>
                    <td class="max-col-width" :title="item.fixed_asset_name">{{ item.fixed_asset_name }}</td>
                    <td :title="item.fixed_asset_category_name">{{ item.fixed_asset_category_name }}</td>
                    <td :title="item.department_name">{{ item.department_name }}</td>
                    <td align="right">
                        {{ item.quantity }}
                    </td>
                    <td align="right">
                        {{ formatNumber(item.cost) }}
                    </td>
                    <td align="right">
                        {{ formatNumber(item.accumulated_depreciation) }}
                    </td>
                    <td align="right">
                        {{ formatNumber(item.residual_value) }}
                    </td>
                    <td>
                        <div class="table-column">
                            <div
                                @click="emitOpenUpdateModalEvent(index)"
                                class="update-sprite table-update-button tooltip"
                            >
                                <span class="tooltiptext bottomtooltip">Sửa</span>
                            </div>
                            <div
                                class="copy-sprite table-copy-button tooltip"
                                @click="replicationItem(item, index)"
                            >
                                <span class="tooltiptext bottomtooltip">Nhân bản</span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr v-if="tableItems.length <= 0">
                    <td colspan="11" style="position: relative;" class="no-hover">
                        <img src="../assets/img/nodata.jpg" alt="/" class="no-data-image"/>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="6">
                        <the-pagination
                            :total-record="totalRecord"
                            v-model:pageSize="filterObject.pageSize"
                            v-model:pageNumber="filterObject.pageNumber"
                        />
                    </td>
                    <td class="text-bold text-right">
                        <p class="border-top">{{ summaryObject.quantity }}</p>
                    </td>
                    <td class="text-bold text-right">
                        <p class="border-top">{{ summaryObject.cost }}</p>
                    </td>
                    <td class="text-bold text-right">
                        <p class="border-top">{{ summaryObject.accumulated_depreciation }}</p>
                    </td>
                    <td class="text-bold text-right">
                        <p class="border-top">{{ summaryObject.residual_value }}</p>
                    </td>
                    <td>
                        <p class="border-top"></p>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

import { formatNumber } from '@/utils/utilsFunction';
import { Resources } from '../resources/Resources';
import ThePagination from './reuse/ThePagination.vue';
import { baseUrl } from '../utils/apiRoute';

export default {
    props: {
        isSubmit: Boolean,
        categoryFilter: {
            type: String,
            default: '',
        },
        departmentFilter: {
            type: String,
            default: '',
        },
        search: {
            type: String,
            default: '',
        },
    },
    components: {
        ThePagination
    },
    created() {
        const getAllAsset = async () => {
            try {
                const res = await axios.post(
                    `${baseUrl}/api/fixedAssets?pageNumber=${this.filterObject.pageNumber}&pageSize=${this.filterObject.pageSize}`,
                    {
                        filterName: "",
                        filterDepartment: "",
                        filterCategory: ""
                    }
                );
                this.tableItems = res.data;

                const resSummary = await axios.get(`${baseUrl}/summary`);
                this.totalRecord = resSummary.data.total_records;
                this.summaryObject.quantity = formatNumber(resSummary.data.total_quantity);
                this.summaryObject.cost = formatNumber(resSummary.data.total_cost);
                this.summaryObject.accumulated_depreciation = formatNumber(resSummary.data.total_accumulated_depreciation);
                this.summaryObject.residual_value = formatNumber(resSummary.data.total_residual_value);

                const departmentsRes = await axios.get(`${baseUrl}/api/departments`);
                const categoriesRes = await axios.get(`${baseUrl}/api/fixedAssetCategories`);

                for (let i = 0; i < departmentsRes.data.length; i++) {
                    this.departmentArr.push({
                        id: departmentsRes.data[i].department_code,
                        name: departmentsRes.data[i].department_name,
                        guid: departmentsRes.data[i].department_id,
                    });
                }
    
                for (let i = 0; i < categoriesRes.data.length; i++) {
                    this.typeArr.push({
                        id: categoriesRes.data[i].fixed_asset_category_code,
                        name: categoriesRes.data[i].fixed_asset_category_name,
                        guid: categoriesRes.data[i].fixed_asset_category_id,
                    });
                }
                this.getIdArray();
                this.$emit('send-id', this.idArray);
                this.$emit('send-type', this.typeArr);
                this.$emit('send-department', this.departmentArr);
            } catch (err) {
                console.log(err);
            }
        };
        getAllAsset();
    },
    data() {
        return {
            isHeaderChecked: false,
            tableItems: [],
            departmentArr: [],
            typeArr: [],
            idArray: [],
            filterObject: {
                pageSize: '10',
                pageNumber: 1,
            },
            totalRecord: 50,
            summaryObject: {
                quantity: 0,
                cost: 0,
                accumulated_depreciation: 0,
                residual_value: 0,
            },
        };
    },
    watch: {
        filterObject: {
            handler: async function change() {
                try {
                    let totalPage = Math.ceil(this.totalRecord / Number(this.filterObject.pageSize));
                    if (totalPage < this.filterObject.pageNumber) {
                        this.filterObject.pageNumber = 1;
                    }
                    const res = await axios.post(
                        `${baseUrl}/api/fixedAssets?pageNumber=${this.filterObject.pageNumber}&pageSize=${this.filterObject.pageSize}`,
                        {
                            filterName: this.search,
                            filterDepartment: this.departmentFilter,
                            filterCategory: this.categoryFilter
                        }
                    );
                    this.tableItems = res.data;
                    this.$emit('send-filter-object', this.filterObject);
                } catch (err) {
                    console.log(err);
                }
            },
            deep: true
        },
        isSubmit(oldValue, newValue) {
            const getData = async () => {
                if (oldValue !== newValue) {
                    const res = await axios.get(
                            `${baseUrl}/filter?pageNumber=${this.filterObject.pageNumber}&pageSize=${this.filterObject.pageSize}`
                        );
                    this.tableItems = res.data;
                }
            };
            getData();
        },

        search(newValue) {
            const getData = async () => {
                const res = await axios.post(
                    `${baseUrl}/api/fixedAssets?pageNumber=${this.filterObject.pageNumber}&pageSize=${this.filterObject.pageSize}`,
                    {
                        filterName: newValue,
                        filterDepartment: this.departmentFilter,
                        filterCategory: this.categoryFilter
                    }
                );
                this.tableItems = res.data;
            };
            getData();
        },

        departmentFilter(newValue) {
            const getData = async () => {
                const res = await axios.post(
                    `${baseUrl}/api/fixedAssets?pageNumber=${this.filterObject.pageNumber}&pageSize=${this.filterObject.pageSize}`,
                    {
                        filterName: this.search,
                        filterDepartment: newValue,
                        filterCategory: this.categoryFilter
                    }
                );
                this.tableItems = res.data;
            };
            getData();
        },

        categoryFilter(newValue) {
            const getData = async () => {
                const res = await axios.post(
                    `${baseUrl}/api/fixedAssets?pageNumber=${this.filterObject.pageNumber}&pageSize=${this.filterObject.pageSize}`,
                    {
                        filterName: this.search,
                        filterDepartment: this.departmentFilter,
                        filterCategory: newValue
                    }
                );
                this.tableItems = res.data;
            };
            getData();
        },
    },
    emits: [
        'open-update-modal',        // event when open update modal.
        'check-body',               // evnet when click checkbox.
        'send-id',                  // send id of item to parent.
        'send-type',                // send type of item to parent.
        'send-department',          // send department of item to parent.
        'send-filter-object',
        'replication-asset',
    ],
    methods: {
        /**
         * Get all id of items in table.
         * @author vu
         */
        getIdArray() {
            for (let i = 0; i < this.tableItems.length; i++) {
                this.idArray.push(this.tableItems[i].fixed_asset_code);
            }
        },

        /**
         * binding data when open update modal (click update
         * button or double click item).
         * @param {int} index - index of item.
         * @author vu
         */
        emitOpenUpdateModalEvent(index) {
            const data = {
                fixed_asset_id: this.tableItems[index].fixed_asset_id,
                fixed_asset_code: this.tableItems[index].fixed_asset_code,
                fixed_asset_name: this.tableItems[index].fixed_asset_name,
                department_id: this.tableItems[index].department_id,
                department_code: this.tableItems[index].department_code,
                department_name: this.tableItems[index].department_name,
                fixed_asset_category_id: this.tableItems[index].fixed_asset_category_id,
                fixed_asset_category_code: this.tableItems[index].fixed_asset_category_code,
                fixed_asset_category_name: this.tableItems[index].fixed_asset_category_name,
                quantity: this.tableItems[index].quantity,
                cost: this.tableItems[index].cost,
                life_time: this.tableItems[index].life_time,
                depreciation_rate: this.tableItems[index].depreciation_rate,
                amortization_of_year: this.tableItems[index].amortization_of_year,
                tracked_year: this.tableItems[index].tracked_year,
                purchase_date: new Date(this.tableItems[index].purchase_date).toISOString().slice(0,10),
                started_use_date: new Date(this.tableItems[index].started_use_date).toISOString().slice(0,10),
            };
            this.$emit('open-update-modal', {
                modalTitle: Resources.updateModalTitle,
                data: data
            });
        },

        async replicationItem(item, index) {
            const res = await axios.get(`${baseUrl}/newcode`);

            const data = {
                fixed_asset_id: "",
                fixed_asset_code: res.data,
                fixed_asset_name: this.tableItems[index].fixed_asset_name,
                department_id: this.tableItems[index].department_id,
                department_code: this.tableItems[index].department_code,
                department_name: this.tableItems[index].department_name,
                fixed_asset_category_id: this.tableItems[index].fixed_asset_category_id,
                fixed_asset_category_code: this.tableItems[index].fixed_asset_category_code,
                fixed_asset_category_name: this.tableItems[index].fixed_asset_category_name,
                quantity: this.tableItems[index].quantity,
                cost: this.tableItems[index].cost,
                life_time: this.tableItems[index].life_time,
                depreciation_rate: this.tableItems[index].depreciation_rate,
                amortization_of_year: this.tableItems[index].amortization_of_year,
                tracked_year: this.tableItems[index].tracked_year,
                purchase_date: new Date(this.tableItems[index].purchase_date).toISOString().slice(0,10),
                started_use_date: new Date(this.tableItems[index].started_use_date).toISOString().slice(0,10),
            };

            this.$emit('replication-asset', {
                msg: "Nhân bản tài sản",
                data: data
            });
        },

        /**
         * handle when click header checkbox.
         * @param {Boolean} status - status of header checkbox.
         * @author vu
         */
        checkHeader(status) {
            this.isHeaderChecked = status;

            console.log('header check', this.isHeaderChecked);
            for (let i = 0; i < this.tableItems.length; i++) {
                this.tableItems[i].isChecked = this.isHeaderChecked;
            }

            const selected = [];
            for (let i = 0; i < this.tableItems.length; i++) {
                if (this.tableItems[i].isChecked === true) {
                    selected.push(this.tableItems[i]);
                }
            }
            
            if (status === true) {
                const data =
                    selected.length < 10 ?
                    `0${selected.length}` + " " :
                    `${selected.length}` + " "
                ;
                this.$emit(
                    'check-body',
                    [
                        data,
                        'tài sản đã được chọn. Bạn có muốn xóa không?'
                    ]
                );
            } else {
                this.$emit(
                    'check-body',
                    false
                );
            }
            
        },

        /**
         * Handle event when click body checkbox.
         * @param {Boolean} status - status of body checkbox (checked or unchecked).
         * @param {int} index - index of item.
         * @author vu
         */
        checkedBody (status, index) {
            this.tableItems[index].isChecked = status;
            console.log('body check');

            if (status === false && this.isHeaderChecked === true) {
                this.isHeaderChecked = false;
            }

            const selected = [];
            for (let i = 0; i < this.tableItems.length; i++) {
                if (this.tableItems[i].isChecked === true) {
                    selected.push(this.tableItems[i]);
                }
            }
            
            if (selected.length === this.tableItems.length) {
                this.isHeaderChecked = true;
            } else {
                this.isHeaderChecked = false;
            }

            if (selected.length === 1) {
                this.
                    $emit(
                        'check-body',
                        [
                            `${selected[0].fixed_asset_code} - ${selected[0].fixed_asset_name}`,
                            "Bạn có muốn xóa tài sản" + " ",
                            selected[0].fixed_asset_id
                        ]
                    );
            } else if (selected.length > 1) {
                const data =
                    selected.length < 10 ?
                    `0${selected.length}` + " " :
                    `${selected.length}` + " "
                ;
                const idArr = [];
                let idStr = "";
                
                for (let i = 0; i < selected.length; i++) {
                    idArr.push(selected[i].fixed_asset_id);
                }

                idStr = idArr.join(", ");
                this.$emit(
                    'check-body',
                    [
                        data,
                        'tài sản đã được chọn. Bạn có muốn xóa không?',
                        idStr
                    ]
                );
            } else {
                this.$emit('check-body', false);
            }
        },


        /**
         * Check the checkbox when press enter.
         * @param {Event} event - default parameter.
         * @author vu
         */
        handleKeydownHeader(event) {
            if (event.key === 'Enter') {
                const status = !event.target.checked;
                this.checkHeader(status);
            }
        },

        /**
         * Check the checkbox in body when press enter.
         * @param {Event} event - default parameter.
         * @param {int} index - index of the item.
         */
        handleKeydownBody(event, index) {
            if (event.key === 'Enter') {
                const status = !event.target.checked;
                this.checkedBody(status, index);
                console.log(event.target);
            }
        },
    },
    computed: {
        formatNumber() {
            return formatNumber;
        },
    },
};
</script>

<style lang="css" scoped>

.table__container {
    height: 480px;
    border-radius: 3.5px;
    border: 1px solid #afafaf;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
    width: 100%;
    overflow: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
    height: 100%;
}

table thead {
    height: 38px;
}

.table-row-body-td {
    padding-left: 16px;
    padding-right: 20px;
}

thead th {
    position: sticky;
    top: 0;
    background-color: #f5f5f5;
    text-align: left;
    font-weight: bold;
    font-size: 14px;
}

.thead-th-first {
    padding-left: 16px;
    padding-right: 20px;
}

thead th,
tbody td {
    margin: 12px;
    padding: 8px;
    white-space: nowrap;
    border-bottom: 1px solid #ddd;
}

th {
    position: sticky;
    top: 0;
    background: #f5f5f5;
    text-align: left;
    font-weight: bold;
    font-size: 14px;
}

td {
    font-size: 12px;
} 

tbody tr {
    height: 40px;
    background-color: white;
}

tbody tr:hover td {
    background-color: rgba(125, 188, 255, 0.6);
}

tbody tr:hover td.no-hover {
    background-color: white;
}


tbody tr:hover .table-update-button,
tbody tr:hover .table-copy-button {
    display: block;
}

tfoot td,
tfoot th {
    position: sticky;
    bottom: 0;
    background: white;
}

tfoot tr {
    height: 40px;
}

.tfoot-left {
    display: flex;
    align-items: center;
}

.tfoot-total {
    float: left;
    line-height: 40px;
}

.tfoot-total span {
    font-weight: bold;
    margin: 0 1px;
}

.tfoot-total-page {
    position: relative;
    float: left;
    width: 59px;
    height: 25px;
    background-color: #ffffff;
    border-radius: 2.625px;
    border: 1px solid #afafaf;
    margin: 7px 24px;
}

.tfoot-total-page span {
    line-height: 25px;
    margin-left: 14px;
}

.table-right-position-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
}

.table-column {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.pagination {
    display: inline-block;
}
  
.pagination a {
    color: black;
    float: left;
    padding: 4px 8px;
    text-decoration: none;
}

.pagination a.selected {
    background-color: #f5f5f5;
    font-weight: bold;
}

.table-update-button,
.table-copy-button {
    display: none;
}

.max-col-width {
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.z-index-1 {
    z-index: 1;
}

.text-bold {
    font-weight: bold;
}

.border-top {
    border-top: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
}

.text-right {
    text-align: right;
}

.no-data-image {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
}
</style>
