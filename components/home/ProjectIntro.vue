<template>
  <v-sheet
    id="intro"
    height="100vh"
    :class="[
      'position-relative mx-auto home-slider overflow-hidden d-flex justify-center align-center container',
      isMobile && 'px-8'
    ]"
    color="transparent"
    style="position: fixed"
  >
    <v-img
      src="/images/timeline/shaw.png"
      class="avatar"
      max-width="180"
      height="160"
      style="position: absolute; left: 5%; top: 20%"
    />
    <v-img
      src="/images/timeline/crown.png"
      class="avatar"
      max-width="140"
      height="120"
      style="position: absolute; left: 5%; top: 11%"
    />
    <div class="box">
      <h1
        :class="[
          'white--text text--darken-2 font-weight-regular',
          isMobile ? 'f-40' : 'f-30 text-center',
          isRTL && isMobile && 'text-center'
        ]"
        style="font-family: Poppins; line-height: 1.4; font-weight: 600"
      >
        24 y/o Front-End Developer From Esfahan, Iran<br />
        Let's Take a Look at Some of the Projects<br /><br />
        <span class="f-20" @click="$vuetify.goTo('#maanproject')" style="cursor: pointer">Scroll Down 👇</span>
      </h1>
    </div>
  </v-sheet>
</template>

<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Draggable } from 'gsap/Draggable';
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
    gsap.registerPlugin(ScrollTrigger, Draggable);
    const lenis = new Lenis({
      lerp: 0.1
    });

    Draggable.create('.avatar', {
      bounds: '.container',
      inertia: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    gsap.defaults({ ease: 'power3' });
    gsap.set('.box', { y: -1000 });
    gsap.to('.avatar', {
      rotation: 360,
      x: '60vw',
      ScrollTrigger: '.box',
      xPercent: -100,
      duration: 100,
      repeat: 10,
      yoyo: true
    });

    ScrollTrigger.batch('.box', {
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: { each: 0.15, grid: [1, 3] }, overwrite: true }),
      onLeave: (batch) => gsap.set(batch, { opacity: 0, y: -1000, overwrite: true }),
      onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
      onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 1000, overwrite: true })
    });
    ScrollTrigger.addEventListener('refreshInit', () => gsap.set('.box', { y: 0 }));

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
