import RiveHero from "@/components/RiveHero"

interface Props {
  title: string;
  description: string;
}

export default function Map({title, description}: Props) {
  return (
    <main className="block relative w-screen h-screen">
      <RiveHero title={title} link={description}/>
    </main>
  );
}
