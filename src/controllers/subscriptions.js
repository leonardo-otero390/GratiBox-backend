import connection from "../database/connection.js";
import { newSubscriptionSchema } from "./validations/schemas.js";

export default async function postUserSubscription(req, res) {
  const { user, plan, name, shipDate, products } = req.body;

  const validation = newSubscriptionSchema.validate({
    user,
    plan,
    name,
    shipDate,
    products,
  });

  if (validation.error) {
    console.log(validation.error);
    return res.sendStatus(400);
  }

  try {
    await connection.query(
      `INSERT INTO user_subscriptions 
        (user_id, plan_id, sign_date, full_name, ship_date_id) 
        VALUES ($1, $2, NOW(), $3, $4)`,
      [user, plan, name, shipDate]
    );
    const { rows: request } = await connection.query(
      `SELECT id FROM user_subscriptions WHERE user_id=$1`,
      [user]
    );
    const subscriptionId = request[0].id
    products.forEach((product) => {
      connection.query(
        `INSERT INTO subscription_products
              (product_id, subscription_id)
              VALUES ($1, $2)`,
        [product, subscriptionId]
      );
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
