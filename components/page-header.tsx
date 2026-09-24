import { SectionReveal } from "@/components/section-reveal";

export function PageHeader({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return (
    <section className="container-shell pb-12 pt-32 sm:pt-40">
      <SectionReveal className="max-w-4xl">
        <span className="section-kicker">{kicker}</span>
        <h1 className="heading-lg aurora-text">{title}</h1>
        <p className="muted-copy mt-6 max-w-3xl">{description}</p>
      </SectionReveal>
    </section>
  );
}
