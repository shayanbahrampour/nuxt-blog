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
    <MatrixText
      text="Nothing But Zeros And Ones"
      :initial-delay="1000"
      :letter-animation-duration="400"
      :letter-interval="120"
      class="home-matrix"
    />
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
import MatrixText from '~/components/ui/MatrixText.vue';

export default {
  components: { ProjectIntro, HomeSlider, ProjectMaan, ProjectMagic, ProjectLyan, ProjectCobel, ContactMe, MatrixText },
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

.home-matrix {
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
}

.home-matrix .matrix-letter {
  color: #4af626;
  font-size: 16px;
  text-shadow: 0 0 10px #4af626;
}

@media (min-width: 768px) {
  .home-matrix .matrix-letter {
    font-size: 16px;
  }
}
</style>
