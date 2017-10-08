!function(scope, undefined){

	var getEl= function(qr){ return document.querySelector(qr); },
		startTrigger= getEl('.start-trying'),
		audio= new Audio(), 
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

	// go fetch the list from a different file
	fetch('lists.json').then(result => result.json().then(data => init(data)))

	function init(lists) {
		var selectedList= lists['js-libs'];

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
			playAudio("audio/impressive.mp3");
			body.classList.add('iamimpressedbyyourmarkup');
		};
		window.youAreImpressive= youAreImpressive;

		function hitted(){
			var r= finalResult;
			body.classList.add('hitted');
			var btnEl= document.createElement('input');
			btnEl.type= 'button';

			if(hitEnergy >= energyTarget){
				playAudio("audio/success.mp3");
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
				playAudio("audio/fail.mp3");
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
			playAudio("audio/correctWords.mp3");
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

		function playAudio(source){
		audio.src=source; //defining source 
		audio.play(); //playing the audio
		}

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
	}
}(this);
