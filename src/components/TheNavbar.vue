<template>
    <nav class="navbar">
        <div class="navbar__container">
            <!-- left -->
            <div class="navbar__container--text">
                <p>Danh sách tài sản</p>
            </div>
            <!-- right links -->
            <ul class="navbar__container--links">
                <li>
                    <p>
                        Sở tài chính
                    </p>
                </li>
                <li class="navbar__container--links-year">
                    <label for="" style="font-size: 14px;">Năm</label>
                    <span
                        class="number-wrapper"
                    >
                        <input tabindex="2" type="number" value="2021">
                    </span>
                </li>
                <li class="navbar__container--link tooltip">
                    <span class="tooltiptext bottomtooltip">Thông báo</span>
                    <div class="noti-sprite"></div>
                </li>
                <li class="navbar__container--link tooltip">
                    <span class="tooltiptext bottomtooltip">Menu</span>
                    <div class="menu-sprite"></div>
                </li>
                <li class="navbar__container--link tooltip">
                    <span class="tooltiptext bottomtooltip">Hỗ trợ</span>
                    <div class="help-sprite"></div>
                </li>
                <li
                    class="navbar__container--link tooltip"
                    style="
                        position: relative;
                        display: flex;
                        align-items: center;
                        white-space: nowrap;
                        cursor: pointer;
                    "
                >
                    <span class="tooltiptext bottomtooltip">Tài khoản</span>
                    <div style="margin-right: 8px;" class="user-sprite"></div>
                    <div class="arrow-down-solid-sprite"></div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script></script>

<style lang="css" scoped>

.navbar {
    height: 44px;
    padding: 10px 0;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
}

.navbar__container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;
    margin: 0 auto;
}

.navbar__container--text p {
    font-weight: 500;
    font-size: 16px;
    margin: 14px 0;
}

.navbar__container--links {
    display: flex;
    align-items: center;
    margin-left: auto;
    list-style-type: none;
}

.navbar__container--links li p {
    font-size: 14px;
    font-weight: 400;
    margin: 14px 0;
    margin-right: 20px;
}

.navbar__container--links-year {
    padding: 4px 8px;
    margin: 2px 4px;
    background-color: rgba(26, 164, 200, .2);
    border-radius: 3px;
}

.navbar__container--links-user {
    position: relative;
    display: flex;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
}

.navbar__container--link {
    cursor: pointer;
}

.navbar__container--link p {
    font-size: 14px;
    font-weight: 400;
    margin: 14px 0;
    margin-right: 20px;
}

.number-wrapper {
    position: relative;
}

.number-wrapper input {
    border: none;
    outline: none;
    background-color: transparent;
    width: 70px;
    overflow: hidden;
    padding-left: 14px;
}
  
.number-wrapper:after,
.number-wrapper:before {
    position: absolute;
    left: 45px;
    width: 1.6em;
    height: .9em;
    font-size: 8px;
    pointer-events: none;
    background: transparent;
}

.number-wrapper:after {
    color: black;
    content: "\25B2";
    margin-top: 1px;
    margin-left: 12px;
}

.number-wrapper:before {
    color: black;
    content: "\25BC";
    margin-bottom: 7px;
    bottom: -.5em;
    margin-left: 12px;
}

.navbar__container--links input[type=number]::-webkit-inner-spin-button, 
.navbar__container--links input[type=number]::-webkit-outer-spin-button {  

    opacity: 0;

}

.navbar__container--link {
    display: block;
    padding: 8px;
    margin: 4px;
}

.navbar__container--link:hover {
    background-color: rgba(26, 164, 200, .2);
    border-radius: 6px;
}

.number-wrapper input[type=number] {
    text-align: left;
}

</style>
