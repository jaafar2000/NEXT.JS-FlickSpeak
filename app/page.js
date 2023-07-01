import Feed from "@/components/Feed";

export default async function Home() {
  return (
    <main className=" container px-6">
      <section className="w-full flex-start flex-col">
        <h1 className="head_text text-gray-200 lg:mt-3 lg:text-center md:text-left sm:text-left">
          MovieMingle is a website for movie and TV enthusiasts to connect,
          share opinions, and discuss films It's a platform to discover
          recommendations, connect with fellow film lovers, and explore the
          world of cinema.
        </h1>
      </section>
      <Feed/>
    </main>
  );
}
