<template>
  <!-- <div>
    <HomeSlider />
    <ProjectIntro />
    <ProjectMaan />
    <ProjectMagic />
    <ProjectLyan />
    <ProjectCobel />
    <ContactMe />
  </div> -->
  <div class="w-full h-full pa-6" style="background-color: black; color: #4af626">
    <p class="f-16" style="font-weight: 500 !important">
      Always dreaming about stars. <br /><br />
      Thinking about something like a black hole which exists somewhere out there drives me crazy.
      <br /><br /><br /><br />
      Shaw Bahrampour
    </p>
  </div>
</template>

<script>
import HomeSlider from '~/components/home/HomeSlider.vue';
import ProjectIntro from '~/components/home/ProjectIntro.vue';
import ProjectMaan from '~/components/home/ProjectMaan.vue';
import ProjectMagic from '~/components/home/ProjectMagic.vue';
import ProjectLyan from '~/components/home/ProjectLyan.vue';
import ProjectCobel from '~/components/home/ProjectCobel.vue';
import ContactMe from '~/components/home/ContactMe.vue';

export default {
  components: { ProjectIntro, HomeSlider, ProjectMaan, ProjectMagic, ProjectLyan, ProjectCobel, ContactMe },
  head() {
    return {
      title: this.$t('pageTitles.index')
    };
  }
};
</script>

<style lang="scss">
// html.lenis {
//   height: auto;
// }

// .lenis.lenis-smooth {
//   scroll-behavior: auto;
// }

// .lenis.lenis-smooth [data-lenis-prevent] {
//   overscroll-behavior: contain;
// }

// .lenis.lenis-stopped {
//   overflow: hidden;
// }

// .lenis.lenis-scrolling iframe {
//   pointer-events: none;
// }
</style>
