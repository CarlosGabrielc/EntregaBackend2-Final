// ---------------- Restablecer contraseña ----------------
import bcrypt from "bcrypt";

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Buscar usuario con token válido y no expirado
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: "Token inválido o expirado" });

    // Evitar que la nueva contraseña sea igual a la anterior
    const samePassword = await bcrypt.compare(newPassword, user.password);
    if (samePassword) return res.status(400).json({ error: "La contraseña no puede ser igual a la anterior" });

    // Hashear y guardar nueva contraseña
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();
    res.json({ message: "Contraseña restablecida correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al restablecer la contraseña" });
  }
};
