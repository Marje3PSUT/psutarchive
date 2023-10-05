<template>
    <div class="container">
        <div class="row">
            <div class="column">
                <div class="line line1 loading-animation"></div>
            </div>
            <div class="circle loading-animation"></div>
        </div>
        <div class="column">
            <div class="line line4 loading-animation"></div>
            <div class="line line5 loading-animation"></div>
        </div>
        <div class="row">
            <div class="box loading-animation"></div>
            <div class="box loading-animation"></div>
        </div>
    </div>
</template>

<style scoped>
.container {
    position: relative;
    height: fit-content;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, .23);
}

.column {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.row~.column {
    margin-top: 20px;
}

.row:nth-child(3) {
    margin-top: 35px;
}

.circle {
    height: 30px;
    width: 30px;
    border-radius: 50%;
}

.line {
    margin-top: 25px;
    height: 15px;
    border-radius: 50px;
}

.line1 {
    height: 20px;
    width: 100px;
    margin-top: 30px;
}



.line4,
.line5 {
    width: 100%;
}

.box {
    height: 25px;
    width: 100px;
    border-radius: 50px;
}

.loading-animation {
    overflow: hidden;
    background: #D0D0D0;
}

.loading-animation::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    animation: loading 1s infinite;
    background: linear-gradient(to right, transparent, white, transparent);
}

@keyframes loading {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}
</style>