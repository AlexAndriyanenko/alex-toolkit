import { clsx } from "utils";

it("Checks if classnames are provided with string args", () => {
  const args = [
    {
      container: "true",
    },
  ];

  const result = clsx(...args);

  expect(result).toBe("container");
});

it("Checks if classnames are provided with number args", () => {
  const args = [
    {
      container: 1,
    },
  ];

  const result = clsx(...args);
  expect(result).toBe("container");
});
