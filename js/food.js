class Food {
    constructor() {
        this.image = loadImage("images/Milk.png");
        var foodStock;
        var lastFed;
    }

    getFoodStock() {
        return this.foodStock;
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    deductFood() {
        if(this.foodStock > 0) {
            this.foodStock = this.foodStock+1;
        }
    }
    getFedTime(lastFed) {
        this.lastFed = lastFed;
    }

    bedroom() {
        background(bedroom, 200, 400);
    }

    garden() {
        background(garden, 200, 400);
    }

    washroom() {
        background(washroom, 200, 400);
    }

    display() {
        var x = 80, y = 100;

        imageMode(CENTER);
        image(this.image, 720, 720, 70, 70);
        

        if(this.foodStock != 0) {
            for(var i = 0; i < this.foodStock; i++) {
                if(i % 10 === 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
}