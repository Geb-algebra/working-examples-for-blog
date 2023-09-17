import { Post } from '@prisma/client';
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, SerializeFrom } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useActionData } from '@remix-run/react';
import { prisma } from '~/db.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const posts = await prisma.post.findMany();
  return json({ posts });
}

function MistypedPost(props: { post: Post }) {
  // this will cause a type error because the createdAt of type Post is Date
  // but that in loaderData is a string
  return (
    <li>
      <span>{props.post.title}</span>
    </li>
  );
};

function CorrectlyTypedPost(props: { post: SerializeFrom<Post> }) {
  // this will NOT cause a type error because the SerializeFrom converts the
  // Date type to string
  return (
    <li>
      <span>{props.post.title}</span>
    </li>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <>
      <ul>
        {loaderData.posts.map(post => (
          <MistypedPost key={post.id} post={post} /> // you will see a type error here
          ))}
      </ul>
      <ul>
        {loaderData.posts.map(post => (
          <CorrectlyTypedPost key={post.id} post={post} /> // you will NOT see a type error here
          ))}
      </ul>
    </>
  );
}
