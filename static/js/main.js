/**
 * 本文件是游戏运行的主循环， 负责游戏的整体流程
 * 主要包括： 游戏初始化、游戏数据的更新。
 */

function init() {
  // TODO: 完成系统初始化
  load();
  lastTime = Date.now();
  main();
  console.log('init');
}

function main() {

  var now = Date.now(),
    dt = (now - lastTime) / 1000;

  update(dt);

  if (checkCrash(weapons, enemies)) {
    enemyNumber -= 1;
    weaponNumber -= 1;
    Counts += 1;
  }

  if (checkCrash(weapons, friends)) {
    friendNumber -= 1;
    weaponNumber -= 1;
    Counts -= 10;
  }
  clean();
  render(ctx);
  drawCounts();

  lastTime = Date.now();

  window.requestAnimationFrame(main);
}



function render(ctx) {
  // 渲染所有的图形


  // 渲染下方灰色方框
  ctx.save();
  ctx.fillStyle = 'rgba(99,99,99,0.5)';
  ctx.fillRect(0, touchLimitHeight, Width, Height);
  ctx.restore();


  if (weapons) {
    // 渲染武器
    for (var i = 0; i < weapons.length; i++) {
      weapons[i].render(ctx);
    }
  }

  if (enemies) {
    // 渲染敌人
    for (var j = 0; j < enemies.length; j++) {
      enemies[j].render(ctx);
    }
  }

  if (friends) {
    // 渲染友军
    for (var k = 0; k < friends.length; k++) {
      friends[k].render(ctx);
    }
  }
}

function update(dt) {
  // 更新要渲染的元素的数据
  if (weapons) {
    for (var i = 0; i < weapons.length; i++) {
      weapons[i].update(dt);
      cleanOutWeapon(weapons, i);
    }
  }

  if (enemies) {
    for (var j = 0; j < enemies.length; j++) {
      enemies[j].update(dt);
      cleanOutEnemy(enemies, j);
    }
  }

  if (friends) {
    for (var k = 0; k < friends.length; k++) {
      friends[k].update(dt);
      cleanOutFriend(friends, k);
    }
  }

}

function load() {
  // TODO: 载入游戏所需数据
}

function clean() {
  // 清空画布
  ctx.clearRect(0, 0, Width, Height);
}

function drawCounts() {
  var text = '得分： ' + Counts;
  ctx.save();
  ctx.beginPath();
  ctx.font = '20px a';
  ctx.fillStyle = '#654321';
  ctx.fillText(text, 5, 30);
  ctx.restore();
}


init();
setInterval(createEnemy, 500);
setInterval(createFriend, 2300);