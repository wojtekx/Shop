<template>
  <div class="app">
     <router-link to="/">Powrót do sklepu</router-link>
      <div class="basket">
        <div class="basketHeader">
          <p>Produkt</p>
          <p></p>
          <p>Cena</p>
          <p>Ilość</p>
          <p>Wartość</p>
          <p></p>
        </div>
        <div class="basketItem" v-for="card in basket" :key="card.id">
            <div class="itemDesc">
              <img :srcset="card.image">
              <p>{{card.product_name}}</p>
              <p class="price">{{card.price}}</p>
              <p><button v-on:click="subtract(card)">-</button> {{card.counter}} <button v-on:click="increaseCounter(card)">+</button></p> 
              <p>${{(card.price.slice(1) * card.counter).toFixed(2)}}</p>
              <button class="delete" v-on:click="deleteItem(card)">X</button>
            </div>
            
        </div>
        <div class="basketValue">
              wartość koszyka: ${{ this.result.toFixed(2)}}
            </div>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data(){
    return{
      result: 0,
    }
  },
  methods:{
    deleteItem(card){
      this.$store.dispatch("removeFromBasket", card)
      let result = this.$store.basketValue;
      this.result -= Number(card.price.slice(1)*card.counter)
      this.$store.dispatch("setBasketValue", this.result)
    },
    subtract(card){
      if(card.counter > 1 ) {
        card.counter--
        this.result -= Number(card.price.slice(1))
        this.$store.dispatch("setBasketValue", this.result)
      }
    },
    increaseCounter(card){
      card.counter++
      this.result += Number(card.price.slice(1))
      this.$store.dispatch("setBasketValue", this.result)
    },
  },
  mounted(){
     const x = this.$store.state.basket.map(e => Number(e.price.slice(1)* e.counter))
      for(let i=0; i < x.length; i++){
        this.result += x[i]
      }
      this.$store.dispatch("setBasketValue", this.result)
  },

  computed: mapState(["basket", "basketValue"])
}
</script>

<style lang="scss" scoped>
.basket {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    .basketHeader {
        display: flex;
        justify-content: space-between;
        width: 75vw;
        border-bottom: 1px solid gray;
    }
    .basketItem {
        display: flex;
        align-items: center;
        border-bottom: 1px solid gray;
        .itemDesc{
          display: flex;
          width: 75vw;
          justify-content: space-between;
          height: 120px;
          align-items: center;
          margin: 10px 0;
          p{
            width: 100px;
            margin-right: 44px;
          }
          img{
            width: 100px;
            height: 120px;
          }
          .delete{
            margin-right: 20px;
          }
        }
    }
    .basketValue{
      width: 270px;
      margin-left: auto;
      margin-right: 10%;
      margin-top: 20px;
      font-size: 20px;
      color: black;
      font-weight: 700;
    }
}
</style>

