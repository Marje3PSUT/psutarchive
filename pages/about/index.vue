<template>
  <div id="about-main">
    <div class="jumbotron">
      <div class="jumbotron-inner">
        <div class="top-box">
          <h1>{{ $t('aboutweb') }}</h1>
          <p>{{ $t('aboutdesc') }}</p>
        </div>
      </div>
      <div class="img-layer-container">
        <div class="team-image">
          <img src="../../assets/images/team.png" />
        </div>
        <div class="circles-container">
          <img class="img-1" src="../../assets/images/Circles.svg" />
        </div>
      </div>
    </div>
    <div class="story-container">
      <div class="container-divider"></div>
      <div class="origin-story-container">
        <h3 class="text-center">{{ $t('origin') }}</h3>
        <p>{{ $t('vision') }}</p>
        <h4>{{ $t('values') }}</h4>
        <p>{{ $t('clubValues') }}</p>
        <h4>{{ $t('objectivesTitle') }}</h4>
        <ul>
          <li>
            <p>{{ $t('objective1') }}</p>
          </li>
          <li>
            <p>{{ $t('objective2') }}</p>
          </li>
          <li>
            <p>{{ $t('objective3') }}</p>
          </li>
          <li>
            <p>{{ $t('objective4') }}</p>
          </li>
          <li>
            <p>{{ $t('objective5') }}</p>
          </li>
          <li>
            <p>{{ $t('objective6') }}</p>
          </li>
        </ul>
        <h4>{{ $t('management') }}</h4>
        <ul>
          <li>
            <p>{{ $t('activity1') }}</p>
          </li>
          <li>
            <p>{{ $t('activity2') }}</p>
          </li>
          <li>
            <p>{{ $t('activity3') }}</p>
          </li>
          <li>
            <p>{{ $t('activity4') }}</p>
          </li>
          <li>
            <p>{{ $t('activity5') }}</p>
          </li>
          <li>
            <p>{{ $t('activity6') }}</p>
          </li>
        </ul>
        <h4>{{ $t('supportingBodiesTitle') }}</h4>
        <ul>
          <li>
            <p>{{ $t('supportBody1') }}</p>
          </li>
          <li>
            <p>{{ $t('supportBody2') }}</p>
          </li>
          <li>
            <p>{{ $t('supportBody3') }}</p>
          </li>
          <li>
            <p>{{ $t('supportBody4') }}</p>
          </li>
          <li>
            <p>{{ $t('supportBody5') }}</p>
          </li>
          <li>
            <p>{{ $t('supportBody6') }}</p>
          </li>
        </ul>
        <h4>{{ $t('additionalIdeasTitle') }}</h4>
        <ul>
          <li>
            <p>{{ $t('idea1') }}</p>
          </li>
          <li>
            <p>{{ $t('idea2') }}</p>
          </li>
          <li>
            <p>{{ $t('idea3') }}</p>
          </li>
        </ul>

      </div>
      <div class="container-divider"></div>
    </div>
  </div>
</template>


<style scoped>
.jumbotron {
  width: 100%;
  height: 530px;
  position: relative;
  margin: 0;
  z-index: 1;
  border-radius: 0px;
}

.jumbotron-inner,
.story-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 0 20px;
}

.top-box h1,
.top-box p {
  text-align: center;
  margin-bottom: 20px;
}

.img-layer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.team-image {
  position: relative;
  z-index: 3;
}

.circles-container {
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.img-1 {
  z-index: 2;
}

.story-container {
  height: 100%;
  width: 100%;
  margin-top: 150px;
}

.container-divider {
  margin-top: 100px;
}

.origin-story-container p,
.origin-story-container h5 {
  margin-top: 20px;
  color: #676a6c;
}

h4,
h3,
h1 {
  margin-top: 20px;
  font-weight: bold;
}

.origin-story-container li {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
