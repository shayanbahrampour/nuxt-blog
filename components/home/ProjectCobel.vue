<template>
  <v-sheet
    min-height="100vh"
    :class="['position-relative mx-auto home-slider d-flex justify-center align-center', isMobile && 'px-8']"
    color="transparent"
    style="position: fixed"
    ><div class="cobel d-flex flex-column align-center" style="font-family: Poppins">
      <v-img src="/images/timeline/cobelgroup.png" max-width="160" height="50" />

      <h1
        :class="[
          'white--text text--darken-2 font-weight-regular my-6 text-center',
          isMobile ? 'f-40' : 'f-30',
          isRTL && isMobile && 'text-center'
        ]"
        style="line-height: 1.4; font-weight: 600 !important"
      >
        Cobel Group Website & Admin
      </h1>
      <span class="white--text f-20 text-center" :style="`${!isMobile && 'width: 50%'}; line-height: 1.6`"
        >Cobel Group® is a private pharmaceutical company with over 3000 employees and 100 national brands, encompassing
        a complete and integrated pharmaceutical cycle within itself. The group strives to be a catalyst and creator of
        new knowledge and solutions, with a focus on human health.
      </span>
      <div :class="['d-flex justify-space-between', isMobile && 'flex-column']" style="width: 50%">
        <v-btn
          :class="['rounded d-flex justify-center white--text f-16 mt-6 font-weight-bold']"
          href="https://cobel.applife.ir/"
          target="_blank"
          elevation="0"
          outlined
          height="50"
          width="150"
        >
          Website
        </v-btn>
        <v-btn
          :class="['rounded d-flex justify-center white--text f-16 mt-6 font-weight-bold']"
          href="https://admin-cobel.applife.ir/"
          target="_blank"
          elevation="0"
          outlined
          height="50"
          width="150"
        >
          Admin
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
export default {
  data() {
    return {
      dialog: false,
      item: null,
      blogGasp: null,
      screenHeight: 1080,
      flag: {
        loading: false
      }
    };
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateHeight);
  },
  async mounted() {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      lerp: 0.1
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    gsap.defaults({ ease: 'power3' });
    gsap.set('.cobel', { opacity: 0 });

    ScrollTrigger.batch('.cobel', {
      onEnter: (batch) => gsap.to(batch, { opacity: 1, stagger: { each: 0.15, grid: [1, 3] }, overwrite: true }),
      onLeave: (batch) => gsap.set(batch, { opacity: 0, overwrite: true }),
      onEnterBack: (batch) => gsap.to(batch, { opacity: 1, stagger: 0.15, overwrite: true }),
      onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, overwrite: true })
    });
    ScrollTrigger.addEventListener('refreshInit', () => gsap.set('.cobel', { x: 0 }));

    ScrollTrigger.create({
      start: 0,
      end: 'max'
    });
    this.calculateHeight();
    window.addEventListener('resize', this.calculateHeight);
  },
  methods: {
    calculateHeight() {
      this.screenHeight = window.innerHeight;
    }
  },
  async fetch() {
    this.flag.loading = true;
    const { posts } = await this.$store.dispatch('news/getPosts');
    this.item = posts[0];
    this.flag.loading = false;
  }
};
</script>

<style lang="scss">
.post-title:hover {
  color: grey !important;
  cursor: pointer;
}
</style>
