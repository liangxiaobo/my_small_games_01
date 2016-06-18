var gInfo = {
    // 答过的数量
    question_count: 0,
    // 答对的数量
    exactness_count: 0,
    // 答错的数量
    mistake_count: 0,
    // 总数
    question_count_label: null,
    
    exactness_count_label: null,
    
    mistake_count_label: null,
    
    setMistakeCountLabel: function(){
        this.mistake_count_label.text = "错误: " + this.mistake_count;
    },
    
    setExactnessCountLabel: function(){
        this.exactness_count_label.text = "正确: " + this.exactness_count;
    },
    
    setQuestionCountLabel:function(){
        this.question_count_label.text = "总数: " + this.question_count;
    }
}
