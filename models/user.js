const dbRef = require ('../utils/database').getDb;
const mongoDB = require ('mongodb');

const ObjectId = mongoDB.ObjectId;

class User {
    constructor (userName, email, cart, id) {
        this.userName = userName;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }
    addToCart (product) {
        const cartProductIndex = this.cart.items.findIndex (cp => {
            return cp.productId.toString () === product._id.toString ();
        });
        let newQunatity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            console.log (newQunatity);
            newQunatity = this.cart.items [cartProductIndex].quantity + 1 ;
            console.log (newQunatity)
            updatedCartItems [cartProductIndex].quantity = newQunatity;
        } else {
            updatedCartItems.push ({
                productId : new ObjectId (product._id), 
                quantity : newQunatity}
            );
        }
        
        
        const db = dbRef ();
        const updatedCart = {items : updatedCartItems};
        return db.collection ('users')
        .updateOne (
            {_id : new ObjectId (this._id)}, 
            {
                $set: {
                    cart : updatedCart
                }
            }
        );
    }
    save () {
        const db = dbRef ();
        return db.collection ('users').insertOne (this);
    }
    static findById (userId) {
        const db = dbRef ();
        return db.collection ('users').find ( {_id : new ObjectId (userId)}).next ();
    }
}

module.exports = User;