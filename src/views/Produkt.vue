<template>
 <div class="produkt">
    <div class="nav">
      <p class="shopBack"><router-link to="/" ><img src="../assets/logo.png" alt="logo"></router-link></p>
       <router-link class="basketLink" to="/koszyk"><img src="../assets/shopping-cart-solid.svg" alt="basket" width="50px" height="50px"></router-link>
     </div>
     <div class="produktCard" >
        <img :srcset="productCard.image">
        <p class="title">{{productCard.product_name}}</p>
        <div class="desc">
            
            <div class="desc-item">
                <p class="price">{{productCard.price}}</p>
                <p class="price">PLN/szt.</p>
            </div>
            <div class="desc-item">
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
 .nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2894ca;
    box-shadow: 0 0 16px 5px #294c94;
    padding-bottom: 5px;
    img{
      width: 60px;
      padding: 15px 0 0 15px;
    }
    a{
      padding-right: 20px;
    }
  }
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
          border-radius: 5px;
          h4{
            color:#076aa7;
          }
          .basketInfo{
            display: flex;
            justify-content: space-between;
            .basketInfoItem{
              p:first-child{
                font-weight: bold;
              }
              button{
                background: blue;
                color: white;
                border: 0;
                padding: 10px;
                border-radius: 10px;
                cursor: pointer;
              }
            }
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
            button{
                background-color: #3331a5;
                color: white;
                padding: 7px 12px;
                border: 1px solid black;
                border-radius: 8px;
                margin-left: 5px;
            }
        }
        p.price{
            font-size: 20px;
        }
       
    }
}
}
@media(min-width: 320px)and(max-width: 768px){
    .produkt{
         .modal{
            height: 100%;
            .modalBody{
                width: 88vw;
                padding: 15px;
                }
        }
        .produktCard{
        width:90vw;
        flex-direction: column;
        margin: 0 auto;
        padding-top: 20px;
        img{
            width: 200px;
            margin: 95px auto 0 ;
        }
        p.title{
            top: 0;
            font-size: 26px;
             left: 50%;
            transform: translate(-50%, 0);
        }
        .desc{
            width: 70vw;
            margin: 0 auto;
            .desc-item{
                display: flex;
                align-items: center;
                justify-content: center;
                    p{
                        font-size: 20px;
                        font-weight: bold;
                        margin-right:5px;
                        margin-left: 5px;
                    }
                .counter{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    p{
                        font-size: 20px;
                        font-weight: bold;
                        margin-right:5px;
                        margin-left: 5px;
                    }
                }
                button{
                    background-color: #3331a5;
                    color: white;
                    padding: 7px 12px;
                    border: 1px solid black;
                    border-radius: 8px;
                    margin-left: 5px;
                }
            }
        }
    }
    }
}
</style>
