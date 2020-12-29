
class model {
    id: number = 0;

    show = ()=>{
        console.log('id:'+this.id);
    }
}
var m = new model();
m.id = 10;
m.show();
