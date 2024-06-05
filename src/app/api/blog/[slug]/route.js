import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;
  try {
    connectToDb();
    const post = await Post.findOne(slug);
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    throw new Error("Failed fetch the Post");
  }
};

export const DELETE = async (req, { params }) => {
  const { slug } = params;
  try {
    connectToDb();
    await Post.deleteOne({ slug });
    return NextResponse.json("Post deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete the Post");
  }
};
