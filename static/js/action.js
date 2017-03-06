/**
 * 本文件用于处理用户与屏幕的交互
 */

var weapons = [],
  enemies = [],
  weaponNumber = -1,
  enemyNumber = -1,
  touchLimitHeight = Height * 0.7,
  touchStartTime, touchEndTime,
  touchStartX, touchStartY, touchEndX, touchEndY;



/**
 * 飞镖的创建和触发
 */
document.addEventListener('touchstart', function (event) {
  touchStartX = event.touches[0].pageX;
  touchStartY = event.touches[0].pageY;
  touchStartTime = Date.now();

  // 只有当开始触摸的位置在界限之内才创建飞镖
  if (touchStartY > touchLimitHeight) {
    // 限制可以同时存在的飞镖个数为： 20 个
    if (weapons.length === 20) {
      weaponNumber = 18;
      weapons = weapons.slice(1);
    }
    weaponNumber += 1;
    weapons[weaponNumber] = new Weapon(touchStartX, touchStartY);
  }
}, false);

document.addEventListener('touchend', function (event) {
  if (weapons[weaponNumber]) {
    touchEndX = event.changedTouches[0].pageX;
    touchEndY = event.changedTouches[0].pageY;
    touchEndTime = Date.now();

    var dt = (touchEndTime - touchStartTime) / 1000;
    var dx = touchEndX - touchStartX;
    var dy = touchEndY - touchStartY;
    var speedX = dx / dt;
    var speedY = dy / dt;
    // console.log('speedX: ' + speedX);
    // console.log('speedY: ' + speedY);
    weapons[weaponNumber].speedX = speedX;
    weapons[weaponNumber].speedY = speedY;
  }
}, false);



/**
 * 游戏敌军的创建和触发
 */
function createEnemy() {
  enemyNumber += 1;
  enemies[enemyNumber] = new Enemy();
}

function cleanOutEnemy(enemies, index) {
  if (enemies[index].y >= touchLimitHeight) {
    enemyNumber -= 1;
    enemies.splice(index,1);
  }
}

function cleanOutWeapon(weapons, index) {
  if(weapons[index].x<0 || weapons[index].x > Width || weapons[index].y < 0 || weapons[index].y > Height) {
    weaponNumber -= 1;
    weapons.splice(index,1);
  }
}

// 碰撞检测
function checkCrash() {
  // 检查元素是否发生碰撞，如果碰撞，则两个都消失。
  for (var i = 0; i < weapons.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      var weaponLeft = weapons[i].x - weapons[i].width / 2,
        weaponRight = weapons[i].x + weapons[i].width / 2,
        weaponTop = weapons[i].y - weapons[i].height / 2,
        weaponBottom = weapons[i].y + weapons[i].height / 2,
        enemyLeft = enemies[j].x - enemies[j].width / 2,
        enemyRight = enemies[j].x + enemies[j].width / 2,
        enemyTop = enemies[j].y - enemies[j].height / 2,
        enemyBottom = enemies[j].y + enemies[j].height / 2;

      if (weaponRight > enemyLeft && weaponLeft < enemyRight && weaponTop < enemyBottom && weaponBottom > enemyTop) {
        console.log('crash happend');
        weaponNumber -= 1;
        weapons.splice(i, 1);
        enemyNumber -= 1;
        enemies.splice(j, 1);
        return;
      }
    }
  }
}