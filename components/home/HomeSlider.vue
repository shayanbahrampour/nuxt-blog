<template>
  <v-sheet
    :height="isMobile ? 'calc(100vh - 130px)' : `calc(100vh - ${screenHeight < 760 ? 80 : 120}px)`"
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
            'white--text text--darken-2 font-weight-regular',
            isMobile ? 'f-40' : 'f-45',
            isRTL && isMobile && 'text-center'
          ]"
          style="font-family: Poppins; line-height: 1.4; font-weight: 600"
        >
          Shaw Bahrampour:<br />
          Riding the Data Wave with Retro Vibes🌴 - A Front-End Developer's Paradise
        </h1>
        <div v-if="!flag.loading && item" class="w-full mt-16 d-flex flex-column align-start">
          <span class="white--text f-20">Lates Blog Post:</span>
          <v-btn
            text
            :class="['white--text text-center post-title pa-0', isMobile && 'text-wrap text-start mt-4']"
            style="font-family: Poppins"
            target="_blank"
            :href="item.url"
            >{{ item.title }}</v-btn
          >
        </div>
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
export default {
  data() {
    return {
      dialog: false,
      item: null,
      screenHeight: 1080,
      flag: {
        loading: false
      }
    };
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateHeight);
  },
  mounted() {
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
    console.log(this.item);
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
