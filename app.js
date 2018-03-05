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
				}
			});
		} else {
			alert(TYPE + ' for: ' + this.state.value + ' from custom thesaurus\n Functionality not implemented');
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
									'The Edit Custom Thesaurus tab to allows users to add or remove their own synonyms or antonym for a word. -This functionality is currently not implemented due to lack of storage.'
								),
								React.createElement(
									'p',
									null,
									'The Use Thesaurus tab allows the user to find synonyms and antonyms based on the thesaurus provided by wordAPI or their own custom thesaurus based on the radio buttons. Custom thesaurus function not implemented. Standard thesaurus lookup function is functional. Simply input a word in the textbox, select from Standard or Custom Thesaurus to look up from and select Synonym or Antonym from the dropdown list and press search.'
								),
								React.createElement(
									'p',
									null,
									'The user may also press on one of the result and the content of the search box will be replaced by the result that the user clicked on.'
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
	}
	// logout() {
	// 	this.setState({ job: 3 });
	// 	var NAME = document.getElementById("home");
	// 	NAME.className="active";
	// 	var CUS = document.getElementById("cus");
	// 	CUS.classList.remove("active");
	// 	var THES = document.getElementById("thes");
	// 	THES.classList.remove("active");
	// 	console.log('Home');
	// }
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
								'TSM Custom Thesaurus'
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
			)
		)
		//<div>
		//	{page}
		// 	<button type class="btn btn-primary" onClick={this.handleCClick} >
		//  		Edit Custom Thesaurus.
		//	</button>
		//	<button type class="btn btn-primary" onClick={this.handleRgClick} >
		// 		Use Thesaurus.
		//	</button>
		//</div>
		;
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
				React.createElement('input', { className: 'btn btn-lg btn-primary btn-block', type: 'submit', value: 'Submit' }),
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
		this.state = { register: false, f2: props.f2 };

		this.registerfinish = props.registerfinish.bind(this);
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
				{ className: 'form-signin', onSubmit: this.registerfinish },
				React.createElement(
					'h2',
					{ className: 'form-signin-heading' },
					'Register a new account'
				),
				React.createElement('input', { type: 'text', className: 'form-control', name: 'username', placeholder: 'Email Address', required: '', autoFocus: '', value: this.getf1(), onChange: this.handleChange }),
				React.createElement('input', { type: 'password', className: 'form-control', name: 'password', placeholder: 'Password', required: '', value: this.getf2(), onChange: this.handleChange2 }),
				React.createElement('input', { className: 'btn btn-lg btn-primary btn-block', type: 'submit', value: 'Submit' })
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
	}
	handleChange(event) {
		this.setState({ f1: event.target.value });
	}
	handleChange2(event) {
		this.setState({ f2: event.target.value });
	}
	login() {
		this.setState({ login: true });
		console.log(this.state.f1, this.state.f2);
	}
	register() {
		this.setState({ register: true });
		console.log(this.state.f1, this.state.f2);
	}
	registerfinish() {
		this.setState({ register: false });
		//console.log(this.state.f1, this.state.f2);
	}
	logout() {
		this.setState({ login: false });
		//console.log('logout');
		window.location.reload();
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

