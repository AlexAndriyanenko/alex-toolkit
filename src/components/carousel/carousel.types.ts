import React from "react";

import { carouselDirections } from "./carousel.constants";

export type CarouselSlideRenderProps = {
  id: string;
  className: string;
  current: boolean;
};

export type CarouselSlideType = {
  id: string;
  render: (props: CarouselSlideRenderProps) => React.ReactNode;
};

export type CarouselDirectionsKeys = keyof typeof carouselDirections;
