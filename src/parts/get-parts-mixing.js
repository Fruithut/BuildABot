import store from '../store';

export default {
  created() {
    store.dispatch('robots/getParts');
  },
  computed: {
    parts() {
      return store.state.robots.parts || {
        heads: [],
        arms: [],
        torsos: [],
        bases: [],
      };
    },
  },
};
