/**
 * 本文件包含游戏所需要的数据、对象。
 */

var canvas = document.getElementById('app'),
  ctx = canvas.getContext('2d'),
  Width = window.innerWidth,
  Height = window.innerHeight,
  lastTime;

canvas.width = Width;
canvas.height = Height;

var Enemy = function () {
  this.x = Math.random() * Width;
  this.y = 0;
  this.width = 30;
  this.height = 30;
  this.speedX = 0;
  this.speedY = 70;
  //console.log('enemy has been created');
};

Enemy.prototype.update = function (dt) {
  this.x += dt * this.speedX;
  this.y += dt * this.speedY;
};

Enemy.prototype.render = function (ctx) {
  drawRect(ctx, this.x, this.y, this.width,this.height);
};

var Weapon = function (x, y, speedX, speedY) {
  this.x = x;
  this.y = y;
  this.width = 30;
  this.height = 30;
  this.speedX = speedX || 0;
  this.speedY = speedY || 0;
};

Weapon.prototype.update = function (dt) {
  this.x += dt * this.speedX;
  this.y += dt * this.speedY;
};

Weapon.prototype.render = function (ctx) {
  drawShuriken(ctx, this.x, this.y, this.width);
};