class BaseThesaurus extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '', source: 'sourceStandard', type: 'synonyms' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSourceChange = this.handleSourceChange.bind(this);
	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}
	handleSubmit(event) {
		event.preventDefault();
		//console.log("doc is " + document.getElementById('thesinput').value);
		this.state.value = document.getElementById('thesinput').value;
		var TYPE = document.getElementById("sel1").value.toLowerCase();
		var url = 'https://wordsapiv1.p.mashape.com/words/' + this.state.value + '/' + TYPE;
		//console.log("state is " + this.state.value);						
		if (this.state.source === "sourceStandard") {
			//alert('synonms for: ' + this.state.value + '\nFunctionality not implemented');
			var REG = document.getElementById("returnReg");
			REG.innerHTML = "";
			//REG.append('<li>An element</li>');
			//console.log(url);
			$.ajax({
				url: url,
				type: "GET",
				headers: {
					"X-Mashape-Key": "eWPyp4Sb8PmshOFdZAJKFbiI20NOp1oLR32jsnYjBkLwt5qmJg",
					"X-Mashape-Host": "wordsapiv1.p.mashape.com"
				},
				success: function (data) {
					//alert("success")
					//console.log(data)
					//console.log(TYPE)
					//console.log(data.antonyms)	
					//console.log(data.antonyms.length)														
					if (TYPE == "synonyms") {
						//console.log("a")
						var arrayLength = data.synonyms.length;
					} else {
						//console.log("b")
						var arrayLength = data.antonyms.length;
					}
					if (arrayLength == 0) {
						REG.append("There are no results for this search");
					}
					for (var i = 0; i < arrayLength; i++) {
						var li = document.createElement("li");
						var lia = document.createElement("a");
						if (TYPE == "synonyms") {
							lia.appendChild(document.createTextNode(data.synonyms[i]));
							lia.value = data.synonyms[i];
						} else {
							lia.appendChild(document.createTextNode(data.antonyms[i]));
							lia.value = data.antonyms[i];
						}
						lia.setAttribute("href", "#"); // added line
						lia.setAttribute("onClick", "{document.getElementById('thesinput').value = this.value}"); // added line						
						li.appendChild(lia);
						REG.appendChild(li);
					}
				}, error: function (xhr, ajaxOptions, thrownError) {
					alert(xhr.status);
					alert(thrownError);
				}
			});
		}
		else {
			var REG = document.getElementById("returnReg");
			REG.innerHTML = "";
			$.ajax({
				//url: 'https://tsm-custom-thesaurus.herokuapp.com/words/' + this.state.value + '/' + TYPE,
				url: 'https://tsm-custom-thesaurus.herokuapp.com/words/' + this.state.value + '/' + TYPE,

				type: "GET",
				async: false,
				success: function (data) {
					console.log(data);
					if (data.definition == null) {
						console.log("null data");
						
						$.ajax({
							url: url,
							type: "GET",
							async: false,
							headers: {
								"X-Mashape-Key": "eWPyp4Sb8PmshOFdZAJKFbiI20NOp1oLR32jsnYjBkLwt5qmJg",
								"X-Mashape-Host": "wordsapiv1.p.mashape.com"
							},
							success: function (data2) {
								if (TYPE == "synonyms") {
									var arrayLength = data2.synonyms.length;
								} else {
									var arrayLength = data2.antonyms.length;
								}
								if (arrayLength == 0) {
									REG.append("There are no results for this search");
								}
								for (var i = 0; i < arrayLength; i++) {
									var li = document.createElement("li");
									var lia = document.createElement("a");
									if (TYPE == "synonyms") {
										lia.appendChild(document.createTextNode(data2.synonyms[i]));
										lia.value = data2.synonyms[i];
									} else {
										lia.appendChild(document.createTextNode(data2.antonyms[i]));
										lia.value = data2.antonyms[i];
									}
									lia.setAttribute("href", "#"); // added line
									lia.setAttribute("onClick", "{document.getElementById('thesinput').value = this.value}"); // added line						
									li.appendChild(lia);
									REG.appendChild(li);
								}
							}, error: function (xhr, ajaxOptions, thrownError) {
								alert(xhr.status);
								alert(thrownError);
							}
						});
					} else {
						var arrayLength = data.definition.length;
						if (arrayLength == 0) {
							REG.append("There are no results for this search");
						}
						for (var i = 0; i < arrayLength; i++) {
							var li = document.createElement("li");
							var lia = document.createElement("a");
							lia.appendChild(document.createTextNode(data.definition[i]));
							lia.value = data.definition[i];
							lia.setAttribute("href", "#"); // added line
							lia.setAttribute("onClick", "{document.getElementById('thesinput').value = this.value}"); // added line						
							li.appendChild(lia);
							REG.appendChild(li);
						}
					}
					console.log(data);
				}
				, error: function (xhr, ajaxOptions, thrownError) {

				}
			});
			//alert(TYPE + ' for: ' + this.state.value + ' from custom thesaurus\n Functionality not implemented');
		}
	}
	handleSourceChange(event) {
		this.setState({ source: event.target.value });
	}
	render() {
		return (
			<div className="bt">
				<h3>Thesaurus</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
						Word:
		        		<input type="text" id="thesinput" className="form-control" value={this.state.value} onChange={this.handleChange} />
					</label>
					<div className="radio">
						<label className="radio-inline">
							<input type="radio" value="sourceStandard"
								checked={this.state.source === "sourceStandard"}
								onChange={this.handleSourceChange} />

							Standard Thesaurus
		        		</label>
						<label className="radio-inline">
							<input type="radio" value="sourceCustom"
								checked={this.state.source === "sourceCustom"}
								onChange={this.handleSourceChange} />
							Custom Thesaurus
		        		</label>
					</div>
					<label>
						<div className="form-group">
							<select className="form-control" id="sel1">
								<option>Synonyms</option>
								<option>Antonyms</option>
							</select>
						</div>
					</label>
					<input className="btn btn-primary" type="submit" value="Search" />
				</form>

				<ul id="returnReg" className="nav nav-pills">
				</ul>
			</div>
		);
	}
}

class AddCThesaurus extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '', value2: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}
	handleChange2(event) {
		this.setState({ value2: event.target.value });
	}
	handleSubmit(event) {
		event.preventDefault();
		var TYPE = document.getElementById("sel2").value.toLowerCase();
		var ACTION = document.getElementById("sel3").value;
		var newDefinition = new Array();
		var wordvar = "";
		var url = 'https://wordsapiv1.p.mashape.com/words/' + this.state.value + '/' + TYPE;
		
		$.ajax({
			url: 'https://tsm-custom-thesaurus.herokuapp.com/words/' + this.state.value + '/' + TYPE,
			type: "GET",
			async: false,
			success: function (data) {
				console.log(data);
				if (data.definition == null) {
					$.ajax({
						url: url,
						type: "GET",
						async: false,
						headers: {
							"X-Mashape-Key": "eWPyp4Sb8PmshOFdZAJKFbiI20NOp1oLR32jsnYjBkLwt5qmJg",
							"X-Mashape-Host": "wordsapiv1.p.mashape.com"
						},
						success: function (data) {
							if (TYPE == "synonyms") {
								var arrayLength = data.synonyms.length;
							} else {
								var arrayLength = data.antonyms.length;
							}
							// if (TYPE == "synonyms") {
							// 		newDefinition = data.synonyms;
							// }
							// else {
							// 		newDefinition = data.antonyms;
							// }
							for (var i = 0; i < arrayLength; i++) {
								if (TYPE == "synonyms") {
									newDefinition[i] = data.synonyms[i];
								} else {
									newDefinition[i] = data.antonyms[i];
								}
							}
							console.log(newDefinition);
							wordvar = data.word;
							console.log(wordvar);

							
						}, error: function (xhr, ajaxOptions, thrownError) {
							alert(xhr.status);
							alert(thrownError);
						}
					});
					$.ajax({
						url: 'https://tsm-custom-thesaurus.herokuapp.com/words',
						type: "POST",
						async: false,
						headers: {contentType: "application/json"},
						data: {
							"word": wordvar,
							"type": TYPE,
							"definition": newDefinition
						},
						success: function (data) {
							console.log(data);
							console.log("added new entry");
						}
						, error: function (xhr, ajaxOptions, thrownError) {
							alert(xhr.status);
							alert(thrownError);
						}
					});
				} else {
					newDefinition = data.definition;
				}
			}
			, error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}
		});
		var EXIST = false;
		for (var i = 0; i < newDefinition.length; i++) {
			if (newDefinition[i] == this.state.value2) {
				EXIST = true;
			}
		}
		console.log(newDefinition);
		console.log(EXIST);
		if (ACTION == "Add") {
			if (EXIST == true) {
				alert("Definition already exists!")
			} else {
				
				console.log(newDefinition);
				console.log("{'definition:' " + newDefinition +"}");
				//var obj = JSON.parse("{definition: " + newDefinition +"}");
				//console.log(obj);
				$.ajax({
					url: 'https://tsm-custom-thesaurus.herokuapp.com/words/' + this.state.value + '/' + TYPE,
					type: "PUT",
					async: false,
					headers: {contentType: "application/json"},
					data: {"definition": newDefinition.concat([this.state.value2])},
					success: function (data) {
						console.log(data);
					}
					, error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.status);
						alert(thrownError);
					}
				});
			}
		}
		if (ACTION == "Remove") {
			if (this.state.value2 == '') {
				$.ajax({
					url: 'https://tsm-custom-thesaurus.herokuapp.com/words/' + this.state.value,
					type: "DELETE",
					async: false,
					success: function (data) {
						console.log("Delete success!");
					}
					, error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.status);
						alert(thrownError);
					}
				});
			}
			else if (EXIST == false) {
				alert("Definition doesn't exist!")
			} else {
				console.log("else lmao");
				console.log(newDefinition.indexOf(this.state.value2));
				newDefinition.splice(newDefinition.indexOf(this.state.value2), 1);
				$.ajax({
					url: 'https://tsm-custom-thesaurus.herokuapp.com/words/' + this.state.value + '/' + TYPE,
					type: "PUT",
					async: false,
					data: {
						"definition": newDefinition
					},
					success: function (data) {
						console.log(data);
					}
					, error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.status);
						alert(thrownError);
					}
				});
			}
		}
		alert(ACTION + ': ' + this.state.value2 + '\n' + TYPE + ' of: ' + this.state.value + '\nFunctionality not implemented');
	}
	render() {
		//var TYPE = document.getElementById("sel2").value;		
		//var ACTION = document.getElementById("sel3").value;		
		return (
			<div className="bt">
				<h3>Edit Custom Thesaurus</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
						<label id="cuslab1">Word:</label>
						<input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
					</label>
					<label>
						<label id="cuslab2">Synonym/Antonym:</label>
						<input type="text" className="form-control" value={this.state.value2} onChange={this.handleChange2} />
					</label>
					<br />
					<label>
						<div className="form-group">
							<select className="form-control" id="sel2">
								<option>Synonyms</option>
								<option>Antonyms</option>
							</select>
						</div>
					</label>
					<label>
						<div className="form-group">
							<select className="form-control" id="sel3">
								<option>Add</option>
								<option>Remove</option>
							</select>
						</div>
					</label>
					<br />

					<input className="btn btn-primary" type="submit" value="Submit" />
				</form>
				<ul className="dicResList">
				</ul>
			</div>
		);
	}
}

class WelcomePage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h1 className="cover-heading">Welcome to TSM Custom Thesaurus.</h1>
				<p className="lead">TSM Custom Thesaurus is a personalized, customizable thesaurus that builds upon the thesaurus from WordsAPI.</p>
				<div className="lead">
					<a data-toggle="modal" data-target="#myModal" className="btn btn-lg btn-default">How does it work?</a>
					<div className="modal fade" id="myModal" role="dialog">
						<div className="modal-dialog">
							<div className="modal-content" id="myModalin">
								<script>document.getElementById("myModalin").style = 'background: #333;'</script>
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal">&times;</button>
									<h4 className="modal-title">How does it work?</h4>
								</div>
								<div className="modal-body">
									<p>Use the navigation bar at the top right corner to navigate to different features of our web application.</p>


									<p>The Edit Custom Thesaurus tab to allows users to add or remove their own synonyms or antonym for a word.</p>

									<p>To remove the entire word from the custom thesaurus, type in the word and leave the Synonyms/Antonyms field blank.</p>

									<p>The Use Thesaurus tab allows the user to find synonyms and antonyms based on the thesaurus provided by wordAPI or their own custom thesaurus based on the radio buttons.
										Simply input a word in the textbox, select from Standard or Custom Thesaurus to look up from and select Synonym or Antonym from the dropdown list and press search.
									</p>

									<p>The user may also press on one of the result and the content of the search box will be replaced by the result that the user clicked on.</p>

									<p>To change password, click your username at the top left corner of the page after logging in.</p>

									<p>Use logout button to return to the login page.</p>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

class BaseFunction extends React.Component {
	constructor(props) {
		super(props);
		this.state = { job: 0 };
		this.handleHClick = this.handleHClick.bind(this);
		this.handleRgClick = this.handleRgClick.bind(this);
		this.handleCClick = this.handleCClick.bind(this);
		this.logout = props.logout.bind(this);
		this.changePassword = this.changePassword.bind(this);
	}
	handleHClick() {
		this.setState({ job: 0 });
		var NAME = document.getElementById("home");
		NAME.className = "active";
		var CUS = document.getElementById("cus");
		CUS.classList.remove("active");
		var THES = document.getElementById("thes");
		THES.classList.remove("active");
		//console.log('Home');
	}
	handleRgClick() {
		this.setState({ job: 1 });
		var NAME = document.getElementById("thes");
		NAME.className = "active";
		var HOME = document.getElementById("home");
		HOME.classList.remove("active");
		var CUS = document.getElementById("cus");
		CUS.classList.remove("active");
		//console.log('Reg');
	}
	handleCClick() {
		this.setState({ job: 2 });
		var NAME = document.getElementById("cus");
		NAME.className = "active";
		var HOME = document.getElementById("home");
		HOME.classList.remove("active");
		var THES = document.getElementById("thes");
		THES.classList.remove("active");
		//console.log('Cust');
	}
	changePassword() {
		console.log(document.getElementById("newpass").value);
		if (document.getElementById("newpass").value === document.getElementById("newpassconf").value) {
			//console.log(document.getElementById("newpassconf").value);
			$.ajax({
				url: 'https://tsm-custom-thesaurus.herokuapp.com/changepassword',
				type: "PUT",
				async: false,
				data: { password: document.getElementById("newpass").value },
				success: function (data) {
					console.log(data);
					alert("Password updated successfully!");
				}
				, error: function (xhr, ajaxOptions, thrownError) {
					alert("Failed to change password!");
					alert(xhr.status);
					alert(thrownError);
				}
			});
		}
		else {
			alert("Passwords don't match!");
		}
	}
	componentDidMount() {
		var result = '';
		$.ajax({
			url: 'https://tsm-custom-thesaurus.herokuapp.com/welcome',
			type: "GET",
			async: false,
			success: function (data) {
				console.log(data);
				result = data;
			}
			, error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}
		});
		console.log(result);
		document.getElementById("username").innerHTML = "TSM Custom Thesaurus <br/> Logged in as: " + result;
	}
	render() {
		const job = this.state.job;
		let page = null;
		if (job == 0) {
			page = <WelcomePage />;
		}
		else if (job == 1) {
			page = <BaseThesaurus />;
		}
		else if (job == 2) {
			page = <AddCThesaurus />;

		} else {
			//log out function here
			page = <Login />;
		}
		return (
			<div className="site-wrapper">
				<div className="site-wrapper-inner">

					<div className="container">

						<div className="masthead clearfix">
							<div className="container inner">
								<h3 className="masthead-brand" ><a href="#" id="username" data-toggle="modal" data-target="#passChange">TSM Custom Thesaurus</a></h3>

								<nav>
									<ul className="nav masthead-nav">
										<li id="home" className="active"><a href="#" onClick={this.handleHClick}>Home</a></li>
										<li id="cus"><a href="#" onClick={this.handleCClick}>Edit Custom Thesaurus</a></li>
										<li id="thes"><a href="#" onClick={this.handleRgClick}>Use Thesaurus</a></li>
										<li id="thes"><a href="#" onClick={this.logout}>Logout</a></li>
									</ul>
								</nav>
							</div>
						</div>

						<div className="inner cover">
							{page}
						</div>

					</div>

				</div>
				<div className="modal fade" id="passChange" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content" id="passChangein">
							<script>document.getElementById("passChangein").style = 'background: #333;'</script>
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title">Change Password</h4>
							</div>
							<div className="modal-body">
								<form className="form-signin" onSubmit={this.changePassword}>
									<h2 className="form-signin-heading">Type new password here</h2>
									<input type="password" id="newpass" className="form-control" name="newpassword" placeholder="New Password" required="" autoFocus="" />
									<input type="password" id="newpassconf" className="form-control" name="confirmpassword" placeholder="Confirm New Password" required="" />
									<input className="btn btn-lg btn-primary btn-block" type="button" onClick={this.changePassword} value="Submit" />
								</form>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}

}

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { login: false, f2: props.f2 };

		this.register = props.register.bind(this);

		this.login = props.login.bind(this);
		this.handleChange = props.change1.bind(this);
		this.handleChange2 = props.change2.bind(this);
		this.getf1 = props.f1.bind(this);
		this.getf2 = props.f2.bind(this);


	}
	render() {
		return (

			<div className="wrapper">
				<form className="form-signin" onSubmit={this.login}>
					<h2 className="form-signin-heading">Please login</h2>
					<input type="text" className="form-control" name="username" placeholder="Email Address" required="" autoFocus="" value={this.getf1()} onChange={this.handleChange} />
					<input type="password" className="form-control" name="password" placeholder="Password" required="" value={this.getf2()} onChange={this.handleChange2} />
					<input className="btn btn-lg btn-primary btn-block" type="button" onClick={this.login} value="Submit" />
					<a onClick={this.register} className="btn btn-default">Register new account</a>
				</form>
			</div>
		);
	}

}

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = { register: false, f1: '', f2: '' };

		this.registerfinish = props.registerfinish.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);


	}
	handleChange(event) {
		this.setState({ f1: event.target.value });
	}
	handleChange2(event) {
		this.setState({ f2: event.target.value });
	}
	getf1() {
		return (this.state.f1);
	}
	getf2() {
		return (this.state.f2);
	}
	render() {
		return (

			<div className="wrapper">
				<form className="form-signin" onSubmit={this.registerfinish}>
					<h2 className="form-signin-heading">Register a new account</h2>
					<input type="text" className="form-control" name="username" placeholder="Email Address" required="" autoFocus="" value={this.getf1()} onChange={this.handleChange} />
					<input type="password" className="form-control" name="password" placeholder="Password" required="" value={this.getf2()} onChange={this.handleChange2} />
					<input className="btn btn-lg btn-primary btn-block" type="button" onClick={this.registerfinish} value="Submit" />
				</form>
			</div>
		);
	}

}

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { login: false, register: false, f1: '', f2: '' };

		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.loginsucc = this.loginsucc.bind(this);
		this.render = this.render.bind(this);
	}
	handleChange(event) {
		this.setState({ f1: event.target.value });
	}
	handleChange2(event) {
		this.setState({ f2: event.target.value });
	}
	loginsucc() {
		this.setState({ login: true });
	}
	login() {
		var result = "";
		$.ajax({
			url: 'https://tsm-custom-thesaurus.herokuapp.com/login',
			type: "POST",
			async: false,
			data: {
				"username": this.state.f1,
				"password": this.state.f2
			},
			success: function (data) {
				console.log(data);
				result = "true";
			}
			, error: function (xhr, ajaxOptions, thrownError) {
				alert("Login Failed.");
				alert(xhr.status);
				alert(thrownError);
			}
		});
		console.log(this.state.f1, this.state.f2);
		if (result == "true") {
			this.setState({ login: true });
		}

	}
	register() {
		this.setState({ register: true });
		console.log(this.state.f1, this.state.f2);
	}
	registerfinish() {
		this.setState({ register: false });
		$.ajax({
			url: 'https://tsm-custom-thesaurus.herokuapp.com/register',
			type: "POST",
			async: false,
			data: {
				"username": this.state.f1,
				"password": this.state.f2
			},
			success: function (data) {
				console.log(data);
				alert("Register Success!");
				window.location.reload();
				//this.setState({ login: true });
			}
			, error: function (xhr, ajaxOptions, thrownError) {
				//alert(body);
				alert("Register Failed!");
				alert(xhr.status);
				alert(thrownError);
			}
		});
		console.log(this.state.f1, this.state.f2);
	}
	logout() {
		this.setState({ login: false });
		$.ajax({
			url: 'https://tsm-custom-thesaurus.herokuapp.com/logout',
			type: "POST",
			async: false,
			success: function (data) {
				console.log(data);
				window.location.reload();
			}
			, error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}
		});
		//console.log('logout');
	}
	getf1() {
		return (this.state.f1);
	}
	getf2() {
		return (this.state.f1);
	}
	render() {
		let page = null;
		if (this.state.register) {
			page = <Register change1={this.handleChange} change2={this.handleChange2} registerfinish={this.registerfinish} f1={this.getf1} f2={this.getf2} />;
		}
		else if (!this.state.login) {
			page = <Login change1={this.handleChange} change2={this.handleChange2} login={this.login} register={this.register} f1={this.getf1} f2={this.getf2} />;
		}
		else {
			page = <BaseFunction logout={this.logout} />;
		}
		return (
			<div>
				{page}
			</div>
		);
	}
}
// This asks ReactDOM to add the component SimpleWidget
// Note the JSX for specifiying a React component

ReactDOM.render(<MainPage />, document.getElementById('root'));
//ReactDOM.render(<Bottom />, document.getElementById('bottom'));