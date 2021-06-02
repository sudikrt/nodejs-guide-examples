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
    getCart () {
        const db = dbRef ();
        const productIds = this.cart.items.map (item => item.productId);
        return db.collection ('products')
        .find ({_id : {$in : productIds}})
        .toArray ()
        .then (products => {
            return products.map (eachProduct => 
                {
                    return {
                        ...eachProduct, 
                        quantity : this.cart.items.find (i => i.productId.toString () === eachProduct._id.toString ()).quantity
                    };
                });
        }); 
    }
    deleteItemFromCart (productId) {
        const updatedCartItems = this.cart.items.filter (ele => ele.productId.toString () !== productId.toString ());

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
    createOrder () {
        const db = dbRef ();
        return this.getCart ().then (products => {
            const order ={
                items : products,
                user : {
                    _id : new ObjectId (this._id),
                    name : this.name,
                    email : this.email
                }
            };
            return db.collection ('orders')
                .insertOne (order)
        }).then (result => {
            this.cart.items = [];
            return db
            .collection ('users')
            .updateOne (
                {_id : new ObjectId (this._id)}, 
                {
                    $set: {
                        cart : {items : []}
                    }
                }
            );
        })
    }
    getOrders () {
        const db = dbRef ();
        return db
        .collection ('orders')
        .find ({'user._id': new ObjectId (this._id)})
        .toArray ();
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