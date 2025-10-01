// game.js
import Phaser from 'phaser';

class AirKingdom extends Phaser.Scene {
  constructor() {
    super({ key: 'AirKingdom' });
  }

  preload() {
    // 加载游戏资源
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('bullet', 'assets/bullet.png');
  }

  create() {
    // 创建游戏对象
    this.player = this.add.image(100, 100, 'player');
    this.enemies = [];
    this.bullets = [];

    // 创建敌机
    for (let i = 0; i < 10; i++) {
      const enemy = this.add.image(Math.random() * 800, Math.random() * 600, 'enemy');
      this.enemies.push(enemy);
    }

    // 创建玩家子弹
    this.input.on('pointerdown', () => {
      const bullet = this.add.image(this.player.x, this.player.y, 'bullet');
      this.bullets.push(bullet);
    });
  }

  update(time, delta) {
    // 更新游戏状态
    this.player.x += 5;

    // 更新敌机位置
    this.enemies.forEach((enemy) => {
      enemy.x += 2;
      if (enemy.x > 800) {
        enemy.x = 0;
      }
    });

    // 更新子弹位置
    this.bullets.forEach((bullet) => {
      bullet.y -= 10;
      if (bullet.y < 0) {
        bullet.destroy();
      }
    });

    // 碰撞检测
    this.enemies.forEach((enemy) => {
      this.bullets.forEach((bullet) => {
        if (Phaser.Geom.Intersects.GetRectangleToRectangle(enemy.getBounds(), bullet.getBounds())) {
          enemy.destroy();
          bullet.destroy();
        }
      });
    });
  }
}

const config = {
  type: Phaser.CANVAS,
  parent: 'game',
  width: 800,
  height: 600,
  scene: [AirKingdom],
};

new Phaser.Game(config);