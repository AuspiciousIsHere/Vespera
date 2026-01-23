import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";

import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";

export default function FourthSection() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Digital Illustrator",
      content:
        "Vespera has completely transformed how I share my work. The community is incredibly supportive, and seeing my designs get thousands of likes gave me the confidence to go full-time as an artist!",
      avatar: "https://cdn.shopify.com/s/files/1/0030/9316/8186/files/Nat_Davies_Profile_Picture_480x480.jpg?v=1622907896",
    },
    {
      name: "Sarah Chen",
      role: "Graphic Designer",
      content:
        "Marking my designs as Premium was the best decision. I now earn a steady income from my passion while still owning all my work. It's empowering to get paid directly by fans who love what I create.",
      avatar: "https://viemagazine.com/wp-content/uploads/2018/03/vie-magazine-ashley-longshore-hero-min.jpg",
    },
    {
      name: "Marcus Okonkwo",
      role: "Concept Artist",
      content:
        "I landed my first brand collaboration through Vespera! A major tech company reached out after seeing my portfolio here. Working with them boosted my reputation and opened doors I never imagined.",
      avatar: "https://www.shutterstock.com/image-photo/contemporary-art-collage-team-professionals-600nw-2596863741.jpg",
    },
    {
      name: "Luna Patel",
      role: "UI/UX Designer",
      content:
        "The feedback loop on Vespera is amazing. Every like, comment, and share motivates me to create more. My reputation grew so fast that I started getting freelance offers weekly!",
      avatar: "https://www.wikihow.com/images/thumb/0/04/Compliment-Someone%27s-Art-Step-10.jpg/v4-460px-Compliment-Someone%27s-Art-Step-10.jpg",
    },
    {
      name: "Diego Morales",
      role: "Motion Designer",
      content:
        "Collaborating with other artists on group projects here is seamless. We co-create collections, split revenue, and build something bigger together. It's like having a creative team without the hassle.",
      avatar:
        "https://assets.designtemplate.io/images/Vector%20Illustration%20of%20Team%20Members%20Collaborating%20During%20a%20Business%20Meeting-HD.webp",
    },
    {
      name: "Emma Laurent",
      role: "Fine Artist",
      content:
        "I was hesitant at first, but the platform made it so easy to start selling premium access to my artwork. The support from the community and the earnings have been life-changing.",
      avatar: "https://s3.us-east-1.amazonaws.com/bomb-images/_hiresolution/Maren-Hassinger.jpg",
    },
  ];

  return (
    <section className="relative min-h-screen bg-background py-20 px-8 flex flex-col items-center justify-center transition-colors duration-500 bg-linear-150 from-transparent via-80% via-transparent to-160% dark:to-200% to-emerald-500">
      <div className="absolute top-0 -translate-y-1/2 left-0 -translate-x-100 size-150 rounded-full blur-3xl opacity-25 dark:opacity-10 bg-cyan-400"></div>

      <div className="max-w-5xl w-full text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-950 dark:text-white mb-6">What Artists Are Saying</h2>
        <p className="text-xl text-purple-600 dark:text-purple-200">Real stories from creators who’ve grown their careers on Vespera</p>
      </div>

      <Carousel plugins={[plugin.current]} className="max-w-7xl">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full shrink-0 px-4">
              {/* Card Background: White/60 for light, Secondary/40 for dark */}
              <Card className="bg-white/60 dark:bg-secondary/40 backdrop-blur-xl border-neutral-200 dark:border-white/5 shadow-xl dark:shadow-none overflow-hidden group transition-all">
                <CardContent className="p-12 relative">
                  {/* Quote Icon: Subtle grey for light, White/5 for dark */}
                  <Quote className="absolute top-8 right-8 size-20 text-neutral-200 dark:text-white/5 -rotate-12 group-hover:text-accent-foreground/10 transition-colors" />

                  <div className="relative z-10">
                    {/* Content Text: neutral-800 for light, white for dark */}
                    <p className="text-2xl md:text-3xl font-light text-neutral-800 dark:text-white mb-12 leading-snug italic">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-6">
                      <Avatar className="size-14 grayscale hover:grayscale-0 transition-all duration-500 ring-2 ring-neutral-200 dark:ring-white/10">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        {/* Name/Role colors */}
                        <h4 className="text-lg font-bold text-neutral-950 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-neutral-500 uppercase tracking-widest">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
