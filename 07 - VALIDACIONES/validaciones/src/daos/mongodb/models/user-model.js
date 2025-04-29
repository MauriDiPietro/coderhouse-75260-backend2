import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
    minLength: [2, "El nombre debe tener al menos 2 caracteres"],
    lowercase: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Correo electrónico no válido"],
  },
  age: {
    type: Number,
    required: true,
    min: [0, "La edad no puede ser negativa"],
    max: 120,
  },
  password: {
    type: String,
    required: true,
    min: [8, "La contraseña debe tener como mínimo 8 caracteres"]
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
});

export const UserModel = model("user", UserSchema);
