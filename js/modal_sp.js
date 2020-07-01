/*===========================
>>>モーダル
=============================*/
//modal
$(function(){
  var scrollPosition;
　//テキストリンクをクリックしたら
  $("#js-modalBtn").click(function(){
      scrollPosition = $(window).scrollTop();
      $('body').addClass('fixed').css({'top': -scrollPosition});
      //body内の最後に<div id="modal-bg"></div>を挿入
      $("body").append('<div id="js-modal__bg"></div>');

     //モーダルウィンドウを表示
     $("#js-modal__bg,#js-modal").fadeIn("slow");

      //画面中央を計算する関数を実行
      modalResize();

     //画面のどこかをクリックしたらモーダルを閉じる
       $("#js-modal__bg,#js-modal").click(function(){
           $("#js-modal,#js-modal__bg").fadeOut("slow",function(){
          //挿入した<div id="modal-bg"></div>を削除
               $('#js-modal__bg').remove();
               $('body').removeClass('fixed').css({'top': 0});
               window.scrollTo( 0 , scrollPosition );
          });

         });

     //画面の左上からjs-modalの横幅・高さを引き、その値を2で割ると画面中央の位置が計算できます
      $(window).resize(modalResize);
      function modalResize(){

            var w = $(window).width();
            var h = $(window).height();

             var cw = $("#js-modal").outerWidth();
            var ch = $("#js-modal").outerHeight();

         //取得した値をcssに追加する
             $("#js-modal").css({
                 "left": ((w - cw)/2) + "px",
                 "top": ((h - ch)/2) + "px"
           });
      };
    });
 });
