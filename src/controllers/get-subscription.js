import connection from "../database/connection.js";

export default async function getUserSubscription(req, res) {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "").trim();
  let userId;
  try {
    const { rows: response } = await connection.query(
      "SELECT user_id FROM sessions WHERE token = $1",
      [token]
    );
    userId = response[0].user_id;
  } catch (error) {
    console.log("FAIL in getUserSubscription");
    console.log(error);
    return res.sendStatus(500);
  }
  let subscriptionId;
  let subscriptionInfo;
  try {
    const { rows: response } = await connection.query(
      `SELECT plans.name AS plan,sign_date,ship_dates.date AS ship_date,user_subscriptions.id
            FROM user_subscriptions 
            JOIN plans ON plan_id=plans.id 
            JOIN ship_dates ON ship_date_id=ship_dates.id
            WHERE user_id = $1`,
      [userId]
    );
    const { plan, sign_date, ship_date, id } = response[0];
    subscriptionId = id;
    subscriptionInfo = { plan, sign_date, ship_date };
  } catch (error) {
    console.log("FAIL in getSubscriptionId");
    console.log(error);
    return res.sendStatus(500);
  }
  try {
    const { rows: response } = await connection.query(
      `SELECT products.name AS products
            FROM subscription_products
            JOIN products ON products.id = subscription_products.product_id
            WHERE subscription_id = $1`,
      [subscriptionId]
    );
    subscriptionInfo = { ...subscriptionInfo, products: [] };
    response.forEach(({ products: product }) =>
      subscriptionInfo.products.push(product)
    );
  } catch (error) {
    console.log("FAIL in getUserSubscriptionInfos");
    console.log(error);
    return res.sendStatus(500);
  }
  res.send(subscriptionInfo);
}
