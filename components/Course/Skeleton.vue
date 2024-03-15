<template>
  <div class="container">
    <div class="row">
      <div class="column">
        <div class="line line1 loading-animation" />
      </div>
      <div class="circle loading-animation" />
    </div>
    <div class="column">
      <div class="line line4 loading-animation" />
      <div class="line line5 loading-animation" />
    </div>
    <div class="row">
      <div class="box loading-animation" />
      <div class="box loading-animation" />
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  height: 8rem;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.23);
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

.row ~ .column {
}

.row:nth-child(3) {
  margin-top: 35px;
}

.circle {
  height: 15px;
  width: 15px;
  border-radius: 50%;
}

.line {
  margin-top: 10px;
  height: 10px;
  border-radius: 50px;
}

.line1 {
  height: 10px;
  width: 100px;
  margin-bottom: 15px;
}

.line4,
.line5 {
  width: 100%;
}

.box {
  height: 10px;
  width: 100px;
  border-radius: 50px;
}

.loading-animation {
  overflow: hidden;
  background: #d0d0d0;
}

.loading-animation::before {
  content: '';
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
