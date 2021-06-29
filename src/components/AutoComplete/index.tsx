import React, { forwardRef, NamedExoticComponent } from "react";
import { ComponentNames } from "../componentNames";
import { AutoCompleteProps } from "./types";
import { default as AutoCompleteInternal } from "./AutoComplete";

// 🐨 Redecalare forwardRef
// Ref: https://fettblog.eu/typescript-react-generic-forward-refs/?utm_source=oida&utm_medium=email#option-3%3A-augment-forwardref
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

function AutoCompleteComponent<AutoCompleteItem>(
  props: AutoCompleteProps<AutoCompleteItem>,
  ref: React.Ref<HTMLInputElement>
) {
  return <AutoCompleteInternal {...props} innerRef={ref} />;
}

const AutoComplete = forwardRef(AutoCompleteComponent);

// 🚨  Ref: https://stackoverflow.com/a/58473012/340827
(AutoComplete as NamedExoticComponent).displayName =
  ComponentNames.AutoComplete;

export default AutoComplete;
