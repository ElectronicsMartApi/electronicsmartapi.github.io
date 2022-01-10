products = [];
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
 console.log(page_number)
 if(page_number==0){
  document.getElementById("prev").style.backgroundColor = "transparent";
  }
  else{
    document.getElementById("prev").style.backgroundColor = "#292560";
  }
if(((products.length-(page_number*page_size)))<=9){
  console.log(products.length-(page_number*page_size))
  document.getElementById("next").style.backgroundColor = "transparent";
}
else{
  document.getElementById("next").style.backgroundColor = "#292560";
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
  nameShort = name.slice(0, 35).concat("...");
  var price = selected_products[i].product_price;
  var pricem = (1.2 * price).toFixed(2);
  document.getElementById("img" + i).src = src;
  document.getElementById("name" + i).innerHTML = nameShort;
  document.getElementById("price" + i).innerHTML = "₹" + price;
  document.getElementById("pricem" + i).innerHTML = "₹" + pricem;
}
};
function pagination_s(array){
  n = Math.floor(Math.random()*19);
  selected_products = array.slice((page_number+n)* page_size+1, (page_number+n) * (page_size + page_size+1));
  console.log(selected_products)
  for (let i = 0; i <= 9; i++) {
    var src = selected_products[i].product_img;
    var name = selected_products[i].product_name;
    var price = selected_products[i].product_price;
    nameShort = name.slice(0, 20).concat("...");
    document.getElementById("imgs" + i).src = src;
    document.getElementById("texts" + i).innerHTML = nameShort;
    document.getElementById("prices" + i).innerHTML = "₹" + price;
  }
}
function view_products(){
  page_number = 0;
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/view";
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          console.log("yes")
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
          products = json.AllProducts;
          console.log(products);
          pagination();
          pagination_s(json.AllProducts)
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.send();
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
  var url = "https://electronics-mart-api.herokuapp.com/viewByCategory?category="+category;
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          console.log("yes")
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
          products = json.AllProducts;
          console.log(products);
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
  console.log(product_name);
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/viewByName?name="+product_name;
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          console.log("yes")
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
          products = json.AllProducts;
          console.log(products);
          pagination();
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send();
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
    location.href="./Html_files/login.html"
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
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
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
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/viewbyrating?rating="+rating;
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          console.log("yes")
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
          products = json.AllProducts;
          console.log(products);
          pagination();
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send();
}
function get_by_price(gt,lt){
  page_number = 0;
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/viewByPrice?gt="+gt+"&lt="+lt;
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          console.log("yes")
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
          products = json.AllProducts;
          console.log(products);
          pagination();
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send();
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
  location.href="./Html_files/product_detail.html"
}
view_products();