(function()
{
	var Sprite  = Laya.Sprite;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;
    var Tween = Laya.Tween;
    var Ease = Laya.Ease;
    
    var g_obj = null;
    

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";
        main();
	})();
    
    // 
    function main(){
       var q = new QuestionSprite();
       a_push.push(q);
	   gInfo.question_count++;
	   gInfo.setQuestionCountLabel(gInfo.question_count);
	   
	//    var a = new Laya.Label();
	//    a.text = "10";
	//    a.pos(100, 50);
	//    a.zOrder = 1000;
	//    Laya.stage.addChild(a);
    }
	
	
	
})();