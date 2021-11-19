import connection from "../database/connection.js";
import { newSubscriptionSchema } from "./validations/schemas.js";

export default async function postUserSubscription(req, res) {
  const {
    userId,
    planId,
    name,
    shipDateId,
    productsId,
    ZIPCode,
    address,
    stateId,
    city,
  } = req.body;

  const validation = newSubscriptionSchema.validate({
    userId,
    planId,
    name,
    shipDateId,
    productsId,
    ZIPCode,
    address,
    stateId,
    city,
  });

  if (validation.error) {
    console.log(validation.error);
    return res.sendStatus(400);
  }

  try {
    await connection.query(
      `INSERT INTO user_subscriptions 
        (user_id, plan_id, sign_date, full_name, ship_date_id, "ZIP_code", address, state_id, city) 
        VALUES ($1, $2, NOW(), $3, $4, $5, $6, $7, $8)`,
      [userId, planId, name, shipDateId, ZIPCode, address, stateId, city]
    );
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
  let request;
  try {
    request = await connection.query(
      `SELECT id FROM user_subscriptions WHERE user_id=$1`,
      [userId]
    );
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
  try {
    const subscriptionId = request.rows[0].id;
    productsId.forEach((product) => {
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
    return res.sendStatus(500);
  }
}
