/* eslint-disable import/no-anonymous-default-export */
import { generateToken, ResponseDto, validateSchema } from "@/lib";
import UserRepository from "../../users/repository";
import { compare } from "bcrypt";
import { User } from "../../users/entities";
import { LoginRequestDto } from "../dto/reqruest.login.dto";

class LoginService {
  async cekLogin(body: User) {
    const { isValid, errors, data } = validateSchema<User>(
      LoginRequestDto,
      body
    );
    if (!isValid) {
      return ResponseDto(`${errors}`, 400);
    }

    let result = await UserRepository.findOne({
      username: data.username
    });

    if (!result) {
      throw new Error("Username Tidak terdaftar");
    }

    let cekpass = await compare(
      String(data?.password),
      String(result?.password)
    );

    if (!cekpass) {
      throw new Error("Password Salah");
    }

    const token = await generateToken({
      username: result?.username
    });

    return {
      ...result,
      token
    };
  }
}

export default new LoginService();
