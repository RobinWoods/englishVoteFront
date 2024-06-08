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
  </header>

  <div>
    <router-view></router-view>
  </div>
  <footer>

  </footer>
</template>

<style scoped>
  header {
    display: flex;
    align-items: center;
    justify-content: center;

  }

  menu {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2em;
    width: 10em;
    padding: 0;
    --decoration-left: 50%;
    --decoration-width: 0;
  }

  menu::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: var(--decoration-left);
    width: var(--decoration-width);
    height: 0.12em;
    background: #181716;
    transition: 300ms;
  }

  a {
    font-family: 'CooperHewitt', sans-serif;
    font-weight: 600;
    color: #181716;
    padding-bottom: .2em;
    text-decoration: none !important;
  }

  .link {
    border-bottom: 0.15em solid #181716;
  }

</style>
