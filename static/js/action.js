/**
 * 本文件用于处理用户与屏幕的交互
 */

var weapons = [], // 所有敌人的集合
  enemies = [], // 所有武器的集合
  friends = [], // 所有友军的集合
  weaponNumber = -1,
  enemyNumber = -1,
  friendNumber = -1,
  touchLimitHeight = Height * 0.7,
  touchStartTime, touchEndTime,
  touchStartX, touchStartY, touchEndX, touchEndY,
  Counts = 0;



/**
 * 飞镖的创建和触发
 */
document.addEventListener('touchstart', function (event) {
  touchStartX = event.touches[0].pageX;
  touchStartY = event.touches[0].pageY;
  touchStartTime = Date.now();
}, false);

document.addEventListener('touchend', function (event) {
  touchEndX = event.changedTouches[0].pageX;
  touchEndY = event.changedTouches[0].pageY;
  touchEndTime = Date.now();

  var dt = (touchEndTime - touchStartTime) / 1000;
  var dx = touchEndX - touchStartX;
  var dy = touchEndY - touchStartY;
  var speedX = dx / dt;
  var speedY = dy / dt;

  // 当手指滑动一小段距离后准备创建飞镖
  if (Math.abs(dy) > 2 || Math.abs(dx) > 2) {
    // 只有当开始触摸的位置在界限之内才创建飞镖
    if (touchStartY > touchLimitHeight) {

      // 限制可以同时存在的飞镖个数为： 20 个
      if (weapons.length === 20) {
        weaponNumber = 18;
        weapons = weapons.slice(1);
      }

      weaponNumber += 1;
      weapons[weaponNumber] = new Weapon(touchStartX, touchStartY);

      // console.log('speedX: ' + speedX);
      // console.log('speedY: ' + speedY);
      weapons[weaponNumber].speedX = speedX;
      weapons[weaponNumber].speedY = speedY;
    }
  }

}, false);


// 清除飞出边界的飞镖
function cleanOutWeapon(weapons, index) {
  if (weapons[index].x < 0 || weapons[index].x > Width || weapons[index].y < 0 || weapons[index].y > Height) {
    weaponNumber -= 1;
    weapons.splice(index, 1);
  }
}




/**
 * 游戏 敌军 的创建和触发
 */
function createEnemy() {
  enemyNumber += 1;
  enemies[enemyNumber] = new Enemy();
}

function cleanOutEnemy(enemies, index) {
  if (enemies[index].y >= touchLimitHeight) {
    enemyNumber -= 1;
    enemies.splice(index, 1);

    // 漏掉敌军减一分
    Counts -= 1;
  }
}


/**
 * 游戏 友军 的创建和触发
 */

function createFriend() {
  friendNumber += 1;
  friends[friendNumber] = new Friend();
}

function cleanOutFriend(friends, index) {
  if (friends[index].y >= touchLimitHeight) {
    friendNumber -= 1;
    friends.splice(index, 1);

    // 拯救友军加10分
    Counts += 10;
  }
}



// 碰撞检测
function checkCrash(arr1,arr2) {
  // 检查 arr1 和 arr2 中的元素 是否发生碰撞，如果碰撞，则 return true；否则 return false
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      var weaponLeft = arr1[i].x - arr1[i].width / 2,
        weaponRight = arr1[i].x + arr1[i].width / 2,
        weaponTop = arr1[i].y - arr1[i].height / 2,
        weaponBottom = arr1[i].y + arr1[i].height / 2,
        enemyLeft = arr2[j].x - arr2[j].width / 2,
        enemyRight = arr2[j].x + arr2[j].width / 2,
        enemyTop = arr2[j].y - arr2[j].height / 2,
        enemyBottom = arr2[j].y + arr2[j].height / 2;

      if (weaponRight > enemyLeft && weaponLeft < enemyRight && weaponTop < enemyBottom && weaponBottom > enemyTop) {
        arr1.splice(i, 1);
        arr2.splice(j, 1);
        return true;
      }
    }
  }
  return false;
}

// 检测是否有足够空间创建可消灭对象

function isSpaceReady(obj) {
  // TODO:
}