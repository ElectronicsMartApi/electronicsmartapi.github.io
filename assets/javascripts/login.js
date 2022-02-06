c=0;
function login() {
	if(c!=3){
		console.log(c)
		var http = new XMLHttpRequest();
		email = document.querySelector("#email").value;
		pwd = document.querySelector("#pwd").value;
		if(email){
			if(pwd){
				var details = {
					"email" :email ,
					"pwd" : pwd
				};
				var data = JSON.stringify(details);
				var url = "https://electronics-mart-api.herokuapp.com/login";
				http.onreadystatechange = function() {
					if(http.readyState == 4 && http.status == 200) {
						var json = JSON.parse(this.responseText);
						localStorage.setItem("token",json.token);
						localStorage.setItem("name",json.name);
						Swal.fire({
							title: 'You are Successfully logged In!',
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
					if(http.readyState == 4 && http.status==404){
						c++;
						Swal.fire({
							icon: 'warning',
							title: 'Oops...',
							text: 'Invalid Email or Password...',
						});
					}
					if(http.readyState == 4 && http.status==201){
						c++;
						Swal.fire({
							icon: 'warning',
							title: 'Oops...',
							text: 'You have entered an Old password...',
						});
					}
					if(http.readyState == 4 && http.status==500){
						Swal.fire({
							icon: 'warning',
							title: 'Oops...',
							text: 'Oops Something went wrong...',
						});
					}
				}
				http.open('post',url,true);
				http.setRequestHeader('Content-Type','application/json');
				http.send(data);
			}
			else{
				Swal.fire({
					icon: 'warning',
					title: 'Oops...',
					text: 'No Password found...',
				});
			}
		}
		else{
			Swal.fire({
				icon: 'warning',
				title: 'Oops...',
				text: 'No Email found...',
			});
		}
	}
	if(c==3){
		console.log(c);
		Swal.fire({
			icon: 'warning',
			title: 'You have entered wrong email or password multiple times!',
			html: 'Redirecting to Home page, Try again later..',
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
	c=0;
	}
}
function register(){
	location.href = "register.html";
}