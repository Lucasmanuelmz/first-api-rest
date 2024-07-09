const jwt = require("jsonwebtoken");
const jwtSecret =`3Tuywsr%900))(-)gadsr`;

async function checkToken(req, res, next) {
    try{
  let tokenAuth = await req.headers["authorization"];
  console.log("Token recebido:", tokenAuth);

  if (tokenAuth && tokenAuth !== "undefined") {
    const bearer = tokenAuth.split(" ");
    const token = bearer[1];
    jwt.verify(token, jwtSecret, (error, decoded )=> {
      if (!error) {
        req.token = token;
        console.log(decoded)
        req.loggedUser = { 
          id: decoded.id, 
          email: decoded.email, 
          name: decoded.name };
        console.log("Usuário autenticado:", req.loggedUser);
        
        next();
      } else {
        console.log("Erro ao verificar token:", error);
        res.status(401);
      }
    });
  } else {
    console.log("Token não fornecido");
    res.sendStatus(403);
  }
 }catch(error) {
    console.log("Erro durante verificação do token:", error);
    res.status(404).json({error: error.message})
 }
}

module.exports = checkToken;

