// src/dtos/userDTO.js
export class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    // no incluimos password ni otros datos sensibles
  }
}
