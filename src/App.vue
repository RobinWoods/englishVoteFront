<script>
export default {
  data() {
    return {
      decorationLeft: '50%',
      decorationWidth: '0',
    }
  },
  methods: {
    updateDecoration(event) {
      this.setDecoration(event.target);
      this.menuHovered = true;
    },
    setDecoration(target) {
      this.decorationLeft = target.offsetLeft + 'px';
      this.decorationWidth = target.offsetWidth + 'px';
    },
    resetHover() {
      this.menuHovered = false;
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        let activeLink;
        switch (this.$route.path) {
          case '/vote':
            activeLink = this.$refs.voteLink.$el;
            break;
          case '/':
            activeLink = this.$refs.resultLink.$el;
            break;
        }
        if (activeLink) {
          this.setDecoration(activeLink);
        }
      }, 0);
    });
  }
}
</script>

<template>
  <header >
      <color>
        <menu :style="{ '--decoration-left': decorationLeft, '--decoration-width': decorationWidth }">
          <router-link
              to="/vote"
              :active-class="menuHovered ? '' : 'link'"
              @mouseover="updateDecoration($event)"
              @click="resetHover"
          >
            VOTE
          </router-link>
          <router-link
              to="/"
              :active-class="menuHovered ? '' : 'link'"
              @mouseover="updateDecoration($event)"
              @click="resetHover"
          >
            RESULT
          </router-link>
        </menu>
      </color>
  </header>

  <contents>
    <router-view></router-view>
  </contents>
  <footer>

  </footer>
</template>

<style scoped>
  header {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    background: linear-gradient(to bottom, white, white, white, white, white, white, white, rgba(255, 255, 255, 0.96), transparent, transparent);
    width: 100vw;
    height: 18%;
    top: 0;
    left: 0;
  }

  color {
    background-color: #FFEDD6;
    box-shadow:  0 0 15px 4px rgba(255, 237, 214, 0.7);
    width: 15em;
    height: 3em;
    padding-top: 1em;
    border-radius: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  contents {
    margin-top: 5em;
  }

  menu {
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2em;
    width: 15em;
    padding: 0;
    margin-bottom: 2em;
    --decoration-left: 50%;
    --decoration-width: 0;
  }

  menu::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: var(--decoration-left);
    width: var(--decoration-width);
    height: 0.16em;
    background: #181716;
    transition: 300ms;
  }

  a {
    font-weight: 600;
    color: #181716;
    padding-bottom: .2em;
    text-decoration: none !important;
    box-sizing: border-box;
  }

  .link {
    border-bottom: 0.16em solid #181716;
  }

</style>
