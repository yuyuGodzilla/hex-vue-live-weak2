const app = Vue.createApp({
    data(){
      return {
        baseUrl: "https://vue3-course-api.hexschool.io/v2",
        apiPath: "giganoto",
        products:[],
        selectedProduct:{},
      }
    },
    methods:{
      checkLoginStatus(){
        axios.post(`${this.baseUrl}/api/user/check`)
          .then(res=>{
            console.log(res);
            alert(`狀態是否為登入 => ${res.data.success}`)
          })
          .catch(err=>{
            console.log(err);
          })
      },
      logout(){
        axios.post(`${this.baseUrl}/logout`)
          .then(res=>{
            if(res.status==200){
              //清掉token cookie
              document.cookie = `hexToken=; expires=${new Date(1980,3)};`;
              //登出後導向到登入頁面
              document.location.href="./index.html";

            }else{
              alert("登出失敗");
            }
          })
          .catch(err=>{
            console.log(err);
          })
      },

      selectProduct(product){
        // console.log(product)
        this.selectedProduct = product;
      },
      getProductData(){
        axios.get(`${this.baseUrl}/api/${this.apiPath}/admin/products/all`)
          .then(res=>{
            console.log(res);
            this.products=res.data.products;
            console.log(Object.keys(this.products).length);
          })
          .catch(err=>{
            console.log(err);
          })
      }
    },
    created(){
      // this.products = products;
      this.getProductData()
    }
});

let hexToken = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

// if(hexToken==""){
//   document.location.href = "./index.html";
// }

//設定axios header
axios.defaults.headers.common['Authorization'] = hexToken;

app.mount("#app");