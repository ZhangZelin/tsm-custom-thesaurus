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
		//console.log("state is " + this.state.value);						
		if (this.state.source === "sourceStandard") {
			//alert('synonms for: ' + this.state.value + '\nFunctionality not implemented');
			var REG = document.getElementById("returnReg");
			REG.innerHTML = "";
			//REG.append('<li>An element</li>');
			var url = 'https://wordsapiv1.p.mashape.com/words/' + this.state.value + '/' + TYPE;
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
						//document.getElementById('thesinput').innerHTML = this.value;
						//alert(myStringArray[i]);
						//this.handleChange;this.handleSubmit
						//Do something
					}
					//console.log(data)
					//console.log(data.TYPE)
					//console.log(data.TYPE[0])
				}, error: function (xhr, ajaxOptions, thrownError) {
					alert(xhr.status);
					alert(thrownError);
				}
			});
		} else {
			var REG = document.getElementById("returnReg");
			REG.innerHTML = "";
			$.ajax({
				url: 'https://tsm-custom-thesaurus.herokuapp.com/words/' + this.state.value + '/' + TYPE,
				type: "GET",
				async: false,
				success: function (data) {
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
					console.log(data);
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert(xhr.status);
					alert(thrownError);
				}
			});
			//alert(TYPE + ' for: ' + this.state.value + ' from custom thesaurus\n Functionality not implemented');
		}
	}
	handleSourceChange(event) {
		this.setState({ source: event.target.value });
	}
	render() {
		return React.createElement(
			'div',
			{ className: 'bt' },
			React.createElement(
				'h3',
				null,
				'Thesaurus'
			),
			React.createElement(
				'form',
				{ onSubmit: this.handleSubmit },
				React.createElement(
					'label',
					null,
					'Word:',
					React.createElement('input', { type: 'text', id: 'thesinput', className: 'form-control', value: this.state.value, onChange: this.handleChange })
				),
				React.createElement(
					'div',
					{ className: 'radio' },
					React.createElement(
						'label',
						{ className: 'radio-inline' },
						React.createElement('input', { type: 'radio', value: 'sourceStandard',
							checked: this.state.source === "sourceStandard",
							onChange: this.handleSourceChange }),
						'Standard Thesaurus'
					),
					React.createElement(
						'label',
						{ className: 'radio-inline' },
						React.createElement('input', { type: 'radio', value: 'sourceCustom',
							checked: this.state.source === "sourceCustom",
							onChange: this.handleSourceChange }),
						'Custom Thesaurus'
					)
				),
				React.createElement(
					'label',
					null,
					React.createElement(
						'div',
						{ className: 'form-group' },
						React.createElement(
							'select',
							{ className: 'form-control', id: 'sel1' },
							React.createElement(
								'option',
								null,
								'Synonyms'
							),
							React.createElement(
								'option',
								null,
								'Antonyms'
							)
						)
					)
				),
				React.createElement('input', { className: 'btn btn-primary', type: 'submit', value: 'Search' })
			),
			React.createElement('ul', { id: 'returnReg', className: 'nav nav-pills' })
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
		var TYPE = document.getElementById("sel2").value;
		var ACTION = document.getElementById("sel3").value;
		alert(ACTION + ': ' + this.state.value2 + '\n' + TYPE + ' of: ' + this.state.value + '\nFunctionality not implemented');
	}
	render() {
		//var TYPE = document.getElementById("sel2").value;		
		//var ACTION = document.getElementById("sel3").value;		
		return React.createElement(
			'div',
			{ className: 'bt' },
			React.createElement(
				'h3',
				null,
				'Edit Custom Thesaurus'
			),
			React.createElement(
				'form',
				{ onSubmit: this.handleSubmit },
				React.createElement(
					'label',
					null,
					React.createElement(
						'label',
						{ id: 'cuslab1' },
						'Word:'
					),
					React.createElement('input', { type: 'text', className: 'form-control', value: this.state.value, onChange: this.handleChange })
				),
				React.createElement(
					'label',
					null,
					React.createElement(
						'label',
						{ id: 'cuslab2' },
						'Synonym/Antonym:'
					),
					React.createElement('input', { type: 'text', className: 'form-control', value: this.state.value2, onChange: this.handleChange2 })
				),
				React.createElement('br', null),
				React.createElement(
					'label',
					null,
					React.createElement(
						'div',
						{ className: 'form-group' },
						React.createElement(
							'select',
							{ className: 'form-control', id: 'sel2' },
							React.createElement(
								'option',
								null,
								'Synonym'
							),
							React.createElement(
								'option',
								null,
								'Antonym'
							)
						)
					)
				),
				React.createElement(
					'label',
					null,
					React.createElement(
						'div',
						{ className: 'form-group' },
						React.createElement(
							'select',
							{ className: 'form-control', id: 'sel3' },
							React.createElement(
								'option',
								null,
								'Add'
							),
							React.createElement(
								'option',
								null,
								'Remove'
							)
						)
					)
				),
				React.createElement('br', null),
				React.createElement('input', { className: 'btn btn-primary', type: 'submit', value: 'Submit' })
			),
			React.createElement('ul', { className: 'dicResList' })
		);
	}
}

class WelcomePage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h1',
				{ className: 'cover-heading' },
				'Welcome to TSM Custom Thesaurus.'
			),
			React.createElement(
				'p',
				{ className: 'lead' },
				'TSM Custom Thesaurus is a personalized, customizable thesaurus that builds upon the thesaurus from WordsAPI.'
			),
			React.createElement(
				'div',
				{ className: 'lead' },
				React.createElement(
					'a',
					{ 'data-toggle': 'modal', 'data-target': '#myModal', className: 'btn btn-lg btn-default' },
					'How does it work?'
				),
				React.createElement(
					'div',
					{ className: 'modal fade', id: 'myModal', role: 'dialog' },
					React.createElement(
						'div',
						{ className: 'modal-dialog' },
						React.createElement(
							'div',
							{ className: 'modal-content', id: 'myModalin' },
							React.createElement(
								'script',
								null,
								'document.getElementById("myModalin").style = \'background: #333;\''
							),
							React.createElement(
								'div',
								{ className: 'modal-header' },
								React.createElement(
									'button',
									{ type: 'button', className: 'close', 'data-dismiss': 'modal' },
									'\xD7'
								),
								React.createElement(
									'h4',
									{ className: 'modal-title' },
									'How does it work?'
								)
							),
							React.createElement(
								'div',
								{ className: 'modal-body' },
								React.createElement(
									'p',
									null,
									'Use the navigation bar at the top right corner to navigate to different features of our web application.'
								),
								React.createElement(
									'p',
									null,
									'The Edit Custom Thesaurus tab to allows users to add or remove their own synonyms or antonym for a word.'
								),
								React.createElement(
									'p',
									null,
									'The Use Thesaurus tab allows the user to find synonyms and antonyms based on the thesaurus provided by wordAPI or their own custom thesaurus based on the radio buttons. Simply input a word in the textbox, select from Standard or Custom Thesaurus to look up from and select Synonym or Antonym from the dropdown list and press search.'
								),
								React.createElement(
									'p',
									null,
									'The user may also press on one of the result and the content of the search box will be replaced by the result that the user clicked on.'
								),
								React.createElement(
									'p',
									null,
									'To change password, click your username at the top left corner of the page after logging in.'
								),
								React.createElement(
									'p',
									null,
									'Use logout button to return to the login page.'
								)
							),
							React.createElement(
								'div',
								{ className: 'modal-footer' },
								React.createElement(
									'button',
									{ type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
									'Close'
								)
							)
						)
					)
				)
			)
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
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert("Failed to change password!");
					alert(xhr.status);
					alert(thrownError);
				}
			});
		} else {
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
			},
			error: function (xhr, ajaxOptions, thrownError) {
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
			page = React.createElement(WelcomePage, null);
		} else if (job == 1) {
			page = React.createElement(BaseThesaurus, null);
		} else if (job == 2) {
			page = React.createElement(AddCThesaurus, null);
		} else {
			//log out function here
			page = React.createElement(Login, null);
		}
		return React.createElement(
			'div',
			{ className: 'site-wrapper' },
			React.createElement(
				'div',
				{ className: 'site-wrapper-inner' },
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(
						'div',
						{ className: 'masthead clearfix' },
						React.createElement(
							'div',
							{ className: 'container inner' },
							React.createElement(
								'h3',
								{ className: 'masthead-brand' },
								React.createElement(
									'a',
									{ href: '#', id: 'username', 'data-toggle': 'modal', 'data-target': '#passChange' },
									'TSM Custom Thesaurus'
								)
							),
							React.createElement(
								'nav',
								null,
								React.createElement(
									'ul',
									{ className: 'nav masthead-nav' },
									React.createElement(
										'li',
										{ id: 'home', className: 'active' },
										React.createElement(
											'a',
											{ href: '#', onClick: this.handleHClick },
											'Home'
										)
									),
									React.createElement(
										'li',
										{ id: 'cus' },
										React.createElement(
											'a',
											{ href: '#', onClick: this.handleCClick },
											'Edit Custom Thesaurus'
										)
									),
									React.createElement(
										'li',
										{ id: 'thes' },
										React.createElement(
											'a',
											{ href: '#', onClick: this.handleRgClick },
											'Use Thesaurus'
										)
									),
									React.createElement(
										'li',
										{ id: 'thes' },
										React.createElement(
											'a',
											{ href: '#', onClick: this.logout },
											'Logout'
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'inner cover' },
						page
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'modal fade', id: 'passChange', role: 'dialog' },
				React.createElement(
					'div',
					{ className: 'modal-dialog' },
					React.createElement(
						'div',
						{ className: 'modal-content', id: 'passChangein' },
						React.createElement(
							'script',
							null,
							'document.getElementById("passChangein").style = \'background: #333;\''
						),
						React.createElement(
							'div',
							{ className: 'modal-header' },
							React.createElement(
								'button',
								{ type: 'button', className: 'close', 'data-dismiss': 'modal' },
								'\xD7'
							),
							React.createElement(
								'h4',
								{ className: 'modal-title' },
								'Change Password'
							)
						),
						React.createElement(
							'div',
							{ className: 'modal-body' },
							React.createElement(
								'form',
								{ className: 'form-signin', onSubmit: this.changePassword },
								React.createElement(
									'h2',
									{ className: 'form-signin-heading' },
									'Type new password here'
								),
								React.createElement('input', { type: 'password', id: 'newpass', className: 'form-control', name: 'newpassword', placeholder: 'New Password', required: '', autoFocus: '' }),
								React.createElement('input', { type: 'password', id: 'newpassconf', className: 'form-control', name: 'confirmpassword', placeholder: 'Confirm New Password', required: '' }),
								React.createElement('input', { className: 'btn btn-lg btn-primary btn-block', type: 'button', onClick: this.changePassword, value: 'Submit' })
							)
						),
						React.createElement(
							'div',
							{ className: 'modal-footer' },
							React.createElement(
								'button',
								{ type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
								'Close'
							)
						)
					)
				)
			)
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
		return React.createElement(
			'div',
			{ className: 'wrapper' },
			React.createElement(
				'form',
				{ className: 'form-signin', onSubmit: this.login },
				React.createElement(
					'h2',
					{ className: 'form-signin-heading' },
					'Please login'
				),
				React.createElement('input', { type: 'text', className: 'form-control', name: 'username', placeholder: 'Email Address', required: '', autoFocus: '', value: this.getf1(), onChange: this.handleChange }),
				React.createElement('input', { type: 'password', className: 'form-control', name: 'password', placeholder: 'Password', required: '', value: this.getf2(), onChange: this.handleChange2 }),
				React.createElement('input', { className: 'btn btn-lg btn-primary btn-block', type: 'button', onClick: this.login, value: 'Submit' }),
				React.createElement(
					'a',
					{ onClick: this.register, className: 'btn btn-default' },
					'Register new account'
				)
			)
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
		return this.state.f1;
	}
	getf2() {
		return this.state.f2;
	}
	render() {
		return React.createElement(
			'div',
			{ className: 'wrapper' },
			React.createElement(
				'form',
				{ className: 'form-signin', onSubmit: this.registerfinish },
				React.createElement(
					'h2',
					{ className: 'form-signin-heading' },
					'Register a new account'
				),
				React.createElement('input', { type: 'text', className: 'form-control', name: 'username', placeholder: 'Email Address', required: '', autoFocus: '', value: this.getf1(), onChange: this.handleChange }),
				React.createElement('input', { type: 'password', className: 'form-control', name: 'password', placeholder: 'Password', required: '', value: this.getf2(), onChange: this.handleChange2 }),
				React.createElement('input', { className: 'btn btn-lg btn-primary btn-block', type: 'button', onClick: this.registerfinish, value: 'Submit' })
			)
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
			},
			error: function (xhr, ajaxOptions, thrownError) {
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
			},
			error: function (xhr, ajaxOptions, thrownError) {
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
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}
		});
		//console.log('logout');
	}
	getf1() {
		return this.state.f1;
	}
	getf2() {
		return this.state.f1;
	}
	render() {
		let page = null;
		if (this.state.register) {
			page = React.createElement(Register, { change1: this.handleChange, change2: this.handleChange2, registerfinish: this.registerfinish, f1: this.getf1, f2: this.getf2 });
		} else if (!this.state.login) {
			page = React.createElement(Login, { change1: this.handleChange, change2: this.handleChange2, login: this.login, register: this.register, f1: this.getf1, f2: this.getf2 });
		} else {
			page = React.createElement(BaseFunction, { logout: this.logout });
		}
		return React.createElement(
			'div',
			null,
			page
		);
	}
}
// This asks ReactDOM to add the component SimpleWidget
// Note the JSX for specifiying a React component

ReactDOM.render(React.createElement(MainPage, null), document.getElementById('root'));
//ReactDOM.render(<Bottom />, document.getElementById('bottom'));

