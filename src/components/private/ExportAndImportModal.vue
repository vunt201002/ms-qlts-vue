<template>
    <!-- The modal when click import and export button -->
    <div class="import-and-export-modal">
        <div class="first-row">
            <!-- file choosen -->
            <div class="form-group" :class="{ invalid: noFileChoosen }">
                <input ref="inputFile" type="file" @change="handleChooseFile">
                <span class="form-message">{{ noFileChoosenMsg }}</span>
            </div>
            <!-- close button -->
            <div
                @click="handleCloseImportAndExportModal"
                class="close-sprite modal__header--close pointer"
            > 
            </div>
        </div>
        <div>
            <button class="button-file right-space" @click="importFileExcel">Import</button>
            <button class="button-file" @click="exportFileExcel">Export</button>
        </div>
        <div class="table__container" v-if="tableItems.length > 0">
            <table>
                <thead>
                    <tr>
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
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="table-row-body"
                        v-for="(item, index) in tableItems" :key="index"
                    >
                        <td align="right">
                            {{ index + 1 }}
                        </td>
                        <td :title="item.fixed_asset_code">{{ item.fixed_asset_code }}</td>
                        <td class="max-col-width" :title="item.fixed_asset_name">{{ item.fixed_asset_name }}</td>
                        <td :title="item.fixed_asset_category_name">{{ item.fixed_asset_category_name }}</td>
                        <td :title="item.department_name">{{ item.department_name }}</td>
                        <td align="right">
                            {{ item.quantity }}
                        </td>
                        <td align="right">
                            {{ item.cost }}
                        </td>
                        <td align="right">
                            {{ item.accumulated_depreciation }}
                        </td>
                        <td align="right">
                            {{ item.residual_value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button v-if="tableItems.length > 0" class="submit-btn">
            Cất
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import { baseUrl } from '@/utils/apiRoute';

import { read } from 'xlsx';

export default {
    data() {
        return {
            tableItems: [],
            fileName: "",
            sheetName: "",
            noFileChoosen: false,
            noFileChoosenMsg: "Bạn chưa chọn file",
            // không thể lấy full path file ở client,
            // tạm thời fix cứng, cần sửa lại api
            // import file theo cách khác => TODO
            filePath: "C:\\Users\\Admin\\Downloads",
        };
    },
    emits: [
        "close-import-and-export-modal"
    ],
    methods: {
        resetInput() {
            this.noFileChoosen = false;
            this.$refs.inputFile.value = '';
        },

        handleCloseImportAndExportModal() {
            this.$emit('close-import-and-export-modal');
            this.resetInput();
        },

        async exportFileExcel() {
            try {
                const response = await axios.get(`${baseUrl}/api/export`, {
                    responseType: 'blob' // Set the response type to 'blob' to handle binary data
                });

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');

                link.href = url;
                link.setAttribute('download', 'FixedAsset.xlsx'); // Set the desired file name

                document.body.appendChild(link);

                link.click();
                
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error exporting file:', error);
            }
        },

        handleChooseFile(event) {
            this.noFileChoosen = false;

            const file = event.target.files[0];
            this.fileName = file.name;

            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = read(data, { type: 'array' });
                const sheetNames = workbook.SheetNames;

                this.sheetName = sheetNames[0];
            };

            reader.readAsArrayBuffer(file);
        },

        async importFileExcel() {
            if (this.fileName === "") {
                this.noFileChoosen = true;
            } else {
                const res = await axios.post(
                    `${baseUrl}/api/import`,
                    {
                        excelFilePath: `${this.filePath}\\${this.fileName}`,
                        sheetName: this.sheetName
                    }
                );
                console.log(res);

                this.tableItems = res.data;
            }
        },
    },
};
</script>

<style lang="css" scoped>
.import-and-export-modal {
    width: 800px;
    background-color: white;
    animation: fadeIn ease 0.3s;
    min-height: 500px;
    border-radius: 8px;
    padding: 16px;
    position: relative;
}

.first-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

.button-file {
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

.table__container {
    max-height: 336px;
    border-radius: 3.5px;
    border: 1px solid #afafaf;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
    width: 100%;
    overflow: auto;
    margin-top: 16px;
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

tbody tr:hover .table-update-button,
tbody tr:hover .table-copy-button {
    display: block;
}

.submit-btn {
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
    position: absolute;
    right: 16px;
    bottom: 16px;
}

.right-space {
    margin-right: 8px;
}
</style>