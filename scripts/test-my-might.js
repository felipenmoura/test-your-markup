!function(scope, undefined){

	var getEl= function(qr){ return document.querySelector(qr); },
		startTrigger= getEl('.start-trying'),
		mightness= getEl('.mightness'),
		menu= getEl('.menu'),
		level= getEl('.level'),
		timer= getEl('.timer'),
		speed= 90,
		range= 20,
		currentRange= 0,
		energyBurn= 1,
		flags= {
			gameStarted: false,
			currentLevel: false,
			currentTime: 0,
			timeLimit: 10,
			hitting: false
		},
		hitEnergy= 0,
		energy= 0;

	//var listOfEls= ["html","head","title","base","link","meta","style","script","noscript","template","body","body","section","nav","article","aside","h1","h2","h3","h4","h5","h6","h1","h6","header","footer","address","main","p","hr","pre","blockquote","ol","ul","li","dl","dt","dd","dd","figure","figcaption","div","a","em","strong","small"," ","s","cite","q","dfn","abbr","title","data","time","datetime","code","var","samp","kbd","sub","sup","i","b","u","mark","ruby","rt","rp","bdi","bdo","span","class","lang","dir","br","wbr","ins","del","img","iframe","embed","object","param","object","video","audio","source","video","audio","track","video","audio","canvas","map","area","area","map","svg","math","table","caption","colgroup","col","tbody","thead","tfoot","tr","td","th","form","fieldset","legend","fieldset","label","input","button","select","datalist","optgroup","option","select","datalist","textarea","keygen","output","progress","meter","details","summary","details","menuitem","menu"];

	function endGame(){
		flags.gameStarted= false;
		console.log('DONE', energy);
	}

	function countDown(){
		if(!flags.gameStarted){ return; }
		flags.currentTime--;
		timer.innerHTML= flags.currentTime;
		if(flags.currentTime === 0){
			endGame();
		}else{
			setTimeout(countDown, 1000);
		}
	}

	function hit(){
		flags.hitting= true;
		energyBurn= 20;
		hitEnergy= energy;
		endGame();
	}

	function dryOut(){
		if(!flags.gameStarted && !flags.hitting){ return; }
		if(energy > 0){
			energy-= energyBurn;
		}else{
			if(flags.hitting){
				energyBurn= 1;
				flags.hitting= false;
				//alert(hitEnergy);
				mightness.style.height= '0%';
			}
		}
		setTimeout(dryOut, speed);
		var r= Math.ceil(energy / range);
		console.log(currentRange, r);
		if(currentRange != r){
			document.body.setAttribute('data-power-range', r);
			currentRange= r;
		}
		mightness.style.height= energy+'%';
	}

	startTrigger.addEventListener('click', function(){
		var b= document.body;
		b.classList.add('game-started');
		b.classList.add('waiting');
		setTimeout(function(){
			b.classList.remove('waiting');
			flags.currentTime= flags.timeLimit
			setTimeout(dryOut, speed);
			setTimeout(countDown, 1000);
			flags.gameStarted= true;
		}, 1200);
	});

	document.addEventListener('keydown', function(evt){

		console.log(evt.keyCode);
		if(flags.gameStarted){
			if(evt.keyCode == 79 || evt.keyCode == 75){
				energy+= 4;
				if(energy > 100){
					energy= 100;
				}
			}
			if(evt.keyCode == 32){
				hit();
			}
		}

	});



}(this);