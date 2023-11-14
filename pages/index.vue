<template>
  <div>
    <HomeSlider />
    <ProjectIntro />
    <ProjectMaan />
    <ProjectMagic />
    <ProjectLyan />
    <ProjectCobel />
    <ContactMe />
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
html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
</style>
