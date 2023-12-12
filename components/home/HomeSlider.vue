<template>
  <v-sheet
    height="100vh"
    class="position-relative mx-auto home-slider overflow-hidden d-flex d-flex align-center"
    color="transparent"
  >
    <div
      v-if="!flag.loading"
      class="d-flex flex-column align-start justify-end"
      style="position: absolute; left: 10%; z-index: 2; width: 40%"
    >
      <h1
        :class="['white--text text--darken-2 font-weight-regular title-home text-start', isMobile ? 'f-40' : 'f-45']"
        style="font-family: Poppins; line-height: 1.4; font-weight: 600"
      >
        Shaw Bahrampour:<br />
        Riding the Data Wave with Retro Vibes🌴 - A Front-End Developer's Paradise
      </h1>
      <h1
        :class="[
          'white--text text--darken-2 mt-10 font-weight-regular title-home w-full text-start',
          isMobile ? 'f-20' : 'f-24'
        ]"
        style="font-family: Poppins; line-height: 1.4; font-weight: 600; cursor: pointer"
        @click="$vuetify.goTo('#intro')"
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
    <div
      v-if="flag.loading"
      class="d-flex align-center justify-center"
      style="position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; background-color: #131226"
    >
      <div class="load-5">
        <div class="ring-2">
          <div class="ball-holder">
            <div class="ball"></div>
          </div>
        </div>
      </div>
    </div>
    <iframe
      id="i_frame"
      src="https://my.spline.design/galaxyrollercoaster-eae0adfdbd11eedbf53a8ee1409d1fb4/"
      frameborder="0"
      width="100%"
      height="115%"
      @load="flag.loading = false"
      style="
        border-radius: 14px;
        position: absolute;
        left: 0;
        right: 0;
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 90%);
      "
    ></iframe>
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
        loading: true
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
    // this.flag.loading = true;
    // const { posts } = await this.$store.dispatch('news/getPosts');
    // this.item = posts[0];
    // this.flag.loading = false;
  }
};
</script>

<style lang="scss">
.ring-2 {
  position: relative;
  width: 45px;
  height: 45px;
  margin: 0 auto;
  border: 4px solid white;
  border-radius: 100%;
}

.ball-holder {
  position: absolute;
  width: 12px;
  height: 45px;
  left: 17px;
  top: 0px;
}
.load-5 .ball-holder {
  animation: loadingE 1.3s linear infinite;
}

.ball {
  position: absolute;
  top: -11px;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: white;
}
.post-title:hover {
  color: grey !important;
  cursor: pointer;
}
.scroll-down {
  color: white;
  text-align: center;
  transform: translate(-50%, -50%);
}

@keyframes loadingE {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 800px) {
  .info {
    font-size: 17px;
  }
}
</style>
