import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: "",
    productCard: [],
    basket: [],
    basketValue:0,
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data;
    },
    ADD_TO_BASKET(state, data){
     const newElement = {...data, counter: 1};
       const x = state.basket.map(e=>e.id)
       if(x.includes(data.id)){
        const thisProdukt = state.basket.filter(e=>e.id === data.id)
        thisProdukt[0].counter++
         
       }else state.basket.push(newElement)
    },
    REMOVE_FROM_BASKET(state, data){
      state.basket = state.basket.filter( el => el !== data)
    },
    ADD_TO_PRODUCTCARD(state, data){
      state.productCard = data;
      // state.basketValue += Number(data.price.slice(1))
    },
    SET_BASKETVALUE(state, data){
      state.basketValue = data
    },
    UPDATE_BASKETVALUE(state, data){
      state.basketValue += Number(data.price.slice(1))
    },

  },
  actions: {
    getData({commit}){
      axios
      .get("http://www.mocky.io/v2/5ab0d1882e0000e60ae8b7a6")
      .then(response => response.data)
      .then(data => {
        commit("SET_DATA", data )
      })
    },
    addToBasket({commit}, payload){
      commit("ADD_TO_BASKET", payload)      
    },
    removeFromBasket({commit}, payload){
      commit("REMOVE_FROM_BASKET", payload)
    },
    addToProductCard({commit}, payload){
      commit("ADD_TO_PRODUCTCARD", payload)
    },
    setBasketValue({commit}, payload){
      commit("SET_BASKETVALUE", payload)
    },
    updateBasketValue({commit}, payload){
      commit("UPDATE_BASKETVALUE", payload)
    },
  }
})
