import React from "react";
import { formatCode } from "../../utils/formatting";

export const MIN_SCREEN_WIDTH = 300;
export const MAX_SCREEN_WIDTH = 2048;

export function validateScreenName(name, screenId, screens) {
  const trimmedName = name.trim();

  if (trimmedName === "") {
    return "Name can't be empty.";
  }

  for (let i = 0, len = screens.length; i < len; i++) {
    const screen = screens[i];

    if (screen.id !== screenId && screen.name === trimmedName) {
      return "Name already exists.";
    }
  }

  return null;
}

export const INTEGER_REGEX = /^\d+$/;

export function validateScreenWidth(width) {
  const trimmedWidth = width.trim();

  if (trimmedWidth === "") {
    return "Width can't be empty.";
  }

  if (INTEGER_REGEX.test(trimmedWidth) === false) {
    return "Width must be a number.";
  }

  const intWidth = Number(trimmedWidth);

  if (intWidth < MIN_SCREEN_WIDTH) {
    return `Min width is ${MIN_SCREEN_WIDTH}.`;
  }

  if (intWidth > MAX_SCREEN_WIDTH) {
    return `Max width is ${MAX_SCREEN_WIDTH}.`;
  }

  return null;
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function updateItemWithId(arr, id, update) {
  const index = arr.findIndex((item) => item.id === id);

  return index === -1
    ? arr
    : replaceItemAtIndex(arr, index, {
        ...arr[index],
        ...update,
      });
}

export function removeItemWithId(arr, id) {
  const index = arr.findIndex((item) => item.id === id);

  return index === -1 ? arr : removeItemAtIndex(arr, index);
}

export function getErrorsFrom(errors) {
  errors = errors.filter(Boolean);

  const lastIndex = errors.length - 1;

  return React.createElement(
    React.Fragment,
    null,
    errors.reduce((result, error, index) => {
      result.push(error);

      if (index !== lastIndex) {
        result.push(React.createElement("br", { key: index }));
      }

      return result;
    }, [])
  );
}

export function prettify(code) {
  return formatCode(code, { printWidth: 81 });
}

export function heightToVh(height) {
  return (height / window.innerHeight) * 100 + "vh";
}

export function vhToHeight(vh) {
  return (parseFloat(vh, 10) * window.innerHeight) / 100;
}
