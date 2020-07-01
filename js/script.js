$(function () {

  //コントローラ定義
  var controller = new ScrollMagic.Controller();

  /*********************
    アニメーション定義
  **********************/

  /**
  サンプル
  var scene = new ScrollMagic.Scene({
    triggerElement: ".tg-ride", //トリガー
    duration: 100, //数値分スクロールするまで
    offset: 50, //数値分スクロールしたら
    reverse: false, //逆スクロール対応可否
  })
  .addIndicators({ name: '大きくなるよ' }) // デバッグ
  .setTween(big)
  scene.addTo(controller);
  **/

  TweenMax.from(".tg-ride", 2, {
    opacity: 0
  });

  TweenMax.set(".tg-point", {
    scale: 0
  });

  var price_01 = gsap.timeline().from(".tg-price__move01", {
    y: -200,
    stagger: 0.06,
    duration: 0.8,
    ease: "back"
  });

  var price_02 = gsap.timeline().from(".tg-price__move02", {
    y: -200,
    stagger: 0.06,
    duration: 0.8,
    ease: "back"
  });

  var price_03 = gsap.timeline().from(".tg-price__move03", {
    y: -200,
    stagger: 0.06,
    duration: 0.8,
    ease: "back"
  });

  var flower = TweenMax.to(".tg-point", .4, {
    scale: 1,
    stagger: {
      amount: .4,
      grid: "auto",
      from: "edges"
    }
  });

  var insta = TweenMax.from(".tg-insta", .4, {
    scale: 0.2,
    y: 60,
    ease: "power1.inOut",
    delay: .2,
    stagger: {
      amount: .3,
      grid: "auto",
      from: "center"
    }
  });

  var question_right = TweenMax.from(".-right", {
    x: 400,
    stagger: {
      amount: .2
    }
  });

  var question_left = TweenMax.from(".-left", {
    x: -400,
    stagger: {
      amount: .2
    }
  });

  var tech = TweenMax.from(".tg-tech", {
    scale:0,
  });

  var circle = TweenMax.from(".tg-component01, .tg-component02, .tg-component03, .tg-component04",{
    duration: .4,
    scale: 0,
    rotation:180,
    stagger: 0.2
  });

  var count = TweenMax.from(".tg-count01, .tg-count02, .tg-count03",{
    scale: 2,
    stagger: 0.4
  });

  var countTxt = TweenMax.from(".tg-countTxt01, .tg-countTxt02, .tg-countTxt03", {
    scale: 0,
    stagger: 0.4
  });

  var tgSmall = TweenMax.from(".tg-small", {
      y:-400
  });

  var faq = TweenMax.from(".tg-faq", .8,{
    opacity:0,
    y:200
  });

  /*********************
    アニメーション実行
  **********************/

  //tg-02
  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-02",
      reverse: false,
    })
    .setTween(price_01)
  scene.addTo(controller);

  //tg-03
  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-03",
      reverse: false,
    })
    .setTween(flower)
  scene.addTo(controller);

  //tg-04
  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-04",
      reverse: false,
    })
    .setTween(insta)
  scene.addTo(controller);

  //tg-06
  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-06",
      reverse: false,
    })
    .setTween(question_right)
  scene.addTo(controller);

  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-06",
      reverse: false,
    })
    .setTween(question_left)
  scene.addTo(controller);

  //tg-07
   var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-07",
      reverse: false,
    })
    .setTween(tech)
  scene.addTo(controller);

  //tg-08
  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-08",
      reverse: false,
    })
    .setTween(price_02)
  scene.addTo(controller);

  //tg-10
  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-10",
      reverse: false,
    })
    .setTween(circle)
  scene.addTo(controller);

  //tg-11
  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-11",
      reverse: false,
    })
    .setTween(count)
  scene.addTo(controller);

  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-11",
      reverse: false,
    })
    .setTween(countTxt)
  scene.addTo(controller);

  /* tg-12 */
  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-12",
      reverse: false,
    })
    .setTween(tgSmall)
  scene.addTo(controller);

  /* tg-14 */
  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-14",
      reverse: false,
    })
    .setTween(price_03)
  scene.addTo(controller);

  /* tg-15 */
  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-15",
      reverse: false,
    })
    .setTween(faq)
  scene.addTo(controller);

  /***********************
    SVG-animation
  ************************/
  new Vivus('tg-title', {
    duration: 3,
    start: 'autostart',
    type: 'scenario-sync',
    pathTimingFunction: Vivus.EASE_OU
  },function(obj){
      obj.el.classList.add('fill-01');
    });

  var scene = new ScrollMagic.Scene({
      triggerElement: ".tg-10",
      reverse: false,
    }).on('start' ,function(){
    var arrow = new Vivus('tg-arrow', {
    duration: 32,
    start: 'autostart',
    type: 'scenario-sync',
    pathTimingFunction: Vivus.EASE_OU
  },function(obj){
      obj.el.classList.add('fill-02');
    });
  });
  scene.addTo(controller);

});