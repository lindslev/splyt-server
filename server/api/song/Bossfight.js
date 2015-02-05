//https://github.com/smromain/bossFight

var winnerArray, hero, boss;
function Character(type, health, power, def){
	this.type = type;
	this.attackPower = power;
	this.defence = def;
	this.health = health;
};

Character.prototype.attack = function(opponent){
	if(opponent.defense <= Math.random()){
		if(Math.random() > .67 && this.type === 'hero' && (opponent.health/5) > this.attackPower){
			opponent.health -= (opponent.health/5);
		}
		else{
			opponent.health -= this.attackPower;
		}
	}
};

function startEpicBattle(battles){
	winnerArray = [];
	for(i = 0; i< battles; i++){
		var hero = new Character('hero', 6, 0.6, 60);
		var boss = new Character('boss', 10, 0.2, 100);
	}
	while(hero.health > 0 && boss.health > 0){
		hero.attack(boss);		
		if (boss.health > 0) {
			boss.attack(hero);
		};
	}
	if(hero.health<0){
		winnerArray.push(boss);
	}
	else{
		winnerArray.push(hero);
	}
	return winnerArray.reduce(function(winnerObj, currentWinner){
		if(currentWinner === 'boss'){
			winnerObj.boss++
		} else{
			winnerObj.hero++
		}
		return winnerObj;
	}, {boss:0, hero:0})
}