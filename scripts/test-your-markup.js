!function(scope, undefined){

	var getEl= function(qr){ return document.querySelector(qr); },
		startTrigger= getEl('.start-trying'),
		mightness= getEl('.mightness'),
		menu= getEl('.menu'),
		timer= getEl('.timer'),
		body= document.body,
		input= document.getElementById('input-word'),
		tableset= document.getElementById('tableset'),
		finalResult= document.querySelector('.final-result'),
		giveUpBtn= document.querySelector('.give-up'),
		usedWords= document.querySelector('.used-words'),
		curLevelLabel= document.querySelector('.cur-level-label'),
		cl= input.classList;
		levels= [20, 40, 60, 80, 95],
		speed= 90,
		range= 20,
		currentRange= 0,
		energyTarget= 0,
		energyBurn= 0.2,
		flags= {
			gameStarted: false,
			currentLevel: 0,
			currentTime: 0,
			timeLimit: 10,
			hitting: false
		},
		levelLabels= ['Wood', 'Brick', 'Stone', 'Ice', 'Iron'],
		hitEnergy= 0,
		energy= 0;

	var lists= {
		cheat: ['aaaaaaa', 'bbbbbbb', 'ccccccc', 'ddddddd', 'eeeeeee', 'fffffff', 'ggggggg', 'hhhhhhh', 'iiiiiii', 'jjjjjjj', 'kkkkkkk', 'lllllll', 'mmmmmmm', 'nnnnnnn', 'ooooooo', 'ppppppp', 'qqqqqqq', 'rrrrrrr', 'sssssss', 'ttttttt', 'uuuuuuu', 'vvvvvvv', 'xxxxxxx', 'yyyyyyy', 'wwwwwww', 'zzzzzzz'],
		html5: ["html","head","title","base","link","meta","style","script","noscript","template","body","section","nav","article","aside","h1","h2","h3","h4","h5","h6","h1","h6","header","footer","address","main","p","hr","pre","blockquote","ol","ul","li","dl","dt","dd","dd","figure","figcaption","div","a","em","strong","small","s","cite","q","dfn","abbr","title","data","time","datetime","code","var","samp","kbd","sub","sup","i","b","u","mark","ruby","rt","rp","bdi","bdo","span","class","lang","dir","br","wbr","ins","del","img","iframe","embed","object","param","object","video","audio","source","video","audio","track","video","audio","canvas","map","area","area","map","svg","math","table","caption","colgroup","col","tbody","thead","tfoot","tr","td","th","form","fieldset","legend","fieldset","label","input","button","select","datalist","optgroup","option","select","datalist","textarea","keygen","output","progress","meter","details","summary","details","menuitem","menu"],
		periodicTable: ["h","he","li","be","b","c","n","o","f","ne","na","mg","al","si","p","s","cl","ar","k","ca","sc","ti","v","cr"," mn","fe","co","ni","cu","zn","ga","ge","as","se","br","kr","rb","sr","y","zr","nb","mo","tc","ru","rh","pd","ag","cd","in","sn","sb","te","i","xe","cs","ba","la","ce","pr","nd","pm","sm","eu","gd","tb","dy","ho","er","tm","yb","lu","hf","ta","w","re","os","ir","pt","au","hg","tl","pb","bi","po","at","rn","fr","ra","ac","th","pa","u","np","pu","am","cm","bk","cf","es","fm","md","no","lr","rf","db","sg","bh","hs","mt"],
		countries: ["afghanistan","albania","algeria","american samoa","andorra","angola","anguilla","antigua and barbuda","argentina","armenia","aruba","australia","austria","azerbaijan","bahamas","bahrain","bangladesh","barbados","belarus","belgium","belize","benin","bermuda","bhutan","bolivia","bosnia and herzegovina","botswana","brazil","british virgin islands","brunei","bulgaria","burkina faso","burundi","cambodia","cameroon","canada","cape verde","cayman islands","central african republic","chad","chile","china","colombia","comoros","cook islands","costa rica","croatia","cuba","curacao","cyprus","czech republic","côte d'ivoire","denmark","djibouti","dominica","dominican republic","dr congo","east timor","ecuador","egypt","el salvador","equatorial guinea","eritrea","estonia","ethiopia","falkland islands","faroe islands","federated states of micronesia","fiji","finland","france","french guiana","french polynesia","gabon","gambia","georgia","germany","ghana","gibraltar","greece","greenland","grenada","guadeloupe","guam","guatemala","guernsey","guinea","guinea-bissau","guyana","haiti","honduras","hong kong","hungary","iceland","india","indonesia","iran","iraq","ireland","isle of man","israel","italy","jamaica","japan","jersey","jordan","kazakhstan","kenya","kiribati","kosovo","kuwait","kyrgyzstan","laos","latvia","lebanon","lesotho","liberia","libya","liechtenstein","lithuania","luxembourg","macau","macedonia","madagascar","malawi","malaysia","maldives","mali","malta","marshall islands","martinique","mauritania","mauritius","mayotte","mexico","moldova","monaco","mongolia","montenegro","montserrat","morocco","mozambique","myanmar","namibia","nauru","  nepal","netherlands","new caledonia","new zealand","nicaragua","niger","nigeria","niue","north korea","northern mariana islands","norway","oman","pakistan","palau","palestinian territories","panama","papua new guinea","paraguay","peru","philippines","pitcairn islands","poland","portugal","puerto rico","qatar","republic of the congo","romania","russia","rwanda","réunion","saint barthelemy","saint helena","saint kitts and nevis","saint lucia","saint martin","saint pierre and miquelon","saint vincent and the grenadines","samoa","san marino","sao tome and principe","saudi arabia","senegal","serbia","seychelles","sierra leone","singapore","sint maarten","slovakia","slovenia","solomon islands","somalia","south africa","south korea","south sudan","spain","sri lanka","sudan","suriname","swaziland","sweden"," switzerland","syria","taiwan","tajikistan","tanzania","thailand","togo","tokelau","tonga","trinidad and tobago","tunisia","turkey","turkmenistan","turks and caicos islands","tuvalu","uganda","ukraine","united arab emirates","united kingdom","united states","united states virgin islands","uruguay","uzbekistan","vanuatu","venezuela","vietnam","wallis and futuna","western sahara","world","yemen","zambia","zimbabwe"],
        'js-libs': ["chr.js","chr","dojo toolkit","jquery","midori","mootools","react","anychart","d3.js","highcharts","p5.js","pixi.js","plotly","raphaël","swfobject","velocity","whitestormjs","bootstrap","dhtmlx","jqwidgets","qooxdoo","smartclient","webix","winjs","gijgo","glow","script.aculo.us","joose","jsphp","mochikit","pdf.js","pdfjs","rico","jquery mobile","mustache","jasmine","mocha","qunit","tape","angularjs","aurelia","cappuccino","echo","ember.js","ember","enyo","ext js","ext","javascriptmvc","knockout","meteor","mojito","node.js","node","sproutcore","modernizr","wakanda","ajax","prototype","easeljs","infovis","processing","processingjs","processing.js","three","threejs","three.js","angular","devextreme","dojo","extjs","ext.js","zurb","polymer","jquery ui","jqueryui","ignite","igniteui","kendo","kendoui","wijmo","openui5","ample","lively","yui","spry","socketio","socket.io","underscore","underscore.js","cascade","jinja","twig","jsunit","unit","backbone","chaplin","vue","cassowary","rialto","next","dsw","gulp","grunt","npm","nvm","n"]
	}
	var selectedList= lists['js-libs'];// lists['html5'];

	function endGame(){
		flags.gameStarted= false;
		input.blur();

		mightness.style.height= '0%';
		flags= {
			gameStarted: false,
			currentLevel: flags.currentLevel,
			currentTime: 0,
			timeLimit: 10,
			hitting: false
		};
		input.value= '';
	}

	function countDown(){
		if(!flags.gameStarted){ return; }
		flags.currentTime--;
		timer.innerHTML= flags.currentTime;
		if(flags.currentTime === 0){
			hit();
		}else{
			setTimeout(countDown, 1000);
		}
	}

	function startGame(){
		var b= document.body;
		b.classList.add('game-started');
		b.classList.add('waiting');
		hitEnergy= energy= 0;
		energyTarget= levels[flags.currentLevel];
		timer.innerHTML= flags.currentTime;
		curLevelLabel.innerHTML= 'Level:<br/><strong>'+levelLabels[flags.currentLevel] +'</strong>';
		document.querySelector('.how-to-content').classList.remove('showing');
		b.setAttribute('data-power-needed', Math.ceil((energyTarget/10)/2));
		setTimeout(function(){
			b.classList.remove('waiting');
			flags.currentTime= flags.timeLimit + (flags.currentLevel * 6);
			setTimeout(dryOut, speed);
			setTimeout(countDown, 1000);
			input.focus();
			selectedList= lists[tableset.value].slice(0);
			energyBurn= selectedList.join('').length / (selectedList.length * 30);
			flags.gameStarted= true;
		}, 1200);
	}

	function restartGame(){
		endGame();
		body.removeAttribute('data-power-range');
		body.removeAttribute('data-power-needed');
		body.className= '';
		flags.currentLevel= 0;
		finalResult.style.display= 'none';
		usedWords.innerHTML= '';
		startGame();
	}

	function youAreImpressive(){
		body.classList.add('iamimpressedbyyourmarkup');
	};
	window.youAreImpressive= youAreImpressive;

	function hitted(){
		var r= finalResult;
		body.classList.add('hitted');
		var btnEl= document.createElement('input');
		btnEl.type= 'button';

		if(hitEnergy >= energyTarget){
			body.classList.add('broken');
			r.innerHTML= 'Success';
			if(flags.currentLevel +1 < levels.length){
				btnEl.value= 'Next';
				btnEl.addEventListener('click', function(){
					if(flags.currentLevel < 5){
						flags.currentLevel++;
					}else{
						youAreImpressive();
					}
					body.classList.remove('hitted', 'half-broken', 'broken');
					finalResult.style.display= 'none';
					startGame();
				});
			}else{
				youAreImpressive();
				//btnEl.value= 'Start again';
				//btnEl.addEventListener('click', restartGame);
			}
		}else{
			body.classList.add('half-broken');
			r.innerHTML= 'You Fail';
			btnEl.value= 'Retry';
			btnEl.addEventListener('click', restartGame);
		}
		r.appendChild(btnEl);
		r.style.display= 'block';
		//setTimeout(function(){r.style.display= 'none'; restartGame();}, 3000);
	}

	function goUpAndDown(current, goindDown){
		current= current || body.getAttribute('data-power-range');
		var time= 30;
		if(current < 5 && !goindDown){
			current++;
		}else if(current === 5 && !goindDown){
			goindDown= true;
			time= 500;
		}else if(current > 0){
			current--;
		}else{
			hitted();
			return
		}
		body.setAttribute('data-power-range', current);
		setTimeout(function(){goUpAndDown(current, goindDown)}, time);
	}

	function hit(status){
		flags.hitting= true;
		hitEnergy= energy;
		input.blur();

		setTimeout(function(){endGame(); goUpAndDown(); }, 200);
	}

	function dryOut(){
		if(!flags.gameStarted){ return; }

		energy-= energyBurn;
		if(energy >= 100){
			energy= 100;
		}
		if(energy <= 0){
			energy= 0;
			if(flags.hitting){
				mightness.style.height= '0%';
			}
		}
		setTimeout(dryOut, speed);
		var r= Math.ceil(energy / range);
		if(currentRange != r){
			body.setAttribute('data-power-range', r);
			currentRange= r;
		}
		mightness.style.height= energy+'%';
	}

	// start game
	startTrigger.addEventListener('click', startGame);

	function setOk(val){

		cl.add('successWord');
		var newLi= document.createElement('li');

		energy+= val.length * 2;
		if(energy > 100){
			energy= 100;
		}

		selectedList.splice(selectedList.indexOf(val), 1);
		newLi.innerHTML= '&nbsp;'+val+'&nbsp;';
		usedWords.appendChild(newLi);

		if(energy > energyTarget){
			hit();
		}
		setTimeout(function(){
			if(cl.contains('successWord')){
				input.value= '';
				cl.remove('successWord');
			}
		}, 400);
	}

	function setFail(val){
		cl.add('failWord');
		input.blur();
		setTimeout(function(){
			cl.remove('failWord');
			input.focus();
		}, 400);
	}

	body.addEventListener('keydown', function(evt){
		if(evt.keyCode == 8 && evt.target.tagName != 'INPUT'){
			evt.preventDefault();
			evt.stopPropagation();
			return false;
		}
	});

	input.addEventListener('keydown', function(evt){
		if(flags.gameStarted && !flags.hitting){
			var v= this.value;
			if(cl.contains('successWord')){
				cl.remove('successWord');
				this.value= '';
			}

			if(evt.keyCode == 13){
				if(selectedList.indexOf(this.value.toLowerCase()) >= 0){
					setOk(this.value);
				}else{
					setFail();
				}
			}
		}
	});

	function cancelGame(){
		endGame();
		body.className= '';
		finalResult.style.display= 'none';
		usedWords.innerHTML= '';
	}

	document.querySelector('.how-to-label').addEventListener('click', function(){
		this.parentNode.getElementsByTagName('ul')[0].classList.add('showing');
	});
	document.querySelector('.how-to-content input').addEventListener('click', function(){
		this.parentNode.classList.remove('showing');
	});
	giveUpBtn.addEventListener('click', function(){
		cancelGame();
	});



}(this);
