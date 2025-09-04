"use client";

// imports
import { Accordion, AccordionItem } from "@heroui/react";

const FAQsArea = () => {
  const content = `
  An event is a gathering of people for a specific purpose,
  often to celebrate, learn, or share experiences.
  It can range from small meetings to large festivals.`;

  return (
    <section className="relative dark:bg-[#181A1B] py-14 px-4 md:px-16 flex flex-col items-center gap-10 overflow-hidden">
      {/* header */}
      <div className="max-w-[480px] w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold md:text-center">
          Frequently Asked Questions
        </h2>
      </div>
      {/* faqs */}
      <div className="max-w-5xl w-full dark:bg-[#181A1B] grid gap-5">
        <div className="w-full">
          <Accordion
            variant="splitted"
            selectionMode="multiple"
            itemClasses={{
              base: "py-1 md:py-2 dark:bg-[#181A1B]",
              heading: "text-2xl font-bold",
              content: "text-sm text-placeholder font-medium",
            }}
          >
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="Some Question Here"
            >
              {content}
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title="Some Question Here"
            >
              {content}
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title="Some Question Here"
            >
              {content}
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="Accordion 4"
              title="Some Question Here"
            >
              {content}
            </AccordionItem>
            <AccordionItem
              key="5"
              aria-label="Accordion 5"
              title="Some Question Here"
              classNames={{
                heading: "text-2xl font-bold",
                content: "text-sm text-placeholder font-medium",
              }}
            >
              {content}
            </AccordionItem>
            <AccordionItem
              key="6"
              aria-label="Accordion 6"
              title="Some Question Here"
            >
              {content}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQsArea;
