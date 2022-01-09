function view_my_cart(){
    var http = new XMLHttpRequest();
    var url = "https://electronics-mart-api.herokuapp.com/viewmycart";
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            console.log("yes")
            console.log(http.responseText);
            var json = JSON.parse(this.responseText);
            console.log(json.message);
            cart = json.cart;
            console.log(cart);
        }
    }
    http.open('get',url,true);
    http.setRequestHeader('Content-Type','application/json');
    http.setRequestHeader("Authorization",localStorage.getItem("token"));
    http.send();
  }
  view_my_cart();