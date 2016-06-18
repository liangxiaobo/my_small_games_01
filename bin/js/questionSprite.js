var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var a_push = [];

// 封装一个问题的对象
var QuestionSprite = (function(_super){
    __extends(QuestionSprite, _super);
    function QuestionSprite(){
        _super.call(this);
        this.initGInfo();
        this.handler = new laya.utils.Handler(this, this.any01, null, true);
        this.tween = Laya.Tween;
        this.ease = Laya.Ease;
        this.init();
        this.initSizeAndStyle();
        // this.initTimerLabel();
    }
    // 初始化大小和样式
    QuestionSprite.prototype.initSizeAndStyle = function(){
        this.pos(0, -Laya.stage.height);
        this.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#ffffff");
    };
    
    // 初始化时间控件
    QuestionSprite.prototype.initTimerLabel = function(){
        var timer_label = new Laya.Label();
        timer_label.text = "计时: 0";
        timer_label.pos(50, 80);
        this.addChild(timer_label);
        var i = 300;
        Laya.timer.frameLoop(1, this, function(e){
            timer_label.text = "计时: " + i--;
            if(i <= 0){
                Laya.timer.clearAll(this);
                // 当总数等于20时停止
                this.createMe();
            }
        }); 
    };
    
    QuestionSprite.prototype.init = function(){
        // 拿到生成表达式对象
        var expression_json = this.generateData();
        var label01 = new Laya.Label();
        label01.text = expression_json.expression + " = ？";
        label01.color = "#000000";
        label01.fontSize = 40;
        label01.stroke = 3;
        label01.strokeColor = "red";
        label01.pos(Laya.stage.width/2, Laya.stage.height/2 - 100);
        // 设置元素的轴心
        label01.pivot(label01.width/2, label01.height/2);
        
        console.log(".....", label01.y+label01.height);
        
        var btn_space_y = 40;
        var label01_y_h = label01.y+label01.height + 50;
        
        // 创建答案按钮
        for(var i = 0; i < 4; i++){
            var ans_btn = new Laya.Button();
            var options_item = expression_json.options[i];
            ans_btn.label = options_item.value;
            ans_btn.labelSize = 20;
            ans_btn.size(100, 30);
            ans_btn.tag = options_item.isAnswer;            
            ans_btn.color = "#000000";
            ans_btn.graphics.drawRect(0, 0, 100, 30, "#ffff00");
            ans_btn.pos(Laya.stage.width/2, label01_y_h+(btn_space_y*i));
            ans_btn.pivot(70, 15);
            ans_btn.on("click", this, this.onBtnClick);
            this.addChild(ans_btn);
       }
        this.addChild(label01);
        
        Laya.stage.addChild(this);
        
        // 动画载入位置
        this.anm_load_point();
    };
    
    // 动画载入位置
    QuestionSprite.prototype.anm_load_point = function(){
        this.tween.to(this, {y: 0}, 800, this.ease.circOut, this.handler, 100);
    };
    
    QuestionSprite.prototype.any01 = function(e){
        console.log(".......1");
        console.log(a_push);
        
        if(a_push.length > 1){
            var tmp_sprite = a_push.shift();
            tmp_sprite.removeSelf();
            console.log("已删除第一项目 ", a_push);
        }
    };
    
    QuestionSprite.prototype.onBtnClick = function(e){
        console.log(e.target.tag);
            if(e.target.tag){
                gInfo.exactness_count++;
                gInfo.setExactnessCountLabel();
            }else{
                gInfo.mistake_count++;
                gInfo.setMistakeCountLabel();
            }
            
            this.createMe();
        
    };
    // 创建自己对象
    QuestionSprite.prototype.createMe = function(){
        // 在每次创建题目之前先清除所有计时
        Laya.timer.clearAll(this);
        if(gInfo.question_count >= 20){
            return false;                                
        }
        
        var b = new QuestionSprite();
        a_push.push(b);
        
        gInfo.question_count++;
        gInfo.setQuestionCountLabel(gInfo.question_count);
    };
    
    // 倒计时
    // QuestionSprite.prototype.autoPay = function(){
        
    // };
    
    // 初始化游戏信息
    QuestionSprite.prototype.initGInfo = function (){
		// 创建显示总数的label
		gInfo.question_count_label = new Laya.Label();
		gInfo.question_count_label.pos(50, 20);
		
		this.addChild(gInfo.question_count_label);
		
        gInfo.exactness_count_label = new Laya.Label();
        gInfo.exactness_count_label.pos(150, 20);
        gInfo.setExactnessCountLabel();
        this.addChild(gInfo.exactness_count_label);
        
        gInfo.mistake_count_label = new Laya.Label();
        gInfo.mistake_count_label.pos(250, 20);
        gInfo.setMistakeCountLabel();
        this.addChild(gInfo.mistake_count_label);
        
	};
        
    
    /**
     * 随机生成表达式
     * @return {expression: "2+3", value: 5, options: [{value: 2, isAnswer: true}, {},{}]}
     */
    QuestionSprite.prototype.generateData = function (){
        // 需要返回的对象
        var result_json = {};
        // 定义一个表达式的类型，表示计算倍数
        var expression_type = [2, 3, 4];
        // 取expression_type数组的长度限制
        var expression_type_max_length = 2;
        // 随机取表达式类型
        var random_expression_index = Math.floor(Math.random() * expression_type_max_length);

        // 生成表达式的最大值
        var expression_max_value = 5;
        // 生成表达式的最小值
        var expression_min_value = 1;

        var expression_arr = [], expression_str = "";

        for (var i = 0; i < expression_type[random_expression_index]; i++) {
            var item_random_value = 1 + Math.floor(Math.random() * expression_max_value);
            expression_arr.push(item_random_value);
        };

        // 组成表达式
        expression_str = expression_arr.join(' + ');
        
        // 输出表达式的值
        expression_answer = eval(expression_str);
        console.log(expression_str, expression_answer);

        /**
         * 生成四个JSON格式的选项
        * @value  选项的值
        * @isAnswer 是否是答案
        */
        var options = [{value: expression_answer, isAnswer: true}];
        // 生成四个选项值
        for(var i = 1; i < 4; i++){
            var option_json_obj = {};

            if (expression_answer - 4 >= 0) {
                option_json_obj.value = expression_answer - i;
            }else{
                option_json_obj.value = expression_answer + i;
            }

            option_json_obj.isAnswer = false;
            options.push(option_json_obj);
        }

        // 将数组乱序
        function shuffle(o){
            for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

        // 乱序的第二种方法
        // var a = options.sort(function(){
        //   return Math.random()-0.5;
        // });
        
        // 给返回对象赋值
        result_json.expression = expression_str;
        result_json.value = expression_answer;
        result_json.options = shuffle(options);

        //console.log("generate options , ", JSON.stringify(shuffle(options)));
        return result_json;
     }
    
    return QuestionSprite;
})(Laya.Sprite);