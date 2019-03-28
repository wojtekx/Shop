<template>
 <div class="produkt">
   <div class="nav">
        <router-link to="/koszyk">Koszyk</router-link> |
        <router-link to="/">Powrót do sklepu</router-link>
   </div>
     <div class="produktCard" >
        <img :srcset="productCard.image">
        <p class="title">{{productCard.product_name}}</p>
        <div class="desc">
            
            <div class="dect-item">
                <p class="price">{{productCard.price}}</p>
                <p class="price">PLN/szt.</p>
            </div>
            <div class="dect-item">
                <div class="counter">
                    <button v-on:click="subtract(productCard)">-</button>
                    <p>{{productCard.counter}}</p>
                    <button v-on:click="productCard.counter++">+</button>
                </div>
                <button v-on:click="add(productCard)">Do koszyka</button>
            </div>
        </div>
     </div>
     <div class="modal none">
         <div class="modalBody">
            <h2>DODANO DO KOSZYKA</h2>
            <h4> {{productCard.product_name}} </h4>
            <div class="basketInfo">
              <div class="basketInfoItem">
                <p>Cena jednostkowa</p>
                <p> {{productCard.counter}} x {{productCard.price}}</p>
                <button v-on:click="removeClass()">Kontynuuj zakupy</button>
              </div>
              <div class="basketInfoItem">
                <p>Wartość koszyka</p>
                <p> ${{basketValue.toFixed(2)}} </p>
                <router-link to="/koszyk"><button>Przejdź do koszyka</button></router-link>
              </div>
            </div>
         </div>
        </div>
 </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from "vuex";
export default {
    data(){
        return{

        }
    },
    methods:{
        add(item){
            for(let i=1; i <= item.counter; i++){
                this.$store.dispatch("addToBasket", item)
                this.$store.dispatch("updateBasketValue", item)
            }
        
        document.querySelector('.modal').classList.remove('none')
        },
         removeClass(){
        document.querySelector('.modal').classList.add('none')
        },
        subtract(item){
            if(item.counter > 1 ) {
                item.counter--
            }
        },
    },
    mounted(){
       
        
    },
     computed: mapState(["productCard", "basketValue"])
}
</script>

<style  lang="scss" scoped>
.produkt{
    .none{
      display: none;
    }
    .modal{
        width: 98vw;
        height: 100vw;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        padding: 20% 0;
        background: rgba(0, 0, 0, 0.7);
        .modalBody{
          width: 300px;
          padding: 50px;
          margin: 0 auto;
          background: white;
          .basketInfo{
            display: flex;
            justify-content: space-between;
          }
        }
      }
    .produktCard{
    display: flex;
    width: 80vw;
    justify-content: space-around;
    align-items: flex-end;
    margin: 50px 0 0;
    position: relative;
     p.title {
            position: absolute;
            top: 10px;
            right: 5%;
            font-size: 30px;
            font-weight: bold;
        }
    .desc{
        .dect-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 170px;
            .counter{
                width:64px;
                display: flex;
            justify-content: space-between;
            align-items: center;
            }
        }
        p.price{
            font-size: 20px;
        }
       
    }
}
}
</style>
