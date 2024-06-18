const { CartItemsModel } = require("../models/cartModel");

const addItemToCartController = async (req, res) => {
  try {
    const { userId, productId, imgURL, name, description, qty, price } =
      req.body;

    let cart = await CartItemsModel.findOne({ userId });
    if (!cart) {
      cart = new CartItemsModel({ userId, cartItem: [] });
    }

    const itemIndex = cart.cartItem.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.cartItem[itemIndex].qty += qty; // Increment quantity by the new quantity
      cart.cartItem[itemIndex].price += price * qty; // Update price based on the quantity
    } else {
      // If item doesn't exist in cart, add it

      cart.cartItem.push({ productId, imgURL, name, description, qty, price }); // Add new item to cart with the given quantity
    }

    await cart.save(); // Save the updated cart

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const userSpecificCartDataController = async (req,res)=>{
  try {
    const {userId} = req.body
    const response = await CartItemsModel.findOne({userId})
    if(response){
     return res.status(200).json({ success: true, data: response });
    }else{
      return res.status(400).json({ success: false, message: "No Data Available" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = { addItemToCartController,userSpecificCartDataController };
