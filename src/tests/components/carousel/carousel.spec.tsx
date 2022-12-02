import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { generateSlides } from "stories";
import { Carousel } from "components";

it("Renders Carousel component and checks prev/next buttons", async () => {
  const slides = generateSlides();
  const renderResult = render(<Carousel slides={slides} />);

  if (!renderResult.container) return fail("Component did not render.");

  const container = screen.getByTestId("carousel");

  const prev = screen.getByTestId("carousel-prev-btn");
  const next = screen.getByTestId("carousel-next-btn");

  // after component rendered, current slide value should be slide-1
  expect(container.getAttribute("data-current")).toEqual("slide-1");

  // after clicking next btn, next slide (id: slide-2) should be set as current
  fireEvent.click(next);
  expect(container.getAttribute("data-current")).toEqual("slide-2");

  // after clicking prev btn, prev slide (id: slide-1) slide should be set as current
  fireEvent.click(prev);
  expect(container.getAttribute("data-current")).toEqual("slide-1");

  // after clicking prev btn again, nothing should change
  fireEvent.click(prev);
  expect(container.getAttribute("data-current")).toEqual("slide-1");
});
