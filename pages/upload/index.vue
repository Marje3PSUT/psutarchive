<template>
  <div class="flex flex-col items-center justify-center gap-5">
    <h2 class="text-5xl max-sm:text-3xl font-bold text-info">
      Coming Soon
    </h2>
    <progress
      class="progress progress-info max-sm:w-56 w-80 h-10 rounded-sm"
      value="69"
      max="100"
    />
    <a
      class="btn btn-outline btn-lg flex-wrap justify-center items-center gap-4 rounded-sm text-left max-sm:w-56 w-80"
      href="https://github.com/Marje3PSUT/psutarchive"
      target="_blank"
    >
      <span class="text-sm max-sm:max-w-min leading-none font-mono">
        See Progress on GitHub
      </span>
      <Icon
        name="ion:logo-github"
        size="28"
      />
    </a>
  </div>
</template>
<style>
  .progress::-webkit-progress-bar {
    border-radius: 0.125rem;
  }
  .progress::-webkit-progress-value {
    border-radius: 0;
  }
</style>
