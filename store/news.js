import * as api from '~/api';

export const state = () => ({
  list: [],
  categories: []
});

export const getters = {
  list: (state) => state.list,
  categories: (state) => state.categories
};

export const mutations = {
  SET: (state, payload) => {
    for (const [key, value] of Object.entries(payload)) {
      state[key] = value;
    }
  }
};

export const actions = {
  getPosts({ commit }, { params = {} } = {}) {
    return this.$axios.$get(api.blog(), { params });
  }
};
