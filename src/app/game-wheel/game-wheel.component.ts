import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Phaser from 'phaser';
import { Router } from '@angular/router';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-game-wheel',
  templateUrl: './game-wheel.component.html',
  styleUrls: ['./game-wheel.component.scss']
})
export class GameWheelComponent implements OnInit {
  public static sliceArray: {
    degrees: number; startColor: any; endColor: any; rings: number;
    sliceText: string;
    sliceTextStyle:
    {
      fontFamily: string; fontSize: string; color: string;
    };
    sliceTextStroke: number;
    sliceTextStrokeColor: string;
  }[] = [];
  public static routerToBePassed: Router;
  game!: Phaser.Game;
  public participants = '';
  public clicked = false;

  @ViewChild('menuButton') menuButton!: ElementRef;
  @ViewChild('hamburger') hamburger!: ElementRef;
  @ViewChild('navbar') navbar!: ElementRef;
  @ViewChild('menuNav') menuNav!: ElementRef;
  @ViewChild('menuNavItem') menuNavItem!: ElementRef;
  @ViewChild('inputDiv') inputDiv!: ElementRef;
  @ViewChild('infoDiv') infoDiv!: ElementRef;
  @ViewChild('noteDiv') noteDiv!: ElementRef;
  @ViewChild('submitButton') submitButton!: ElementRef;

  public showMenu = false;

  constructor(private router: Router) {
    GameWheelComponent.routerToBePassed = router;
  }

  ngOnInit(): void {

  }

  pickRandomColor(): number {
    const colors = [0xff0000, 0xff8800, 0x00ff00, 0x004400, 0xff00ff, 0x0000ff, 0x000000, 0xffffff, 0x00bfff, 0xffff00, 0x33FFC9];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  createDataForWheel(): void {
    this.clicked = true;
    const participantNameArray = this.participants.split(',');
    const sliceAngleDegree = 360 / participantNameArray.length;

    participantNameArray.forEach(participant => {
      const instanceToAdd = {
        degrees: sliceAngleDegree,
        startColor: this.pickRandomColor(),
        endColor: this.pickRandomColor(),
        rings: 10,
        sliceText: participant.trim(),
        sliceTextStyle: {
          fontFamily: 'Arial Black',
          fontSize: '22px',
          color: '#000077'
        },
        sliceTextStroke: 8,
        sliceTextStrokeColor: '#ffffff'
      };
      GameWheelComponent.sliceArray.push(instanceToAdd);
    });
    console.log(GameWheelComponent.sliceArray);

    // game configuration object
    const gameConfig = {

      // render type
      type: Phaser.CANVAS,

      // game width, in pixels
      width: 600,

      // game height, in pixels
      height: 600,

      // game background color
      backgroundColor: 0xFFB133,

      // scenes used by the game
      scene: [PlayGame]
    };

    // game constructor
    this.game = new Phaser.Game(gameConfig);

    // pure javascript to give focus to the page/frame and scale the game
    window.focus();
    this.resize();
    window.addEventListener('resize', this.resize, false);
  }

  resetTheGame(): void {
    window.location.reload();
  }

  toggleMenu(): void {
    const canvas = document.querySelector('canvas');
    if (!this.showMenu) {
      this.hamburger.nativeElement.classList.add('open');
      this.navbar.nativeElement.classList.add('open');
      this.menuNav.nativeElement.classList.add('open');
      this.inputDiv.nativeElement.style.visibility = 'hidden';
      this.infoDiv.nativeElement.style.visibility = 'hidden';
      this.noteDiv.nativeElement.style.visibility = 'hidden';
      if (canvas) {
        canvas.style.transition = 'transition: all 0.5s ease-in-out;';
      }

      this.showMenu = true;
    } else {
      this.hamburger.nativeElement.classList.remove('open');
      this.navbar.nativeElement.classList.remove('open');
      this.menuNav.nativeElement.classList.remove('open');
      this.inputDiv.nativeElement.style.visibility = 'visible';
      this.infoDiv.nativeElement.style.visibility = 'visible';
      this.noteDiv.nativeElement.style.visibility = 'visible';
      if (canvas) {
        canvas.style.transition = 'transition: all 0.5s ease-in-out;';
      }
      this.showMenu = false;
    }
  }

  resize(): void {
    const canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = Number(this.game.config.width) / Number(this.game.config.height);
    if (windowRatio < gameRatio) {
      canvas!.style.width = windowWidth + 'px';
      canvas!.style.height = (windowWidth / gameRatio) + 'px';
      canvas!.style.borderRadius = '10vh';
      canvas!.style.border = '2px double gold';
      canvas!.style.marginLeft = '10%';
    }
    else {
      canvas!.style.width = (windowHeight * gameRatio) + 'px';
      canvas!.style.height = windowHeight + 'px';
      canvas!.style.borderRadius = '10vh';
      canvas!.style.border = '2px double gold';
      canvas!.style.marginLeft = '10%';
    }
  }
}

class PlayGame extends Phaser.Scene {
  wheelContainer!: Phaser.GameObjects.Container;
  pin!: Phaser.GameObjects.Sprite;
  prizeText!: Phaser.GameObjects.Text;
  canSpin!: boolean;

  public game: any;
  public gameOptions = {

    slices: GameWheelComponent.sliceArray,
    // slices configuration
    // slices: [{
    //     degrees: 360,
    //     startColor: 0xff0000,
    //     endColor: 0xff8800,
    //     rings: 10,
    //     sliceText: '',
    //     sliceTextStyle: {
    //       fontFamily: 'Arial Black',
    //       fontSize: '22px',
    //       color: '#000077'
    //     },
    //     sliceTextStroke: 8,
    //     sliceTextStrokeColor: '#ffffff'
    //   },],
    // {
    //   degrees: 45,
    //   startColor: 0xff0000,
    //   endColor: 0xff8800,
    //   rings: 10,
    //   sliceText: 'ABC',
    //   sliceTextStyle: {
    //     fontFamily: 'Arial Black',
    //     fontSize: '22px',
    //     color: '#000077'
    //   },
    //   sliceTextStroke: 8,
    //   sliceTextStrokeColor: '#ffffff'
    // },
    // {
    //   degrees: 45,
    //   startColor: 0x00ff00,
    //   endColor: 0x004400,
    //   rings: 10,
    //   sliceText: 'DEF',
    //   sliceTextStyle: {
    //     fontFamily: 'Arial Black',
    //     fontSize: '22px',
    //     color: '#000077'
    //   },
    //   sliceTextStroke: 8,
    //   sliceTextStrokeColor: '#ffffff'
    // },
    // {
    //   degrees: 45,
    //   startColor: 0xff00ff,
    //   endColor: 0x0000ff,
    //   rings: 10,
    //   sliceText: 'GHI',
    //   sliceTextStyle: {
    //     fontFamily: 'Arial Black',
    //     fontSize: '22px',
    //     color: '#000077'
    //   },
    //   sliceTextStroke: 8,
    //   sliceTextStrokeColor: '#ffffff'
    // },
    // {
    //   degrees: 45,
    //   startColor: 0x000000,
    //   endColor: 0xffffff,
    //   rings: 10,
    //   sliceText: 'JKL',
    //   sliceTextStyle: {
    //     fontFamily: 'Arial Black',
    //     fontSize: '22px',
    //     color: '#000077'
    //   },
    //   sliceTextStroke: 8,
    //   sliceTextStrokeColor: '#ffffff'
    // },
    // {
    //   degrees: 45,
    //   startColor: 0x000000,
    //   endColor: 0x00bfff,
    //   rings: 10,
    //   sliceText: 'MNO',
    //   sliceTextStyle: {
    //     fontFamily: 'Arial Black',
    //     fontSize: '22px',
    //     color: '#000077'
    //   },
    //   sliceTextStroke: 8,
    //   sliceTextStrokeColor: '#ffffff'
    // },
    // {
    //   degrees: 45,
    //   startColor: 0x000000,
    //   endColor: 0xff00ff,
    //   rings: 10,
    //   sliceText: 'PQR',
    //   sliceTextStyle: {
    //     fontFamily: 'Arial Black',
    //     fontSize: '22px',
    //     color: '#000077'
    //   },
    //   sliceTextStroke: 8,
    //   sliceTextStrokeColor: '#ffffff'
    // },
    // {
    //   degrees: 45,
    //   startColor: 0x000000,
    //   endColor: 0xffff00,
    //   rings: 10,
    //   sliceText: 'STU',
    //   sliceTextStyle: {
    //     fontFamily: 'Arial Black',
    //     fontSize: '22px',
    //     color: '#000077'
    //   },
    //   sliceTextStroke: 8,
    //   sliceTextStrokeColor: '#ffffff'
    // },
    // {
    //   degrees: 45,
    //   startColor: 0x000000,
    //   endColor: 0x33FFC9,
    //   rings: 10,
    //   sliceText: 'VWX',
    //   sliceTextStyle: {
    //     fontFamily: 'Arial Black',
    //     fontSize: '22px',
    //     color: '#000077'
    //   },
    //   sliceTextStroke: 8,
    //   sliceTextStrokeColor: '#ffffff'
    // }


    // wheel rotation duration range, in milliseconds
    rotationTimeRange: {
      min: 3000,
      max: 4500
    },

    // wheel rounds before it stops
    wheelRounds: {
      min: 2,
      max: 11
    },

    // degrees the wheel will rotate in the opposite direction before it stops
    backSpin: {
      min: 3,
      max: 20
    },

    // wheel radius, in pixels
    wheelRadius: 240,

    // color of stroke lines
    strokeColor: 0xDAF7A6,

    // width of stroke lines
    strokeWidth: 4
  };

  // constructor
  constructor() {
    super('PlayGame');
  }

  // method to be executed when the scene preloads
  preload(): void {
    this.load.image('pin', ConstantsService.imageAssetsBasePath +  'new-pin.png'),
    {
      frameWidth: 50,
      frameHeight: 50
    };

  }

  // method to be executed once the scene has been created
  create(): void {
    // starting degrees
    let startDegrees = -90;

    // making a graphic object without adding it to the game
    const graphics = this.make.graphics({
      x: 0,
      y: 0,
      add: false
    });

    // adding a container to group wheel and icons
    this.wheelContainer = this.add.container(this.game.config.width / 2, this.game.config.height / 2);

    // array which will contain all icons
    const iconArray = [];

    for (var i = 0; i < this.gameOptions.slices.length; i++) {

      // converting colors from 0xRRGGBB format to Color objects
      var startColor = Phaser.Display.Color.ValueToColor(this.gameOptions.slices[i].startColor);
      var endColor = Phaser.Display.Color.ValueToColor(this.gameOptions.slices[i].endColor)

      for (var j = this.gameOptions.slices[i].rings; j > 0; j--) {

        // interpolate colors
        var ringColor = Phaser.Display.Color.Interpolate.ColorWithColor(startColor, endColor, this.gameOptions.slices[i].rings, j);

        // converting the interpolated color to 0xRRGGBB format
        var ringColorString = Phaser.Display.Color.RGBToString(Math.round(ringColor.r), Math.round(ringColor.g), Math.round(ringColor.b), 0, '0x');

        // setting fill style
        graphics.fillStyle(Number(ringColorString), 1);

        // drawing the slice
        graphics.slice(this.gameOptions.wheelRadius + this.gameOptions.strokeWidth, this.gameOptions.wheelRadius + this.gameOptions.strokeWidth, j * this.gameOptions.wheelRadius / this.gameOptions.slices[i].rings, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + this.gameOptions.slices[i].degrees), false);

        // filling the slice
        graphics.fillPath();
      }

      // setting line style
      graphics.lineStyle(this.gameOptions.strokeWidth, this.gameOptions.strokeColor, 1);

      // drawing the biggest slice
      graphics.slice(this.gameOptions.wheelRadius + this.gameOptions.strokeWidth, this.gameOptions.wheelRadius + this.gameOptions.strokeWidth, this.gameOptions.wheelRadius, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + this.gameOptions.slices[i].degrees), false);

      // stroking the slice
      graphics.strokePath();

      if (this.gameOptions.slices[i].sliceText != undefined) {
        Phaser.GameObjects.TextStyle

        // the text
        let text = this.add.text(this.gameOptions.wheelRadius * 0.75 * Math.cos(Phaser.Math.DegToRad(startDegrees + this.gameOptions.slices[i].degrees / 2)), this.gameOptions.wheelRadius * 0.75 * Math.sin(Phaser.Math.DegToRad(startDegrees + this.gameOptions.slices[i].degrees / 2)), this.gameOptions.slices[i].sliceText, this.gameOptions.slices[i].sliceTextStyle);

        // set text origin to its center
        text.setOrigin(0.5);

        // set text angle
        text.angle = startDegrees + this.gameOptions.slices[i].degrees / 2 + 90;

        // stroke text, if required
        if (this.gameOptions.slices[i].sliceTextStroke && this.gameOptions.slices[i].sliceTextStrokeColor) {
          text.setStroke(this.gameOptions.slices[i].sliceTextStrokeColor, this.gameOptions.slices[i].sliceTextStroke);
        }

        // add text to iconArray
        iconArray.push(text);
      }

      // updating degrees
      startDegrees += this.gameOptions.slices[i].degrees;

    }

    // generate a texture called 'wheel' from graphics data
    graphics.generateTexture('wheel', (this.gameOptions.wheelRadius + this.gameOptions.strokeWidth) * 2, (this.gameOptions.wheelRadius + this.gameOptions.strokeWidth) * 2);

    // creating a sprite with wheel image as if it was a preloaded image
    var wheel = this.add.sprite(0, 0, 'wheel');

    // adding the wheel to the container
    this.wheelContainer.add(wheel);

    // adding all iconArray items to the container
    this.wheelContainer.add(iconArray);

    // adding the pin in the middle of the canvas
    this.pin = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'pin');

    // adding the text field
    this.prizeText = this.add.text(this.game.config.width / 2, this.game.config.height - 20, '', {
      font: 'bold 32px Arial',
      align: 'center',
      color: 'blue',

    }).setInteractive()
      .on('pointerdown', () => this.navigateToQuiz());;

    // center the text
    this.prizeText.setOrigin(0.5);

    // the game has just started = we can spin the wheel
    this.canSpin = true;

    // waiting for your input, then calling 'spinWheel' function
    this.input.on('pointerdown', this.spinWheel, this);
  }
  navigateToQuiz() {
    var canvas = document.querySelector('canvas');
    canvas?.remove();
    GameWheelComponent.routerToBePassed.navigateByUrl('/quiz', { skipLocationChange: true });
  }

  // function to spin the wheel
  spinWheel() {

    // can we spin the wheel?
    if (this.canSpin) {

      // resetting text field
      this.prizeText.setText('');

      // the wheel will spin round for some times. This is just coreography
      var rounds = Phaser.Math.Between(this.gameOptions.wheelRounds.min, this.gameOptions.wheelRounds.max);

      // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
      var degrees = Phaser.Math.Between(0, 360);

      // then will rotate back by a random amount of degrees
      var backDegrees = Phaser.Math.Between(this.gameOptions.backSpin.min, this.gameOptions.backSpin.max);

      // before the wheel ends spinning, we already know the prize
      var prizeDegree = 0;

      // looping through slices
      for (var i = this.gameOptions.slices.length - 1; i >= 0; i--) {

        // adding current slice angle to prizeDegree
        prizeDegree += this.gameOptions.slices[i].degrees;

        // if it's greater than the random angle...
        if (prizeDegree > degrees - backDegrees) {

          // we found the prize
          var prize = i;
          break;
        }
      }

      // now the wheel cannot spin because it's already spinning
      this.canSpin = false;

      // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
      // the quadratic easing will simulate friction
      this.tweens.add({

        // adding the wheel container to tween targets
        targets: [this.wheelContainer],

        // angle destination
        angle: 360 * rounds + degrees,

        // tween duration
        duration: Phaser.Math.Between(this.gameOptions.rotationTimeRange.min, this.gameOptions.rotationTimeRange.max),

        // tween easing
        ease: 'Cubic.easeOut',

        // callback scope
        callbackScope: this,

        // function to be executed once the tween has been completed
        // function to be executed once the tween has been completed
        onComplete: (tween) => {

          // another tween to rotate a bit in the opposite direction
          this.tweens.add({
            targets: [this.wheelContainer],
            angle: this.wheelContainer.angle - backDegrees,
            duration: Phaser.Math.Between(this.gameOptions.rotationTimeRange.min, this.gameOptions.rotationTimeRange.max) / 2,
            ease: 'Cubic.easeIn',
            callbackScope: this,
            onComplete: () => {

              if (this.gameOptions.slices[prize].sliceText.toLowerCase() === 'bss' || this.gameOptions.slices[prize].sliceText.toLowerCase() === 'anand' || this.gameOptions.slices[prize].sliceText.toLowerCase() === 'bhawani' || this.gameOptions.slices[prize].sliceText.toLowerCase() === 'shekhawat') {
                this.canSpin = true;
                this.prizeText.text = '';
                this.spinWheel();
                return;
              }
              // displaying prize text
              this.prizeText.setText('Let\'s Go! ' + this.gameOptions.slices[prize].sliceText);

              // player can spin again
              this.canSpin = true;
            }
          });
        }
      });
    }
  }
}
