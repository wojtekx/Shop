<template>
  <div class="app">
     <div class="nav">
       <img src="../assets/logo.png" alt="logo">
       <router-link class="basketLink" to="/koszyk"><img src="../assets/shopping-cart-solid.svg" alt="basket" width="50px" height="50px"></router-link>
     </div>
      <h1 class="appTitle">Shop</h1>
    <div class="shop">
      <div class="card" v-for="item in data" :key="item.id">
        <div class="card-image">
            <img :srcset="item.image">
            <button v-on:click="add(item)" id="buyNow">Buy now</button>
        </div>
        <router-link to="/produkt"><p class="title" v-on:click="setProduct(item)" >{{item.product_name}}</p></router-link>
        <p class="price">{{item.price}}</p>
      </div>
      <div class="modal none">
         <div class="modalBody">
            <h2>DODANO DO KOSZYKA</h2>
            <h4> {{productCard.product_name}} </h4>
            <div class="basketInfo">
              <div class="basketInfoItem">
                <p>Cena jednostkowa</p>
                <p> 1 x {{productCard.price}}</p>
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
  </div>
</template>

<script>
import Main from '@/components/Main.vue'
import Vue from 'vue'
import { mapState } from "vuex";

export default {
  name: 'home',
  components: {
    Main
  },
  data(){
    return{

    }
  },
  methods:{
    add(item){
      this.$store.dispatch("addToBasket", item)
      this.$store.dispatch("updateBasketValue", item)
      this.setProduct(item);
      document.querySelector('.modal').classList.remove('none')
    },
    removeClass(){
      document.querySelector('.modal').classList.add('none')
    },
    setProduct(item){
      const newItem = {...item, counter: 1};
      this.$store.dispatch("addToProductCard", newItem)
    },
  },
  mounted(){
      this.$store.dispatch("getData");
          
  },
   computed: mapState(["data", "productCard", "basketValue"])
}
</script>
<style scoped lang="scss" >
  .nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2894ca;
    box-shadow: 0 0 16px 5px #294c94;
    padding-bottom: 5px;
    position: relative;
    img{
      width: 60px;
      padding: 15px 0 0 15px;
    }
  }
  .shop{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
    .card{
      width: 200px;
      margin: 10px;
      position: relative;
      white-space: nowrap;
      img{
        max-width: 200px;
        &:hover + button{
          opacity: 1;
        }
      }
      button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -100% );
        opacity: 0;
        cursor: pointer;
        padding: 10px 20px;
        background-color: black;
        border:none;
        color: white;
        &:hover{
          opacity: 1;
          background-color: #b1b1b1;
          color: black;
        }
      }
      p{
        margin: 0;
        text-align: left;
        padding-left: 3px;
        font-weight: bold;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      a{
        text-decoration: none;
        color: #1515d3;
      }
    }
  }
  .appTitle{
    padding-top: 100px;
    margin: 0;
  }
  .basketLink{
    position: absolute;
    top: 0;
    right: 15px;
    &::before{
      content: "basket";
      position: absolute;
      font-size: 10px;
      color: white;
      top: 25px;
      right: 9px;
    }
  }

  @media(min-width: 320px)and(max-width: 768px){
    .shop{
      #buyNow{
        display: none;
      }
      .modal{
        height: 100%;
        .modalBody{
          width: 88vw;
          padding: 15px;
        }
      }
    }
  }
  
</style>

