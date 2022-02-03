function start(){
  n = localStorage.getItem("name")
  if(n!=null){
    caps_name = n.toUpperCase();
    document.getElementById('user').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    document.getElementById('name').innerHTML = caps_name+'&nbsp <i class="fas fa-caret-down"></i>';
  }
  else{
    document.getElementById('user').style.display = 'none';
    document.getElementById('login').style.display = 'block';
  }
}
var c = 0;
function drop(){
  if(c==0){
    c=1;
    document.getElementById('drop').style.zIndex = 1;
  }
  else{
    c=0;
    document.getElementById('drop').style.zIndex = -1;
  }
}
function logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  Swal.fire({
    title: 'You are Successfully logged Out!',
    html: 'Redirecting to Home page.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
    }).then((result) => {
    location.href="./index.html"
    });
}
products = [];
electronics=[];
slider_array =[];
slider =[];
var page_number = 0;
page_size = 9;
function next() {
  page_number+=1;
  pagination()
}
function prev(){
  page_number-=1;
  pagination()
}
function pagination(){
 selected_products = products.slice(page_number * page_size, page_number * page_size + page_size);
 if(page_number==0){
  document.getElementById("prev").style.backgroundColor = "transparent";
  document.getElementById("prev").style.zIndex = "-1";
  document.getElementById("prev").innerHTML="";
  }
  else{
    document.getElementById("prev").style.backgroundColor = "#292560";
    document.getElementById("prev").style.zIndex = "0";
    document.getElementById("prev").innerHTML="<i class='fas fa-arrow-left'></i> Previous";
  }
  if(((products.length-(page_number*page_size)))<=9){
    document.getElementById("next").style.backgroundColor = "transparent";
    document.getElementById("next").style.zIndex = "-1";
    document.getElementById("next").innerHTML="";
  }
  else{
    document.getElementById("next").style.backgroundColor = "#292560";
    document.getElementById("next").style.zIndex = "0";
      document.getElementById("next").innerHTML="Next <i class='fas fa-arrow-right'></i>";
  }
  if(products.length<page_number*page_size+page_size){
    document.getElementById("total").innerHTML = page_number*page_size+page_size
  }
  else{
    document.getElementById("total").innerHTML = products.length;
  }
  document.getElementById("a").innerHTML = page_number*page_size +1;
  document.getElementById("b").innerHTML = page_number*page_size+page_size;
  for (let i = 0; i <= 8; i++) {
    var src = selected_products[i].product_img;
    var name = selected_products[i].product_name;
    nameShort = name.slice(0, 25).concat("...");
    var price = selected_products[i].product_price;
    var pricem = (1.2 * price).toFixed(2);
    document.getElementById("img" + i).src = src;
    document.getElementById("name" + i).innerHTML = nameShort;
    document.getElementById("price" + i).innerHTML = "₹" + price;
    document.getElementById("pricem" + i).innerHTML = "₹" + pricem;
  }
};
function pagination_s(array){
  n = Math.floor(Math.random()*162);
  selected_products = array.slice(n,n+19);
  for (let i = 0; i < 19; i++) {
    var src = selected_products[i].product_img;
    var name = selected_products[i].product_name;
    var price = selected_products[i].product_price;
    nameShort = name.slice(0, 15).concat("...");
    document.getElementById("imgs" + i).src = src;
    document.getElementById("texts" + i).innerHTML = nameShort;
    document.getElementById("prices" + i).innerHTML = "₹" + price;
  }
}
function view_products(){
  page_number = 0;
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/view_all_products";
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          var json = JSON.parse(this.responseText);
          slider_array = json.AllProducts;
          slider = slider_array.sort((a,b) => 0.5-Math.random());
          pagination_s(slider);
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.send();
}
function view_electronics(){
  page_number = 0;
  var electronics = {
    "category" : ["Headphone","Tablet","SmartWatch","Power Bank","Laptop","EarPhones","Game Zone","Phone","computer","Phone Cover"]
  }
  var data = JSON.stringify(electronics);
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/view_by_categories";
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          var json = JSON.parse(this.responseText);
          electronics = json.AllProducts;
          products=electronics.sort((a,b)=>0.5-Math.random());
          pagination();
      }
  }
  http.open('post',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.send(data);
}
document.getElementById("switch_category").onchange = function(){
  var switch_category = document.getElementById("switch_category");
  var category_index =switch_category.options.selectedIndex;
  var category = switch_category.options[category_index].value;
  switch_categories(category);
}
function switch_categories(category){
  page_number = 0;
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/view_by_category?category="+category;
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          var json = JSON.parse(this.responseText);
          electronics = json.AllProducts;
          products=electronics.sort((a,b)=>0.5-Math.random());
          pagination();
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send();
}
function view_by_name(){
  page_number = 0;
  product_name = document.querySelector("#product_name").value;
  var electronics = {
    "name": product_name,
    "categories" : ["Headphone","Tablet","SmartWatch","Power Bank","Laptop","EarPhones","Game Zone","Phone","computer","Phone Cover"]
  }
  var data = JSON.stringify(electronics);
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/view_by_name_categories";
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          var json = JSON.parse(this.responseText);
          electronics = json.AllProducts;
          products=electronics.sort((a,b)=>0.5-Math.random());
          pagination();
      }
  }
  http.open('post',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send(data);
}
function go_to_login(){
  let timerInterval
  Swal.fire({
    title: 'You are not logged In!',
    html: 'Redirecting to login page.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    location.href="login.html"
  })
}
function send_news() {
  email = document.querySelector("#email_news").value;
    if(email){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      var http = new XMLHttpRequest();
      page_number = 0;
      obj = {
        email:email
      }
      var data = JSON.stringify(obj);
      var url = "https://electronics-mart-api.herokuapp.com/news_letter";
      http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          var json = JSON.parse(this.responseText);
          Swal.fire({
            icon: 'success',
            title: 'Successful!',
            text: "News Letter Service Activated..."
          })
        }
      }
      http.open('post',url,true);
      http.setRequestHeader("Authorization",localStorage.getItem("token"));
      http.setRequestHeader('Content-Type','application/json');
      http.send(data);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Invalid Email..."
      })
    }
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "No Email found..."
    })
  }
}
function get_by_rating(rating){
  page_number = 0;
  product_name = document.querySelector("#product_name").value;
  var electronics = {
    "name": product_name,
    "categories" : ["Headphone","Tablet","SmartWatch","Power Bank","Laptop","EarPhones","Game Zone","Phone","computer","Phone Cover"]
  }
  var data = JSON.stringify(electronics);
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/view_by_name_categories?rating="+rating;
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          var json = JSON.parse(this.responseText);
          electronics = json.AllProducts;
          products=electronics.sort((a,b)=>0.5-Math.random());
          pagination();
      }
  }
  http.open('post',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send(data);
}
function get_by_price(gt,lt){
  page_number = 0;
  var electronics = {
    "name": product_name,
    "categories" : ["Headphone","Tablet","SmartWatch","Power Bank","Laptop","EarPhones","Game Zone","Phone","computer","Phone Cover"]
  }
  var data = JSON.stringify(electronics);
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/view_by_price_categories?gt="+gt+"&lt="+lt;
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          var json = JSON.parse(this.responseText);
          electronics = json.AllProducts;
          products=electronics.sort((a,b)=>0.5-Math.random());
          pagination();
      }
  }
  http.open('post',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send(data);
}
function Cover_screen(){
  category = "phone cover";
  switch_categories(category);
}
function power_bank(){
  category = "power bank";
  switch_categories(category);
}
function tablet(){
  category = "tablet";
  switch_categories(category);
}
function headphone_earphone(){
  category = "headphone";
  switch_categories(category);
}
function smart_home(){
  category = "smart home";
  switch_categories(category);
}
function laptop(){
  category = "laptop";
  switch_categories(category);
}
function computer_accessories(){
  category = "computer";
  switch_categories(category);
}
function game_zone(){
  category = "game";
  switch_categories(category);
}
function watch(){
  category = "watch";
  switch_categories(category);
}
function television(){
  category = "television";
  switch_categories(category);
}
function speaker(){
  category = "speaker";
  switch_categories(category);
}
function camera(){
  category = "camera";
  switch_categories(category);
}
function game(){
  category = "console";
  switch_categories(category);
}
function AC(){
  category = "AC";
  switch_categories(category);
}
function heater(){
  category = "heater";
  switch_categories(category);
}
function refrigerator(){
  category = "refrigerator";
  switch_categories(category);
}
function washing_machine(){
  category = "washing machine";
  switch_categories(category);
}
function cricket(){
  category = "cricket";
  switch_categories(category);
}
function badminton(){
  category = "badminton";
  switch_categories(category);
}
function cycling(){
  category = "cycling";
  switch_categories(category);
}
function football(){
  category = "football";
  switch_categories(category);
}
function gym(){
  category = "gym";
  switch_categories(category);
}
function shoes(){
  category = "shoes";
  switch_categories(category);
}
function sports(){
  category = "sports";
  switch_categories(category);
}
function phone(){
  category = "phone";
  switch_categories(category);
}
function star5(){
  get_by_rating(5);
}
function star4_5(){
  get_by_rating(4.5);
}
function star4(){
  get_by_rating(4);
}
function star3_5(){
  get_by_rating(3.5);
}
function star3(){
  get_by_rating(3);
}
function less_5k(){
  get_by_price(0,5000)
}
function less_10k(){
  get_by_price(5000,10000)
}
function less_20k(){
  get_by_price(10000,20000)
}
function less_35k(){
  get_by_price(20000,35000)
}
function less_50k(){
  get_by_price(35000,50000)
}
function more_50k(){
  get_by_price(50000,999999)
}
function view_product0(){
  localStorage.setItem("p_id",selected_products[0].product_id)
  quick_view();
}
function view_product1(){
  localStorage.setItem("p_id",selected_products[1].product_id)
  quick_view();
}
function view_product2(){
  localStorage.setItem("p_id",selected_products[2].product_id)
  quick_view();
}
function view_product3(){
  localStorage.setItem("p_id",selected_products[3].product_id)
  quick_view();
}
function view_product4(){
  localStorage.setItem("p_id",selected_products[4].product_id)
  quick_view();
}
function view_product5(){
  localStorage.setItem("p_id",selected_products[5].product_id)
  quick_view();
}
function view_product6(){
  localStorage.setItem("p_id",selected_products[6].product_id)
  quick_view();
}
function view_product7(){
  localStorage.setItem("p_id",selected_products[7].product_id)
  quick_view();
}
function view_product8(){
  localStorage.setItem("p_id",selected_products[8].product_id)
  quick_view();
}
function view_products0(){
  localStorage.setItem("p_id",selected_products[0].product_id)
  quick_view();
}
function view_products1(){
  localStorage.setItem("p_id",selected_products[1].product_id)
  quick_view();
}
function view_products2(){
  localStorage.setItem("p_id",selected_products[2].product_id)
  quick_view();
}
function view_products3(){
  localStorage.setItem("p_id",selected_products[3].product_id)
  quick_view();
}
function view_products4(){
  localStorage.setItem("p_id",selected_products[4].product_id)
  quick_view();
}
function view_products5(){
  localStorage.setItem("p_id",selected_products[5].product_id)
  quick_view();
}
function view_products6(){
  localStorage.setItem("p_id",selected_products[6].product_id)
  quick_view();
}
function view_products7(){
  localStorage.setItem("p_id",selected_products[7].product_id)
  quick_view();
}
function view_products8(){
  localStorage.setItem("p_id",selected_products[8].product_id)
  quick_view();
}
function view_products9(){
  localStorage.setItem("p_id",selected_products[8].product_id)
  quick_view();
}
function quick_view(){
  location.href="_files/product_detail.html"
}
start();
view_products();
view_electronics();