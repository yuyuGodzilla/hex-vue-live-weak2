const app = Vue.createApp({
    data(){
        return {
            baseUrl: "https://vue3-course-api.hexschool.io/v2",
            username:"",
            password:"",
        }
    },
    methods:{
        login(){
            axios.post(`${this.baseUrl}/admin/signin`,{
                "username": this.username,
                "password": this.password,
            })
            .then(res=>{
                console.log(res);
                const {token, expired} =res.data;

                //存放token到cookie
                document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;

                document.location.href = "./product.html";
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
})

app.mount("#app");