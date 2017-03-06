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
  checkCrash();
  clean();
  render(ctx);

  lastTime = Date.now();

  window.requestAnimationFrame(main);
}

function render(ctx) {
  // 渲染所有的图形
  if (weapons) {
    for (var i = 0; i < weapons.length; i++) {
      weapons[i].render(ctx);
    }
  }

  if (enemies) {
    for (var j = 0; j < enemies.length; j++) {
      enemies[j].render(ctx);
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

}

function load() {
  // TODO: 载入游戏所需数据
}

function clean() {
  // 清空画布
  ctx.clearRect(0, 0, Width, Height);
}


init();
setInterval(createEnemy, 500);