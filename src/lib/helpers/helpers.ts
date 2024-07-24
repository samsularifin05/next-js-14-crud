import * as bcrypt from "bcrypt";

export const getId = (request: Request) => {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() ?? "", 10);
  return id;
};

export const generate = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error(`Error generating password hash: ${error}`);
  }
};

// Function to compare a plain password with a hashed password
export const compare = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error(`Error comparing passwords: ${error}`);
  }
};

export type MapperFunction<T, U> = (item: T) => U;

// Function to map an array of items or a single item
export const mapItems = <T, U>(
  items: T | T[],
  mapper: MapperFunction<T, U>
): U[] => {
  if (Array.isArray(items)) {
    return items.map(mapper);
  }
  return [mapper(items)];
};
