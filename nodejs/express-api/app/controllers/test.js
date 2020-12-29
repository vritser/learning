var model = (function () {
    function model() {
        var _this = this;
        this.id = 0;
        this.show = function () {
            console.log('id:' + _this.id);
        };
    }
    return model;
})();
var m = new model();
m.id = 10;
m.show();
