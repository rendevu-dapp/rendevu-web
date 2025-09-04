type ClassNameInput =
  | string
  | Record<string | number, boolean | undefined>
  | boolean
  | undefined;

export const classnames = (...args: ClassNameInput[]) => {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (typeof arg === "string" && arg.length > 0) {
      classes.push(arg);
    } else if (typeof arg === "object") {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(" ");
};
