<template>
  <div class="matrix-text-container" :class="className" aria-label="Matrix text animation">
    <div class="matrix-text-wrapper">
      <div class="matrix-text-content">
        <div
          v-for="(letter, index) in letters"
          :key="`${index}-${letter.char}`"
          class="matrix-letter"
          :class="{ 'matrix-active': letter.isMatrix }"
          :style="letter.isMatrix ? matrixStyle : {}"
        >
          {{ letter.isSpace ? '\u00A0' : letter.char }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatrixText',
  props: {
    text: {
      type: String,
      default: 'HelloWorld!'
    },
    className: {
      type: String,
      default: ''
    },
    initialDelay: {
      type: Number,
      default: 200
    },
    letterAnimationDuration: {
      type: Number,
      default: 500
    },
    letterInterval: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      letters: [],
      isAnimating: false
    };
  },
  computed: {
    matrixStyle() {
      return {
        color: '#00ff00',
        textShadow: '0 2px 4px rgba(0, 255, 0, 0.5)'
      };
    }
  },
  mounted() {
    this.initializeLetters();
    this.startAnimation();
  },
  methods: {
    initializeLetters() {
      this.letters = this.text.split('').map((char) => ({
        char,
        isMatrix: false,
        isSpace: char === ' '
      }));
    },
    getRandomChar() {
      return Math.random() > 0.5 ? '1' : '0';
    },
    animateLetter(index) {
      if (index >= this.text.length) return;

      this.$nextTick(() => {
        if (!this.letters[index].isSpace) {
          this.$set(this.letters, index, {
            ...this.letters[index],
            char: this.getRandomChar(),
            isMatrix: true
          });
        }

        setTimeout(() => {
          this.$set(this.letters, index, {
            ...this.letters[index],
            char: this.text[index],
            isMatrix: false
          });
        }, this.letterAnimationDuration);
      });
    },
    startAnimation() {
      if (this.isAnimating) return;

      this.isAnimating = true;
      let currentIndex = 0;

      const animate = () => {
        if (currentIndex >= this.text.length) {
          this.isAnimating = false;
          return;
        }

        this.animateLetter(currentIndex);
        currentIndex++;
        setTimeout(animate, this.letterInterval);
      };

      setTimeout(animate, this.initialDelay);
    }
  }
};
</script>

<style scoped>
.matrix-text-container {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  color: black;
}

.matrix-text-wrapper {
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.matrix-text-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.matrix-letter {
  font-family: 'JetBrains Mono', 'IBM Plex Mono', monospace;
  font-size: 16px;
  width: 1ch;
  text-align: center;
  overflow: hidden;
  display: inline-block;
  font-variant-numeric: tabular-nums;
  transition: all 0.1s ease-in-out;
}

.matrix-active {
  color: #00ff00;
  text-shadow: 0 2px 4px rgba(0, 255, 0, 0.5);
}

@media (min-width: 768px) {
  .matrix-letter {
    font-size: 16px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .matrix-text-container {
    color: white;
  }
}
</style>
