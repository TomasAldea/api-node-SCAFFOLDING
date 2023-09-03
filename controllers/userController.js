const bcrypt = require('bcrypt-nodejs');
const User = require('../models/userModel'); // Importa tu modelo de usuario
const jwt = require('jsonwebtoken'); // librería jsonwebtoken para generar tokens de autenticación

//! Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Verifica si el email ya está registrado
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
  }

  // Crea un nuevo usuario
  const newUser = new User({
    username,
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)), // Hashea la contraseña
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Usuario registrado correctamente', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

//! Función para iniciar sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Busca al usuario por su correo electrónico
      const user = await User.findOne({ email });
  
      // Si el usuario no existe, responde con un error
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
      const isPasswordValid = bcrypt.compareSync(password, user.password);
  
      // Si las contraseñas no coinciden, responde con un error
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
  
      // Genera un token de autenticación
      const token = jwt.sign({ userId: user._id }, 'colliershoot', { expiresIn: '1h' });
  
      // Respuesta exitosa con el token
      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

//! Función para actualizar un usuario por su ID
const updateUser = async (req, res) => {
  const userId = req.params.id; // Obtiene el ID del usuario de los parámetros de la URL
  const { username, email, password } = req.body;

  try {
    // Busca al usuario por su ID en la base de datos
    const user = await User.findById(userId);

    // Si el usuario no existe, responde con un error
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualiza los datos del usuario (solo si se proporcionan)
    if (username) {
      user.username = username;
    }
    if (email) {
      // Verifica si el nuevo correo electrónico ya está registrado por otro usuario
      const existingUserWithNewEmail = await User.findOne({ email });
      if (existingUserWithNewEmail && existingUserWithNewEmail._id.toString() !== userId) {
        return res.status(400).json({ message: 'El nuevo correo electrónico ya está registrado por otro usuario' });
      }
      user.email = email;
    }
    if (password) {
      user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // Hashea la nueva contraseña
    }

    // Guarda los cambios en la base de datos
    const updatedUser = await user.save();

    // Respuesta exitosa con los datos actualizados del usuario
    res.status(200).json({ message: 'Usuario actualizado correctamente', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

//! Función para eliminar un usuario por su ID
const deleteUser = async (req, res) => {
  const userId = req.params.id; // Obtiene el ID del usuario de los parámetros de la URL

  try {
    // Busca al usuario por su ID y elimínalo
    const deletedUser = await User.findByIdAndRemove(userId);

    // Si el usuario no se encuentra, responde con un error
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Respuesta exitosa con los detalles del usuario eliminado
    res.status(200).json({ message: 'Usuario eliminado correctamente', user: deletedUser });
  } catch (error) {
    // Manejo de errores y respuesta en caso de error
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};

// Exporta las funciones del controlador
module.exports = { 
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};

/*
getUserById: Un método para obtener la información de un usuario por su ID. Esto puede ser útil para mostrar el perfil de un usuario o permitir que los administradores accedan a la información de otros usuarios.

updateUser: Un método para permitir a los usuarios actualizar su información de perfil, como nombre, dirección de correo electrónico, contraseña, etc.

deleteUser: Un método para permitir a los usuarios eliminar su cuenta si lo desean.

changePassword: Un método para permitir a los usuarios cambiar su contraseña. Esto generalmente requiere verificar la contraseña actual antes de permitir la actualización.

resetPassword: Un método para permitir a los usuarios restablecer su contraseña en caso de olvido. Esto a menudo implica enviar un correo electrónico con un enlace de restablecimiento de contraseña seguro.

logoutUser: Aunque no mencionaste específicamente un método de cierre de sesión, es importante incluirlo para permitir que los usuarios cierren sesión de manera segura.

Authentication Middleware: Implementar middleware de autenticación para proteger rutas o endpoints específicos que requieran autenticación. Esto asegura que solo los usuarios autenticados puedan acceder a ciertas partes de la aplicación.

Authorization Middleware: Si es necesario, puedes implementar middleware de autorización para definir roles y permisos de usuario. Esto permite que algunos usuarios tengan acceso a ciertas partes de la aplicación mientras que otros no.

Validación de Datos: Asegurarte de que los datos proporcionados por los usuarios estén validados y sean seguros para prevenir ataques comunes como la inyección de SQL o la inyección de scripts.

Manejo de Errores: Implementar un manejo adecuado de errores para capturar y responder a problemas como contraseñas incorrectas, usuarios no encontrados, etc.

Tokens de Acceso y Sesiones: Para mantener la autenticación de los usuarios, generalmente se utilizan tokens de acceso (JWT, por ejemplo) o sesiones.

Historial de Inicio de Sesión: Registrar y mantener un historial de inicio de sesión para que los usuarios puedan verificar si alguien más ha accedido a su cuenta.

Seguridad de Contraseñas: Implementar prácticas de seguridad de contraseñas, como almacenar contraseñas en forma segura (hashing y salting) y requerir contraseñas fuertes.
*/