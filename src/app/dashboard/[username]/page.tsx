interface Props {
  params: {
    username: string;
  };
}

export default async function Dashboard({ params }: Props) {
  const { username } = await params;
  return <h1>Dashboard do {username}</h1>;
}
