import { Inter } from "@next/font/google";

import { Metadata } from "next";
import { Container } from "src/components/container";

export const metadata: Metadata = {
  title: "Francis Udeji",
  description: "francisudeji.dev",
  viewport: "width=device-width, initial-scale=1",
  icons: "/favicon.ico",
};

const inter = Inter({ subsets: ["latin"] });

export default function Blog() {
  return (
    <section className="mt-20">
      <article>
        <div id="date">
          <Container variant="small">
            <div className="flex justify-center uppercase text-xs">
              <time dateTime="2023-05-27">May 27, 2023</time>
            </div>
          </Container>
        </div>
        <div id="title" className="mt-4">
          <Container variant="medium">
            <div className="flex justify-center text-center text-3xl md:text-4xl lg:text-5xl">
              <h1 className="font-bold leading-tight tracking-normal">
                AssistiveWare ushers in next generation of augmentative and
                alternative communication technology
              </h1>
            </div>
          </Container>
        </div>
        <div id="sub-title" className="mt-4">
          <Container variant="small">
            <div className="flex justify-center text-center text-lg md:text-xl lg:text-2xl">
              <h1 className="font-medium leading-tight tracking-normal">
                How app development company AssistiveWare is innovating
                augmentative and alternative communication software
              </h1>
            </div>
          </Container>
        </div>

        <div id="sub-title" className="mt-12">
          <Container variant="small">
            <div className="text-base md:text-lg font-normal space-y-6">
              <p>
                Every afternoon, 9-year-old Jay accompanies his mother Meghan
                Ashburn and his twin brother Nick to Virginia Beach, where they
                unwind from the day’s stimulation at school, in their home, and
                out in the rest of the world.
              </p>
              <p>
                When Ashburn asks Jay why he loves the beach, he picks the
                “sunset” button, then says, “No school. Yes beach.” In 2015, Jay
                was diagnosed with autism. By the age of 4, he started using
                Proloquo2Go, an augmentative and alternative communication (AAC)
                app created by development company AssistiveWare, available for
                iPhone and iPad.
              </p>

              <p>
                “The beach has always been a place where Jay can explore and
                relax on his terms,” Ashburn explains. “As a family, we visit as
                often as the weather allows. He loves the sand, the waves, and
                the gorgeous sunsets.”
              </p>
              <p>
                Proloquo2Go embodies AssistiveWare’s mission: to make AAC an
                effective and accepted means of communication. A variety of
                people adopt these tools when they’re unable to produce oral
                speech, including those with ALS, cerebral palsy, autism, and
                more.
              </p>
            </div>
          </Container>
        </div>
      </article>
    </section>
  );
}
