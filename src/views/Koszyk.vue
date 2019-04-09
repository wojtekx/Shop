<template>
  <div class="app">
     <nav class="nav">
       <p class="shopBack"><router-link to="/" ><img src="../assets/logo.png" alt="logo"></router-link></p>
     </nav>
      <div class="basket">
        <div class="basketHeader">
          <p>Produkt</p>
          <p class="not-mobile"></p>
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
       <section class="options">
          <div class="delivery">
            <p>Sposób dostawy</p>
            <label for="osobisty"><input v-on:click="moreOptionsDelivery" type="radio" name="dostawa" id="osobisty" checked> Odbiór osobisty - $0</label>
            <label for="kurier"><input v-on:click="moreOptionsDelivery" type="radio" name="dostawa" id="kurier"> Kurier - ${{this.kurier}}</label>
            <label for="poczta"><input v-on:click="moreOptionsDelivery" type="radio" name="dostawa" id="poczta"> Poczta - ${{this.poczta}}</label>
          </div>
          <div class="payment">
            <p>Sposób płatności</p>
            <label for="przelew"><input  v-on:click="moreOptionsPayment" type="radio" name="platnosc" id="przelew" checked> Płatne z góry na konto </label>
            <label for="pobranie"><input  v-on:click="moreOptionsPayment" type="radio" name="platnosc" id="pobranie" > Pobranie / gotówka przy odbiorze</label>
            <label for="przelewBlyskawiczny"><input  v-on:click="moreOptionsPayment" type="radio" name="platnosc" id="przelewBlyskawiczny"> Przelew błyskawiczny</label>
          </div>
       </section>
        <section class="basketValue">
              <div><b>Wartość produktów w koszyku: </b> <span>${{ this.result.toFixed(2)}} </span></div>
              <div><b>Transport: </b><span>${{this.delivery}} </span></div>
              <div><b>Płatność: </b><span>${{this.payment}} </span></div>
              <div><b>Całkowita kwota do zapłaty: </b><span>${{ (this.result+this.options).toFixed(2)  }}</span></div>
              
        </section>
        <section class="submit">
          <router-link to="/"><button>Powrót do sklepu</button></router-link>
          <router-link to="/podsumowanie"><button id="koszykBtn">Dalej</button></router-link>
        </section>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data(){
    return{
      result: 0,
      kurier: 15,
      poczta:10,
      pobranie: 10,
      przelewB: 5,
      payment: 0,
      delivery: 0,
      options:0,
    }
  },
  methods:{
    deleteItem(card){
      this.$store.dispatch("removeFromBasket", card)
      let result = this.$store.basketValue;
      this.result -= Number(card.price.slice(1)*card.counter)
      this.$store.dispatch("setBasketValue", this.result)
       if(this.result === 0 ){
          this.payment = 0;
          this.delivery = 0;
        }
      
      if(this.delivery === 0) this.payment = 0;
        this.options = this.payment + this.delivery;
      if(this.result === 0 || this.result === -0 ){
        document.querySelector('.basketHeader').innerHTML = "<p style='text-aling:center; width: 100%;'> Brak produktów w koszyku </p>";
        document.querySelector('#koszykBtn').style.display="none";
      }
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

    moreOptionsDelivery(e){
      
      switch(e.target.id){
        case 'kurier':
          this.delivery = this.kurier
          break
        case 'poczta':
          this.delivery = this.poczta
          break
        case 'osobisty':
           this.delivery = 0
           break
      }
      
      if(this.result === 0 ){
        this.delivery = 0;
      }
      this.options = this.payment + this.delivery;
    },
    moreOptionsPayment(e){
      switch(e.target.id){
        case 'przelew':
           this.payment = 0
           break
        case 'pobranie':
           this.payment = this.pobranie
           break
        case 'przelewBlyskawiczny':
           this.payment = this.przelewB
           break
      } 
      if(this.result === 0 ){
        this.payment = 0;
      }
       this.options = this.payment + this.delivery;
  },
  },
  mounted(){
     const x = this.$store.state.basket.map(e => Number(e.price.slice(1)* e.counter))
      for(let i=0; i < x.length; i++){
        this.result += x[i]
      }
      this.$store.dispatch("setBasketValue", this.result)
      if(this.result === 0){
        document.querySelector('.basketHeader').innerHTML = "<p style='text-aling:center; width: 100%;'> Brak produktów w koszyku </p>";
        document.querySelector('#koszykBtn').style.display="none";
      }
      
  },

  computed: mapState(["basket", "basketValue"]),
}

</script>

<style lang="scss" scoped>
.nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2894ca;
    box-shadow: 0 0 16px 5px #294c94;
    padding-bottom: 5px;
    height: 100px;
    position: relative;
    img{
     width: 60px;
     position: absolute;
     top:50%;
     left:50%;
     transform: translate(-50%, -50%);
     animation: mymove 2s infinite;
     @keyframes mymove {
        0% {filter:brightness(80%)}
        50% {filter:brightness(60%)}
        100% {filter:brightness(80%)}
      }
    }
  }

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
            margin-right: 42px;
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
    .options{
      display: flex;
      justify-content: space-between;
      width: 100vw;
      max-width: 1000px;
      margin: 0 auto;
      padding-bottom: 20px;
      border-bottom: 1px solid gray;
      .delivery, .payment{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 47%;
        p{
          text-align: left;
          width: 95%;
          background: #888787;
          padding: 12px;
          color: white;
        }
        label input{
          width: 20px;
          height: 20px;
        }
      }
    }
    .basketValue{
      margin: 20px 0 20px auto;
      font-size: 20px;
      color: black;
      font-weight: 800;
      div{
        display: flex;
        justify-content: space-between;
        span{
          margin-left: 20px;
        }
      }
    }
    .submit{
      border-top: 1px solid gray;
      width: 100%;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      button{
        background-color: lightblue;
        width: 100px;
        height: 50px;
      }
    }

}

@media(min-width: 320px)and(max-width: 768px){
  .basket{
    .basketHeader{
      width:90vw;
      p.not-mobile{
        display: none;
      }
    }
    .basketItem{
      width:90vw;
      .itemDesc{
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: space-between;
        img{
          display: none;
        }
        p{
          width: auto;
          margin-right: 19px;
          &:nth-child(2){
            width: 55px;
            font-size: 13px;
            text-align: left;
          }
          &:nth-child(4){
            display: flex;
            flex-direction: column;
            button{
              background-color: #42b983;
              border: 1px solid #280bce;
              border-radius: 3px;
              padding: 2px 6px;
              font-size: 17px;
              margin: 2px 0;
              margin-right: 0;
            }
          }
        }
        button.delete{
          background-color: red;
          color: white;
          border-radius: 3px;
          padding: 5px 9px;
          border: 1px solid #280bce;
          margin-right: 0;
        }
      }
    }
    .options{
      width: 90vw;
      .payment, .delivery{
        p{
          width: 70%;
        }
        label{
          font-size: 15px;
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 80%;
          margin: 10px 0;
        }
      }
    }
    .basketValue{
      div{
        margin: 10px 0;
        b{
          text-align: left;
        }
      }
    }
    .submit{
      width: 85%;
    }
  }
}
@media(min-width: 768px){
  .basket{
    .basketHeader{
      width:90vw;
      max-width: 1000px;
      margin: 0 auto;
    }
    .basketItem{
      width:90vw;
      max-width: 1000px;
      margin: 0 auto;
      .itemDesc{
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: space-between;
        p{
          width: auto;
          margin-right: 19px;
          &:nth-child(2){
            width: 55px;
            font-size: 13px;
            text-align: left;
          }
          &:nth-child(4){
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width:75px;
            button{
              background-color: #42b983;
              border: 1px solid #280bce;
              border-radius: 3px;
              padding: 2px 6px;
              font-size: 17px;
              margin: 2px 0;
              margin-right: 0;
            }
          }
        }
        button.delete{
          background-color: red;
          color: white;
          border-radius: 3px;
          padding: 5px 9px;
          border: 1px solid #280bce;
          margin-right: 0;
        }
      }
    }
  }
}

</style>

