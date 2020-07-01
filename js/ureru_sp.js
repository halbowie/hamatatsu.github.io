/*===========================
>>>スクロール量でのアクション
=============================*/
$(function() {
   $(document).scroll(function() {

      var sc = $(this).scrollTop();
      var on = Boolean("true");;

		if($('#floating-appear').length && $('#floating-disappear').length) {
			var fire = $('#floating-appear').offset().top;
			var scbottom = $('#floating-disappear').offset().top;
		}
		else{
         if($('.offer').length > 0){
            var fire = $('.offer').offset().top + 1163;
            var scbottom = document.getElementById('wrapper').clientHeight - 700;
         }
         else{
            var fire = 0;
            var scbottom = 0;
            on = Boolean("false");;
         }
		}
      if (on){
         if(sc > fire && sc <= scbottom) {
				$('.float-btn').addClass('float-btn-action');
         }
         else {
            $('.float-btn').removeClass('float-btn-action');
         }
      }
   });
});



/*===========================
>>>フロートアニメーション
=============================*/
$(function() {
  $(document).ready(function(){
      $(".float-btn img").addClass('animated tada infinite');
  });
});

/*===========================
>>>アンカースクロール
=============================*/
$(function() {
	$(window).load(function() {
		// 画面内アンカースクロール
		var offsetY = 0;
		var time = 500;
		$('a[href^="#"]').click(function() {
			var target = $(this.hash);
			if (!target.length) return ;
			var targetY = target.offset().top+offsetY;
			$('html,body').animate({scrollTop: targetY}, time, 'swing');
			window.history.pushState(null, null, this.hash);
			return false;
		});
	});
});

/*===========================
>>>ボタンアクション
=============================*/

jQuery(function() {
	$('#confirm_button').hide();
	$('#efo_required_box').on('DOMSubtreeModified propertychange', function() {
		if($('#efo_required_box').hasClass('complete')){
			$('#confirm_button').show();
			$('#confirm_button_disable').hide();
		}else{
			$('#confirm_button').hide();
			$('#confirm_button_disable').show();
		}
	});
});

/*===========================
>>>accordion
=============================*/
var trigger = document.querySelectorAll('.js-accordion');
for (var i = 0; i < trigger.length; i++) {
  trigger[i].addEventListener('click', function() {
    var body = this.nextElementSibling;
    if (this.classList.contains('-active')) {
      this.classList.remove('-active');
      body.classList.remove('-open');
    } else {
      this.classList.add('-active');
      body.classList.add('-open');
    }
  });
}

/*=========================
>>> バリデート
/*=========================*/
$(function() {
	/**
	 * 性別初期設定
	 */
	if ( !$('input.input_sex:checked').val() ) {
		// 女性をデフォルト選択
		$('input#OrderSex2').prop('checked','checked');
	}
	if ( !$('input.ureru_efo_mail_optin_flg:checked').val() ) {
		// メールを受け取るにチェック
		$('input#OrderMailOptinFlg').prop('checked','checked');
	}
});

/*===========================
>>>コンテンツ挿入
=============================*/
$(function () {
	//placeholder
	$('#OrderFamilyName').attr('placeholder', '山田');
	$('#OrderGivenName').attr('placeholder', '花子');

	$('#OrderFamilyKana').attr('placeholder', 'やまだ');
	$('#OrderGivenKana').attr('placeholder', 'はなこ');

	$('#OrderZip1').attr('placeholder', '012');
	$('#OrderZip2').attr('placeholder', '3456');

	$('#OrderAddress1').attr('placeholder', '○○市△△区□町1-1');
	$('#OrderAddress2').attr('placeholder', '○○マンション101号');

	$('#OrderTelNo1').attr('placeholder', '03');
	$('#OrderTelNo2').attr('placeholder', '1234');
	$('#OrderTelNo3').attr('placeholder', '5678');

	$('#OrderEmail').attr('placeholder', '○○○@yahoo.co.jp');
	$('#OrderEmailConfirm').attr('placeholder', '○○○@yahoo.co.jp');

	// 後払いのカスタムコンテンツの挿入
	var options = $('select#form-payment-method option');
	var single_payment = $('#form-single-payment-method strong');
	if(options.length){
		if (optionContains(options, 'atodene')){
			$("#form_payment_method_select").after(atodeneText());
			$('select#form-payment-method').val('atodene');
		} else if (optionContains(options, 'np_wiz')) {
			$("#form_payment_method_select").after(npText());
			$('select#form-payment-method').val('np_wiz');
		}
	} else if (single_payment.length){
		if(single_payment[0].innerText.indexOf('ATODENE') != -1){
			$('#form-single-payment-method strong').after(atodeneText());
		} else if (single_payment[0].innerText.indexOf('NP後払いwiz') != -1){
			$('#form-single-payment-method strong').after(npText());
		}
	}

  if(document.URL.match("/tgserum_set1")) {
		$('#payment-fee').html('後払い決済手数料：<span style="font-weight:bold;">160円(税別)</span>');
	}

	//クレジットのカスタムコンテンツの挿入
	$("#form_payment_method_credit").prepend(creditText());


　//支払い方法をセレクトボックスからラジオボタンに変更
  // => 決済方法が追加にいなった場合追加
  var html_tags = '';
  $('#form-payment-method').children().each(function(){
		var payment_method = $(this).val();
		var payment_text = $(this).text()
		html_tags +='<div id="' + payment_method + '">';
		html_tags +='<label>';
		html_tags +='<input type="radio" name="payment_method" value="' + payment_method + '" id="form-payment-method_' + payment_method + '" class="form-payment-method">';
		html_tags += payment_text +'</label>';
		html_tags +='</div>';
  });
	$('#form_payment_method_select').html(html_tags);
	// 初期表示
	$('input[name=payment_method]:eq(0)').prop('checked', true);

  //支払い方法選択時の特殊コンテンツ表示
  $("input[name='payment_method']").change(function() {
    var $self = $(this);
    var $val = $self.val();
    if ($val === 'credit') {
      selectCredit();
    } else if ($val === 'np_wiz') {
			selectNpWiz();
	} else if ($val === 'atodene') {
      selectAtodene();
    } else if ($val === 'amazon_payments') {
      selectAmazonPayments();
    } else {
      $('div#form_payment_method_credit').slideUp();
			$('div#form_payment_method_collect').slideUp();
			$('div#form_payment_method_np').slideUp();
			$('div#form_payment_method_amazon_payments').slideUp();
			$('div#form_payment_method_atodene').slideDown();
    }
  });

   // AmazonPayの場合、Amazonログインするとリロードがかかってしまうので、ラジオボタンを強制選択させる
	if ($('#form_payment_method_amazon_payments_form').length && $('#form_payment_method_amazon_payments_form')[0].clientHeight > 0){
		$('#form-payment-method_amazon_payments').prop('checked', true);
		selectAmazonPayments();
	}

	// 初期表示(credit)
	if ($("input[name='payment_method']").val() === 'credit' || $('div#form-single-payment-method-credit').size() > 0) {
		selectCredit();
	}
	// 初期表示(np後払い)
	if ($("input[name='payment_method']").val() === 'np_wiz' || $('div#form-single-payment-method-np').size() > 0) {
		console.log('np');
		selectNpWiz();
	}

	// 初期表示(atodene)
	if ($("input[name='payment_method']").val() === 'atodene' || $('div#form-single-payment-method-atodene').size() > 0) {
		selectAtodene();
	}

	// 初期表示（AmazonPayment）
	if  ($("input[name='payment_method']").val() === 'amazon_payments' || $('div#form-single-payment-method-amazon').size() > 0 || $('PayWithAmazonAllArea').length > 0){
		selectAmazonPayments();
	}

	/**
	 *  amazon payボタン周辺テキスト
	 */
	$('#PayWithAmazon').before('<p class="ap_info">▼Amazon Payでのお支払いはこちらをクリック▼</p>');

	// 「お客様情報」を「申し込みフォーム」に変更(20181112)
	$('h2#form_checkout_title.form_title').html("<p class=form_checkout_title_text>お申し込みフォーム</p>")

	//キャッシュレス還元
	$('#input_payment_method').before(cashlessText());
});

function optionContains(options, val) {
  return options.filter(function(){ return $(this).val() == val; }).length;
};

function atodeneText(){
	return (function(){/*
		<div id="form_payment_method_atodene">
			<div id="atodene_note">
				<div class="atodene_title">
					<div class="atodene_image">
						<a href="http://c.atodene.jp/d-rule/" target="_blank"><img src="/templates/sp_basic_white/img/atodene-d_468x64.gif" style="max-width:468px;" alt="後払い決済サービス「アトディーネ」"></a>
					</div>
				</div>
				<div class="atodene_description">
					<span style="font-weight:bold;color:#ff0000;">※必ずお読みください</span><br/>
					ジャックス・ペイメント・ソリューションズ株式会社が提供する後払い決済サービスです。<br>
					購入商品の到着を確認してから、コンビニエンスストア・金融機関で後払いできる安心・簡単な決済方法です。<br>
					商品に同封してお送りする請求書にて、期限日までにお支払ください。<br>
					（配送先がお客様住所と異なる場合、請求書は郵送されます）<br>
					<br>
					後払い決済手数料：<span style="font-weight:bold;">初回無料</span>（2回目以降手数料がかかります。）<br>
					ご利用限度額：<span style="color:#ff0000;">累計残高で54,000円（税込）迄（他店舗含む）</span><br>
					<br>
					<span style="color:#ff0000;">お客様は上記バナーをクリックし「注意事項」及び「個人情報の取扱いについて」に記載の内容をご確認・ご承認の上、<br>
					本サービスのお申し込みを行うものとします。<br>
					※ご承認いただけない場合は本サービスのお申し込みをいただけませんので、ご了承ください。</span>
					<br>
					※以下の場合サービスをご利用いただけません。予めご了承ください。<br>
					・郵便局留め・運送会社営業所留め（営業所での引き取り）<br>
					・商品の転送<br>
					・コンビニ店頭での受け渡し<br>
					<span>※ご本人様確認のため、ご連絡させて頂くことがございます。予めご了承ください。</span>
				</div>
			</div>
	 </div>
 */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
}

function npText(){
	return (function(){/*
		<div id="form_payment_method_np">
				<div id="form_payment_method_np_form">
						<a href="https://np-atobarai.jp/about/index_wiz.html" target="_blank"><img src="https://libeiro.co.jp/lp-material/share/img/np/20191127.png" style="max-width:468px;" alt="NP後払いwiz" /></a>
						<div class="payment_description">
								<span style="font-weight:bold;color:#ff0000;">※必ずお読みください</span><br/>
								<div id="np_note"><div class="np_title">○このお支払方法の詳細</div>
                請求書は商品に同封されていますので、ご確認ください。<br/>
                ＊注文者様のご住所とお届け先のご住所が異なる場合は、<br/>
                請求書は商品に同封されず、購入者様へお送りいたします。<br/>
                商品代金のお支払いは「コンビニ」「郵便局」「銀行」「LINE Pay」どこでも可能です。
                請求書の記載事項に従って発行日から14日以内にお支払いください。<br/>
						    <div class="np_title">○ご注意</div>
                <span id="payment-fee">後払い手数料：<span style="font-weight:bold;">初回無料、2回目以降160円（税別）</span></span><br/>
                後払いのご注文には、株式会社ネットプロテクションズの提供するNP後払いwizサービスが適用され、サービスの範囲内で個人情報を提供し、代金債権を譲渡します。ご利用限度額は<span style="color:#ff0000;">累計残高で55,000円（税込）迄</span>です。<br/>
                （NP後払いサービスご利用分も含まれます。）<br/>
                詳細はバナーをクリックしてご確認ください。<br/>
                ご利用者が未成年の場合、法定代理人の利用同意を得てご利用ください。
						</div>
				</div>
		</div>
 */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
}

function creditText() {
	return (function(){/*
			<span style="line-height:1.7em;font-size:13px;display:block;text-align:center;margin: 0 auto;max-width: 640px;">
				<img src="https://d3561rmn4biss.cloudfront.net/1505/lp_ca/smp/img/creca.jpg" alt="クレジットカード">
			</span>
	*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
};

function cashlessText() {
	return (function(){/*
		<div class="cashless">
		 <div>
		   <div class="text">クレジットカードでお支払いの方が対象です</div>
		   <img src="https://libeiro.co.jp/lp-material/cp/cashless/cashless.png" alt="5%還元バナー">
		 </div>
	   </div>
	*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
};

function selectCredit() {
	$('div#form_payment_method_np').slideUp();
	$('div#form_payment_method_collect').slideUp();
	$('div#form_payment_method_atodene').slideUp();
	$('div#form_payment_method_amazon_payments').slideUp();
	$('div#form_payment_method_credit').slideDown();
};

function selectNpWiz() {
	$('div#form_payment_method_credit').slideUp();
	$('div#form_payment_method_collect').slideUp();
	$('div#form_payment_method_atodene').slideUp();
	$('div#form_payment_method_amazon_payments').slideUp();
	$('div#form_payment_method_np').slideDown();
};

function selectAtodene() {
	$('div#form_payment_method_credit').slideUp();
	$('div#form_payment_method_collect').slideUp();
	$('div#form_payment_method_amazon_payments').slideUp();
	$('div#form_payment_method_np').slideUp();
	$('div#form_payment_method_atodene').slideDown();
};

function selectAmazonPayments() {
	$('div#form_payment_method_np').slideUp();
	$('div#form_payment_method_credit').slideUp();
	$('div#form_payment_method_collect').slideUp();
	$('div#form_payment_method_atodene').slideUp();
	$('div#form_payment_method_amazon_payments').slideDown();
};
