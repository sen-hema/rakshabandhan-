// Hardcoded credentials. Change these two values to whatever you want
// Karishma's ID and password to be, then redeploy.
const APP_USERNAME = ;
const APP_PASSWORD = ;

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Bad request" }),
    };
  }

  const { username, password } = body;

  const isValid =
    typeof username === "string" &&
    typeof password === "string" &&
    username === APP_USERNAME &&
    password === APP_PASSWORD;

  if (!isValid) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: "That ID or password isn't right." }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
}
