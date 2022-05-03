const stripe = require("stripe")(`sk_test_51KvIcyF3fyBL5xXa8frO71Jxzu7oA4QPBmwVHNEe3eGGGnnvSIjo90E8ACBZdrzBCBerc66OAuykcEc6gslYEB9m00As5Yj8pi`);

export default async function handler(req, res) {
    
    if (req.method === "POST") {
        console.log("test",req.body);
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collections: "auto",
        shipping_options: [
            { shipping_rate: "shr_1KvJI0F3fyBL5xXamMgjxWi8" },
            { shipping_rate: "shr_1KvJLoF3fyBL5xXabBLfYebd" }
        ],
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "{{PRICE_ID}}",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };

      const session = await stripe.checkout.sessions.create(params);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
