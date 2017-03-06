/**
 * 
 * 一个小小的canvas图形库
 * size 是一个正方形的边长，该正方形能刚好完全包裹住所绘图形。默认为40
 * x、y 是图形的中心坐标。
 * 
 */

function drawShuriken(ctx, x, y, size, rotate) {
  // TODO: rotate有bug
  size = size || 40;
  rotate = rotate || 0;

  ctx.beginPath();
  ctx.arc(x, y, size / 8, 0, Math.PI * 2);
  ctx.moveTo(x - size / 2, y);
  ctx.lineTo(x - size / 6, y - size / 6);
  ctx.lineTo(x, y - size / 2);
  ctx.lineTo(x + size / 6, y - size / 6);
  ctx.lineTo(x + size / 2, y);
  ctx.lineTo(x + size / 6, y + size / 6);
  ctx.lineTo(x, y + size / 2);
  ctx.lineTo(x - size / 6, y + size / 6);
  ctx.closePath();
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI * 2 / 360 * rotate);
  ctx.stroke();
  ctx.restore();
}

function drawRect(ctx, x, y, sizeX, sizeY) {
  sizeX = sizeX || 40;
  sizeY = sizeY || 40;

  ctx.beginPath();
  ctx.moveTo(x - sizeX / 2, y - sizeY / 2);
  ctx.lineTo(x + sizeX / 2, y - sizeY / 2);
  ctx.lineTo(x + sizeX / 2, y + sizeY / 2);
  ctx.lineTo(x - sizeX / 2, y + sizeY / 2);
  ctx.closePath();
  ctx.stroke();
}