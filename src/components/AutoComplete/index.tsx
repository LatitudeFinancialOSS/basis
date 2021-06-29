import React, { forwardRef, NamedExoticComponent } from "react";
// import { ComponentWithStaticProperties } from '../../types';
import { ComponentNames } from "../componentNames";
// import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps } from "./types";
import { default as AutoCompleteInternal } from "./AutoComplete";

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

// AutoComplete.defaultProps = defaultAutoCompleteProps;

export default AutoComplete;
