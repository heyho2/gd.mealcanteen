var Validate = {
    isEmpty: function(value) {
        if (value === '') return true;
        var reg = /^[\s\n]+$/;
        return reg.test();
    },
    length: function(value, min, max){
        value = value.trim();
        if ((value.length >= min) && (value.length <= max) ) {
            return true;
        }
    },
    isEmail: function(value) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        return reg.test(value);
    },
    isMobile: function(value) {
        var reg = /^1[345789][\d]{9}$/;
        return reg.test(value);
    },
    isIdCard: function(value) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
        return reg.test(value);
    },
    alert: function(title, content, callback) {
        var dialogHtml = '<div class="mubu"><div class="dialog-box"><h4>'+title+
        '</h4><p>'+content+'</p>'+
        '<a class="dialog-submit">确定</a></div></div>';

        $('section').append(dialogHtml);

        $('.dialog-submit').one('click', function(){
            var dialog = $(this).parents('.mubu');
            dialog.fadeOut('normal', function(){
                dialog.remove();
            });
            callback();
        });
    }
};

export default Validate;