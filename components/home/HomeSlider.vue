<template>
  <v-sheet
    height="100vh"
    class="position-relative mx-auto home-slider overflow-hidden d-flex d-flex align-center"
    color="transparent"
  >
    <v-sheet
      :class="['position-relative z-1 mx-auto d-flex align-center', isMobile ? 'px-8' : 'px-16']"
      color="transparent"
      height="100%"
      min-height="500"
    >
      <div class="d-flex flex-column align-center justify-center" :style="!isMobile && `height: 90%`">
        <h1
          :class="[
            'white--text text--darken-2 font-weight-regular title-home',
            isMobile ? 'f-40' : 'f-45',
            isRTL && isMobile && 'text-center'
          ]"
          style="font-family: Poppins; line-height: 1.4; font-weight: 600"
        >
          Shaw Bahrampour:<br />
          Riding the Data Wave with Retro Vibes🌴 - A Front-End Developer's Paradise
        </h1>
        <h1
          :class="[
            'white--text text--darken-2 mt-10 font-weight-regular title-home w-full',
            isMobile ? 'f-20' : 'f-24 text-start',
            isRTL && isMobile && 'text-center'
          ]"
          style="font-family: Poppins; line-height: 1.4; font-weight: 600"
        >
          Scroll Down 👇
        </h1>
        <!-- <div v-if="!flag.loading && item" class="w-full mt-16 d-flex flex-column align-start">
          <span class="white--text f-20">Lates Blog Post:</span>
          <v-btn
            text
            :class="['white--text text-center post-title pa-0', isMobile && 'text-wrap text-start mt-4']"
            style="font-family: Poppins"
            target="_blank"
            :href="item.url"
            >{{ item.title }}</v-btn
          >
        </div> -->
      </div>
    </v-sheet>
    <v-sheet
      v-if="!isMobile"
      class="mr-16 rounded overflow-hidden"
      height="90%"
      min-width="35%"
      color="transparent"
      style="border: solid 2px grey !important"
    >
      <iframe
        src="https://my.spline.design/darkspideycopy-064a63ac1ff82ba5aeebc45c26b69ec8/"
        frameborder="0"
        width="100%"
        height="115%"
        style="border-radius: 14px"
      ></iframe>
    </v-sheet>
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
    this.calculateHeight();
    await gsap.from(['.title-home'], {
      duration: 1,
      ease: 'power1.out',
      x: '-200'
    });
    window.addEventListener('resize', this.calculateHeight);

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
    gsap.set('.title-home', { x: 0 });

    ScrollTrigger.batch('.title-home', {
      onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, stagger: { each: 0.15, grid: [1, 3] }, overwrite: true }),
      onLeave: (batch) => gsap.to(batch, { opacity: 0, x: 1000, overwrite: true }),
      onEnterBack: (batch) => gsap.to(batch, { opacity: 1, x: 0, stagger: 0.15, overwrite: true }),
      onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, x: 1000, overwrite: true })
    });
    ScrollTrigger.addEventListener('refreshInit', () => gsap.set('.title-home', { y: 0 }));
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
.scroll-down {
  color: white;
  text-align: center;
  transform: translate(-50%, -50%);
}

@media (max-width: 800px) {
  .info {
    font-size: 17px;
  }
}
</style>
