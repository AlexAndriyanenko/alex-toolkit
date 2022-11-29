import React from "react";

import { CarouselSlideType } from "components";

export const generateSlides = () => {
  const amount = 10;
  const result: CarouselSlideType[] = [];

  for (let i = 1; i <= amount; i++) {
    const obj: CarouselSlideType = {
      id: `slide-${i}`,
      render: ({ id, className }) => (
        <div id={id} className={className}>
          {id}
        </div>
      ),
    };

    result.push(obj);
  }

  return result;
};
