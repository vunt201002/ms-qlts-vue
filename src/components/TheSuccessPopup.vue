<template>
    <div
        class="success__modal--container"
    >
        <div>
            <img src="../assets/img/green-tick-success.png" alt="/">
            <p class="success__modal--container-text">{{ successPopupTitle }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        successPopupTitle: String,
    },
};
</script>

<style lang="css" scoped>
    
.success__modal--container {
    width: 250px;
    height: 45px;
    padding: 8px 14px;
    border-radius: 4px;
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.2);
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: slideIn ease 0.5s, fadeOut linear 1s 3s forwards;
}

.success__modal--container div {
    display: flex;
    align-items: center;
}

.hidePopup {
    display: none;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(100%);
    } to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeOut {
    to {
        opacity: 0;
    }
}

.success__modal--container img {
    width: 30px;
    height: auto;
}

.success__modal--container p {
    font-size: 14px;
    margin-left: 8px;
}

</style>