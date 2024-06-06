"use server";

import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (prevState, formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);
  try {
    connectToDb();
    const newPost = new Post(title, desc, slug, userId);
    await newPost.save();
    console.log("Saved to DB");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Error saving post!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (prevState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();
    const user = User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hasedPassword, img });

    await newUser.save();
    console.log("New user Saved to DB");
    return { success: "User registered successfully" };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong, Error registering user" };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }

    throw err;
  }
};
