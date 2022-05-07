import Stripe from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

// const stripe = require("stripe")(`sk_test_51KvIcyF3fyBL5xXa8frO71Jxzu7oA4QPBmwVHNEe3eGGGnnvSIjo90E8ACBZdrzBCBerc66OAuykcEc6gslYEB9m00As5Yj8pi`);

export default async function handler(req, res) {
    
    if (req.method === "POST") {
        console.log("test",req.body);
    try {
      // Create Checkout Sessions from body params.
    //   console.log(req.body.image[0].asset._ref);
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
            { shipping_rate: "shr_1KvJI0F3fyBL5xXamMgjxWi8" },
            { shipping_rate: "shr_1KvJLoF3fyBL5xXabBLfYebd" }
        ],
        line_items: req.body.map((item) => {
            const img = item.image[0].asset._ref;
            const newImage = img.replace("image-", "https://cdn.sanity.io/images/19hrkhwg/production/").replace("-webp", ".webp");
            console.log("IMAGE", newImage);

            return{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [newImage],
                    },
                    unit_amount: item.price * 100,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: item.quantity
            }
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
