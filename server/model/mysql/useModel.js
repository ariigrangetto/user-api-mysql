import mysql from "mysql2/promise";
import process from "process";
import "dotenv/config";
import bcrypt from "bcrypt";

//creating connection to mysql;
const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const connection = await mysql.createConnection(config);

export class UserModel {
  static getUsers = async () => {
    const [result] = await connection.query(
      `SELECT BIN_TO_UUID(id) AS id, firstName, lastName, maidenName, age, gender, email, phone, username, birthDate, image, height, weight, eyeColor, hair_type, hair_color, university, role FROM users`
    );

    return result;
  };

  static getUser = async (id) => {
    const [result] = await connection.query(
      `SELECT BIN_TO_UUID(id) AS id, firstName, lastName, maidenName, age, gender, email, phone, username, birthDate, image, height, weight, eyeColor, hair_type, hair_color, university, role FROM users WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    if (result.length === 0) return null;

    return result;
  };

  static getUserFirstName = async (firstName) => {
    const lowerCaseFirstName = firstName.toLowerCase();
    const [result] = await connection.query(
      `
        SELECT BIN_TO_UUID(id) AS id,  firstName, lastName, maidenName, age, gender, email, phone, username, birthDate, image, height, weight, eyeColor, hair_type, hair_color, university, role FROM users WHERE LOWER (firstName) = ?;
        `,
      [lowerCaseFirstName]
    );

    return result;
  };

  static createUser = async (user) => {
    const {
      firstName,
      lastName,
      maidenName,
      age,
      gender,
      email,
      phone,
      username,
      password,
      birthDate,
      image,
      height,
      weight,
      eyeColor,
      hair,
      university,
      role,
    } = user;

    const hasshedPassword = await bcrypt.hash(password, 10);

    //obtening random uuid by mysql
    const [uuidResult] = await connection.query(`
        SELECT UUID() uuid;`);

    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO users (id, firstName, lastName, maidenName, age, gender, email, phone, username, password, birthDate, image, height, weight, eyeColor, hair_type, hair_color, university, role) 
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          uuid,
          firstName,
          lastName,
          maidenName,
          age,
          gender,
          email,
          phone,
          username,
          hasshedPassword,
          birthDate,
          image,
          height,
          weight,
          eyeColor,
          hair?.type,
          hair?.color,
          university,
          role,
        ]
      );
    } catch (err) {
      throw new Error("Error creating user " + err.message);
    }

    const [result] = await connection.query(
      `SELECT BIN_TO_UUID(id) AS id, firstName, lastName, maidenName, age, gender, email, phone, username, password, birthDate, image, height, weight, eyeColor, hair_type, hair_color, university, role FROM users WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return result;
  };

  static patchUser = async (body, id) => {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const obj = Object.entries(body).filter(([key]) => body[key] !== undefined);
    console.log(obj);

    const setValue = obj.map(([key]) => `${key} = ?`).join(", ");

    console.log(setValue);
    const values = obj.map(([_, value]) => value);

    try {
      await connection.query(
        `
            UPDATE users
            SET ${setValue}
            WHERE id = UUID_TO_BIN(?);
            `,
        [...values, id]
      );
    } catch (err) {
      throw new Error("Error updating user: " + err.message);
    }

    const [result] = await connection.query(
      `
        SELECT BIN_TO_UUID(id) AS id, firstName, lastName, maidenName, age, gender, email, phone, username, password, birthDate, image, height, weight, eyeColor, hair_type, hair_color, university, role FROM users WHERE id = UUID_TO_BIN(?);
        `,
      [id]
    );

    return result;
  };

  static deleteUser = async (id) => {
    const [result] = await connection.query(
      `
        DELETE FROM users
        WHERE id = UUID_TO_BIN(?);
        `,
      [id]
    );

    return result;
  };
}

// UUID_TO_BIN convierte de texto -> binario y se usa para guardar o compara en la base
// BIN_TO_UUID convierte de binario -> texto y se usa al leer o mostrar datos
// el id que me viene por parametro me viene en formato texto y en la base de datos tengo BINARY(16) por lo que debo de convertir el valor de entrada con UUID_TO_BIN, para pasarlo a binario
