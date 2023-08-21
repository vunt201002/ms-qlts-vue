<template>
    <div class="v-pagination-container">
        <div class="v-pagination-left">
            <p class="v-pagination-left-text">
                Tổng số:
                <span>{{ totalRecord }}</span>
                bản ghi
            </p>
            <div class="v-pagination-left-select">
                <select v-model="vPageSize">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <div class="arrow-down-solid-sprite table-right-position-icon"></div>
            </div>
            <ul class="v-pagination">
                <li class="v-pagination-previous" @click="changePage('prev')">&lt;</li>
                <li
                    v-for="(page, index) in pages"
                    :key="index"
                    class="v-pagination-item"
                    :class="{ 'v-pagination-item-active': page == pageNumber }"
                    @click="changePage(page)"
                >
                    {{ page }}
                </li>
                <li class="v-pagination-after" @click="changePage('after')">&gt;</li>
            </ul>
        </div>
        <div class="v-pagination-right"></div>
    </div>
</template>

<script>
export default {
    props: {
        pageNumber: {
            type: Number,
            default: 1,
        },
        pageSize: {
            type: String,
            default: '10',
        },
        totalRecord: {
            type: Number,
            default: 0,
        }
    },
    computed: {
        totalPage() {
            return Math.ceil(this.totalRecord / Number(this.pageSize));
        },
        pages() {
            let pages = [];
            for (let i = 1; i <= this.totalPage; i++) {
                if (
                    i == 1 ||
                    i == this.totalPage ||
                    (i <= this.pageNumber + 1 && i >= this.pageNumber - 1)
                ) {
                    pages.push(i);
                } else if (
                    i == this.pageNumber + 2 ||
                    i == this.pageNumber - 2
                ) {
                    pages.push("...");
                }
            }

            return pages;
        },
        
        vPageSize: {
            get() {
                return this.pageSize;
            },
            set(value) {
                this.$emit('update:pageSize', value);
            }
        },
    },
    methods: {
        changePage(page) {
            if (page == 'prev' && this.pageNumber <= 1) {
                return;
            }
            if (page == 'after' && this.pageNumber >= this.totalPage) {
                return;
            }


            if (page == 'prev') {
                page = this.pageNumber - 1;
            }
            if (page == 'after') {
                page = this.pageNumber + 1;
            }
            
            
            if (page == '...') {
                return;
            }

            this.$emit('update:pageNumber', page);
        },
    },
}
</script>

<style lang="css" scoped>
.v-pagination-container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    background-color: #fff;
    position: sticky;
    bottom: 0;
    border-top: 1px solid #ccc;
}

.v-pagination-left {
    margin-left: 16px;
    display: flex;
    align-items: center;
    justify-content: start;
}

.v-pagination-left-select {
    position: relative;
}

.table-right-position-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
}

.v-pagination-left-text span {
    font-weight: 600;
    margin: 0 4px;
}

.v-pagination-left select {
    margin-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 20px;
    border-radius: 4px;
    border-color: #afafaf;
}

.v-pagination-right {
    display: flex;
    align-items: center;
    margin-right: 16px;
}

.v-pagination-right-record {

}

.v-pagination-right-page {
    
}

.v-pagination {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin-bottom: 0;
    margin-left: 12px;
}

.v-pagination li {
    color: black;
    float: left;
    padding: 4px 8px;
    text-decoration: none;
}

.v-pagination-previous,
.v-pagination-after {
    cursor: pointer;
    padding: 0 6px;
}


.v-pagination-item {
    padding: 0 6px;
    cursor: pointer;
}

.v-pagination-item-active {
    background-color: #f5f5f5;
    font-weight: bold;
}

</style>