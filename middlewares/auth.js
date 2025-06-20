 const jwt = require('jsonwebtoken');

const verificarToken= function (req, res, next) {
// Obtiene el token del encabezado Authorization
const token = req.headers.authorization?.split(' ')[1];
if (!token) {
return res.status(401).json({ mensaje: 'Token no encontrado. Acceso denegado.'});
}
try {
// Verifica la validez del token
const decoded = jwt.verify(token, 'mi_clave_secreta');
// Adjunta los datos del usuario al objeto request
req.user = decoded;
// Continúa con la ejecución de la siguiente función (ruta)
next();
} catch (err) {
return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
}
}