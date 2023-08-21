<template>
    <div class="sider" :class="{ close: isClose }">
        <!-- menu -->
        <div class="menu">
            <!-- logo -->
            <header class="menu__header">
                <div class="logo-sprite logo"></div>
                <strong class="logo-title" :class="{ hide: isHide }">Misa qlts</strong>
            </header>
            <!-- menu -->
            <ul class="menu__items">
                <router-link to="/overview" class="no-underline">
                    <li
                        ref="overview"
                        class="menu__item tooltip"
                        :class="{ activetooltip: isHide }"
                        @click="clickMenu('overview')"
                    >
                        <div class="outline menu-sprite-1"></div>
                        <div class="solid menu-sprite-1-1 hide"></div>
                        <p class="menu__item--text" :class="{ hide: isHide }">Tổng quan</p>
                        <span class="tooltiptext righttooltip">Tổng quan</span>
                    </li>
                </router-link>
                <router-link to="/" class="no-underline">
                    <li
                        ref="ts"
                        class="menu__item tooltip active"
                        :class="{ activetooltip: isHide }"
                        @click="clickMenu('ts')"
                    >
                        <div class="outline menu-sprite-2"></div>
                        <div class="solid menu-sprite-2-2 hide"></div>
                        <p class="menu__item--text" :class="{ hide: isHide }">Tài sản</p>
                        <div class="arrow-down-sprite sider-down-icon" :class="{ hide: isHide }"></div>
                        <span class="tooltiptext righttooltip">Tài sản</span>
                    </li>
                </router-link>
                <router-link to="/htdb" class="no-underline">
                    <li
                        ref="htdb"
                        class="menu__item tooltip"
                        :class="{ activetooltip: isHide }"
                        @click="clickMenu('htdb')"
                    >
                        <div class="outline menu-sprite-3"></div>
                        <div class="solid menu-sprite-3-3 hide"></div>
                        <p class="menu__item--text" :class="{ hide: isHide }">Tài sản HT-ĐB</p>
                        <div class="arrow-down-sprite sider-down-icon" :class="{ hide: isHide }"></div>
                        <span class="tooltiptext righttooltip">Tài sản HT-ĐB</span>
                    </li>
                </router-link>
                <router-link to="/tool" class="no-underline">
                    <li
                        ref="tool"
                        class="menu__item tooltip"
                        :class="{ activetooltip: isHide }"
                        @click="clickMenu('tool')"
                    >
                        <div class="outline menu-sprite-4"></div>
                        <div class="solid menu-sprite-4-4 hide"></div>
                        <p class="menu__item--text" :class="{ hide: isHide }">Công cụ dụng cụ</p>
                        <div class="arrow-down-sprite sider-down-icon" :class="{ hide: isHide }"></div>
                        <span class="tooltiptext righttooltip">Công cụ dụng cụ</span>
                    </li>
                </router-link>
                <router-link to="/list" class="no-underline">
                    <li
                        ref="list"
                        class="menu__item tooltip"
                        :class="{ activetooltip: isHide }"
                        @click="clickMenu('list')"
                    >
                        <div class="outline menu-sprite-5"></div>
                        <div class="solid menu-sprite-5-5 hide"></div>
                        <p class="menu__item--text" :class="{ hide: isHide }">Danh mục</p>
                        <span class="tooltiptext righttooltip">Danh mục</span>
                    </li>
                </router-link>
                <router-link to="/research" class="no-underline">
                    <li
                        ref="research"
                        class="menu__item tooltip"
                        :class="{ activetooltip: isHide }"
                        @click="clickMenu('research')"
                    >
                        <div class="outline menu-sprite-6"></div>
                        <div class="solid menu-sprite-6-6 hide"></div>
                        <p class="menu__item--text" :class="{ hide: isHide }">Tra cứu</p>
                        <div class="arrow-down-sprite sider-down-icon" :class="{ hide: isHide }"></div>
                        <span class="tooltiptext righttooltip">Tra cứu</span>
                    </li>
                </router-link>
                <router-link to="/report" class="no-underline">
                    <li
                        ref="report"
                        class="menu__item tooltip"
                        :class="{ activetooltip: isHide }"
                        @click="clickMenu('report')"
                    >
                        <div class="outline menu-sprite-7"></div>
                        <div class="solid menu-sprite-7-7 hide"></div>
                        <p class="menu__item--text" :class="{ hide: isHide }">Báo cáo</p>
                        <div class="arrow-down-sprite sider-down-icon" :class="{ hide: isHide }"></div>
                        <span class="tooltiptext righttooltip">Báo cáo</span>
                    </li>
                </router-link>
            </ul>
        </div>
        <!-- trigger sider button -->
        <div
            class="trigger-button" 
        >
            <div
                class="arrow-left-outline-sprite trigger-button-left-icon"
                :class="{ hide: isHide, pstatic: isHide }"
                @click="onToggleSider"
                @keydown="handleButtonKeyDown"
                tabindex="1"
            >
            </div>
            <div
                class="arrow-right-outline-sprite trigger-button-right-icon hide"
                :class="{ show: isHide }"
                @click="onToggleSider"
                @keydown="handleButtonKeyDown"
                tabindex="1"
            >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isClose: false,
            isHide: false,
        };
    },
    methods: {
        /**
         * handle when click the button of sider.
         * Resize, hide the text and change button
         * when small.
         * @author vu
         */
        onToggleSider() {
            this.isClose = !this.isClose;
            this.isHide = !this.isHide;
        },

        /**
         * Toggle sider when click enter.
         * @param {Event} event - the default parameters.
         * @author vu
         */
        handleButtonKeyDown(event) {
            if (event.key === 'Enter') {
                this.onToggleSider();
            }
        },

        clickMenu(nameRef) {
            for (let ref in this.$refs) {
                if (ref === nameRef) {
                    this.$refs[ref].classList.add("active");
                } else {
                    this.$refs[ref].classList.remove("active");
                }
            }
        },
    },
};
</script>

<style lang="css" scoped>
/* logo and icon */
.logo {
    cursor: pointer;
    margin: 0 16px;
}

.logo-title.hide {
    display: none;
}

.sider-down-icon {
    margin-top: 2px;
    margin-left: auto;
    margin-right: 4px;
}

.trigger-button-left-icon {
    cursor: pointer;
    opacity: 1;
    position: absolute;
    right: 0;
    margin: 0 16px;
}

.trigger-button-left-icon.pstatic {
    position: static;
}

.trigger-button-right-icon {
    cursor: pointer;
}

/* sider */
.sider {
    width: 200px;
    height: 100vh;
    position: relative;
    transition: 0.5s;
}

.sider.close {
    width: 69px;
}

.menu {
    background-color: var(--sider-bg);
    color: white;
    height: calc(100vh - 44px);
    overflow: visible;
}

.menu__header {
    height: 65px;
    cursor: pointer;
    padding: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu__header strong {
    font-size: 20px;
    line-height: 26px;
    font-weight: bold;
    text-transform: uppercase;
    flex: 1 1 auto;
}

.menu__items {
    list-style-type: none;
    padding: 0 8px;
    height: calc(100% - 65px - 44px);
    position: relative;
}

.menu__item {
    opacity: 0.5;
    height: 44px;
    padding: 16px;
    padding-right: 4px;
    display: flex;
    align-items: center;
    margin-top: 4px;
    color: white;
}

.menu__item.active {
    background-color: var(--sider-bg-hover);
    opacity: 1;
    border-radius: 6px;
    font-weight: bold;
}

.menu__item.active .solid {
    display: inline-block;
}

.menu__item.active .outline {
    display: none;
}

.menu__item:hover {
    background-color: var(--sider-bg-hover);
    opacity: 1;
    border-radius: 6px;
    font-weight: bold;
}

.menu__item:hover .outline {
    display: none;
}

.menu__item:hover .solid {
    display: inline-block;
}

.menu__item--text {
    margin-left: 16px;
    font-size: 13px;
    white-space: nowrap;
}

.trigger-button {
    position: absolute;
    bottom: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--sider-bg);
}

.no-underline {
    text-decoration: none;
}
</style>
