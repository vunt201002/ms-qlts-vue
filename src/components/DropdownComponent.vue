<template>
    <div class="dropdown" ref="dropdown">
        <div
            class="dropdown-header"
            @click="openDropdown"
            :tabindex="tabIndex"
            @keydown="handleButtonKeyDown"
        >
            <div
                class="filter-sprite dropdown-left-position-icon"
                :class="{ hideItem: isHideIcon }"
            >
            </div>
            <div
                class="arrow-down-solid-sprite dropdown-right-position-icon"
                :class="{ hideItem: isHideIcon }"
            >
            </div>
            <input
                ref="dropdownInput"
                type="text"
                class="dropdown__input padding-left-big form-input"
                :class="{ paddingLeftSmall: isHideIcon, customPlaceholder: !isHideIcon }"
                :placeholder="placeholderText"
                v-model="inputValue"
                :tabindex="tabIndex"
                @keyup="searchOption(inputValue)"
            >
        </div>
        <div
            class="dropdown__option"
            :class="{ hide: isCloseDropdown }"
            v-if="!isCloseDropdown"
        >
            <div class="dropdown__option--header">
                <p class="dropdown__option--item-id space-left">Mã</p>
                <p class="dropdown__option--item-name">Tên</p>
            </div>
            <div class="dropdown__option--items" tabindex="6">
                <div
                    class="dropdown__option--item"
                    v-for="item of dropdownItems"
                    :key="item.id"
                    @click="chooseOption(item.id, item.name, item.guid)"
                    :class="{ hideItem: item.isSearch }"
                    :tabindex="tabIndex"
                    @keydown="handleButtonKeyDownOption($event, item.id, item.name, item.guid)"
                >
                    <p class="dropdown__option--item-id space-left">{{ item.id }}</p>
                    <p class="dropdown__option--item-name">{{ item.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        placeholderText: String,
        isHideIcon: {
            type: Boolean,
            default: false,
        },
        widthInput: {
            type: String,
            default: "219px",
        },
        typeArr: {
            type: Array,
            default: () => {
                return [];
            },
        },
        departmentArr: {
            type: Array,
            default: () => {
                return [];
            },
        },
        showId: {
            type: Boolean,
            default: false,
        },
        bindingData: {
            type: String,
            default: "",
        },
        isOpenModal: Boolean,
        tabIndex: {
            default: 1,
            type: Number,
        },
        filterObject: Object,
    },
    emits: ['send-name', 'send-filter'],
    data() {
        return {
            // the state of dropdown: open or close.
            isCloseDropdown: true,
            // the var to binding with input of dropdown
            inputValue: "",
            dropdownItems: [],
        };
    },
    watch: {
        typeArr(newTypeArr) {
            if (newTypeArr !== []) {
                for (let i = 0; i < newTypeArr.length; i++) {
                    this.dropdownItems.push({
                        ...newTypeArr[i],
                        isSearch: false,
                    })
                }
            }
        },
        departmentArr(newDepartmentArr) {
            if (newDepartmentArr !== []) {
                for (let i = 0; i < newDepartmentArr.length; i++) {
                    this.dropdownItems.push({
                        ...newDepartmentArr[i],
                        isSearch: false,
                    })
                }
            }
        },
        bindingData(newBindingData) {
            this.inputValue = newBindingData;
        },
        isOpenModal(newIsOpenModal) {
            if (!newIsOpenModal) {
                this.inputValue = "";
            }
        },
    },
    methods: {
        /**
        * Handle open dropdown by change the 'isCloseDropdown' to false.
        * Add an eventListener to document. If click the input, the
        * dropdown will show.
        * @author vu
        */
        openDropdown() {
            this.isCloseDropdown = false;
            document.addEventListener('click', this.closeDropdown, true);
        },

        /**
        * Handle close dropdown by change the 'isCloseDropDown' to true
        * when click outside the dropdown. Remove the event listener of
        * document that add when open.
        * @param {Event} event - The default param
        * @author vu
        */
        closeDropdown(event) {
            event.preventDefault();
            this.isCloseDropdown = true;
            document.removeEventListener('click', this.closeDropdown, true);
        }, 

        /**
        * Handle when click the item of dropdown. It will show the name
        * of item in the input. We will set value for 'inputValue' in data.
        * @param {string} idOfItem - the id, each item have an id.
        * @param {string} nameOfItem - name of choose item.
        * @author vu
        */
        async chooseOption(idOfItem, nameOfItem, guid) {
            if (this.showId === true) {
                this.inputValue = idOfItem;
                this.$emit('send-name', { id: idOfItem, name: nameOfItem, guid: guid });
            } else {
                this.inputValue = nameOfItem;
            }
            this.$emit('send-filter', nameOfItem);
        },

        /**
        * handle search item on the input. When enter name or id,
        * only items have match the input showed.
        * @param {string} input - the input of user.
        * @author vu
        */
        searchOption(input) {
            const filter = input.toUpperCase();

            for (let i = 0; i < this.dropdownItems.length; i++) {
                if (this.dropdownItems[i].name.toUpperCase().indexOf(filter) <= -1) {
                    console.log(this.dropdownItems[i].name.toUpperCase());
                    this.dropdownItems[i].isSearch = true;
                } else {
                    this.dropdownItems[i].isSearch = false;
                }
            }
        },

        /**
         * Open dropdown when press enter
         * @param {Event} event - Default parameters.
         * @author vu
         */
        handleButtonKeyDown(event) {
            if (event.key === 'Enter') {
                this.openDropdown();
            }
        },

        /**
         * 
         * @param {Event} event - deault parameter.
         * @param {*} id - id of the item.
         * @param {*} name - name of the item.
         */
        handleButtonKeyDownOption(event, id, name, guid) {
            if (event.key === 'Enter') {
                this.chooseOption(id, name, guid);
                this.closeDropdown(event);
            }
        },
    },
};
</script>

<style lang="css" scoped>
.border-none {
    border: none !important;
}

.space-left {
    margin-left: 10px;
}

.dropdown {
    position: relative;
}

.dropdown-header {
    position: relative;
    height: 35px;
    width: 100%;
}

.dropdown-left-position-icon {
    position: absolute;
    top: 50%;
    left: 6px;
    transform: translateY(-50%);
}

.dropdown-right-position-icon {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
}

.dropdown__input {
    height: 100%;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    border: 1px solid rgb(118, 118, 118);
    border-radius: 2.5px;
    outline: none;
}

.dropdown__option {
    width: 400px;
    background-color: white;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 4px;
    position: absolute;
    z-index: 2;
}

.dropdown__option--header,
.dropdown__option--item {
    display: grid;
    grid-template-columns: 100px 200px;
    align-items: center;
    font-size: 14px;
}

.hideItem {
    display: none;
}

.padding-left-big {
    padding-left: 32px;
}

.paddingLeftSmall {
    padding-left: 12px;
}

.dropdown__option--header {
    background-color: rgba(125, 188, 255, 0.6);
    padding: 6px 12px;
}

.dropdown__option--items {
    height: 100px;
    overflow-y: auto;
    overflow-x: auto;
}

.dropdown__option--item {
    border-bottom: 1px solid #ece7e7;
    padding: 6px 12px;
}

.dropdown__option--item:last-child {
    border-bottom: none;
}

.dropdown__option--item:hover {
    background-color: rgba(26, 164, 200, .2);
}

.customPlaceholder.dropdown__input::placeholder {
    font-style: normal;
    color: black;
    font-size: 12px;
}

</style>