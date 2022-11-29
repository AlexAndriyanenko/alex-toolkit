import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Carousel } from "components";
import { generateSlides } from "./carousel.utils";

export default {
  title: "Carousel",
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => {
  return <Carousel {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
  direction: "horizontal",
  slides: generateSlides(),
};
