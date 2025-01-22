//생성자함수

function Item (title,price){
    //this = {};


    this.title = title;
    this.price = price;
    this.showPrice = function(){
        console.log('가격은 ${price} 원입니다.');
    };





    //return this;
}

const item1 = new Item('인형',3000);
const item2 = new Item('인형',4000);
const item3 = new Item('인형',9000);

console.log(item1,item2,item3);

item3.showPrice();
