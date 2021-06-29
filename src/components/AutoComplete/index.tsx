import React, { forwardRef } from "react";
// import { ComponentWithStaticProperties } from '../../types';
import { ComponentNames } from "../componentNames";
// import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps } from "./types";
import { default as AutoCompleteInternal } from "./AutoComplete";
import { ComponentWithStaticProperties } from "../../types";

interface StaticProperties {}
type AutoCompleteItem = Record<string, any>;

// function AutoCompleteComponent<AutoCompleteItem>(
//   props: AutoCompleteProps<AutoCompleteItem>,
//   ref: React.Ref<HTMLInputElement>
// ) {
//   return <AutoCompleteInternal {...props} innerRef={ref} />;
// }

export interface CompoundedComponent<AutoCompleteItem>
  extends React.ForwardRefExoticComponent<
    AutoCompleteProps<AutoCompleteItem> & React.RefAttributes<HTMLInputElement>
  > {
  yourStaticFunctionOrSomethingLikeThat: () => void;
}

// can't be an arrow function due to: https://github.com/yannickcr/eslint-plugin-react/issues/2269
// const AutoComplete = forwardRef<AutoCompleteItem, HTMLInputElement>(
//   function AutoCompleteComponent<AutoCompleteItem>(
//     // props: AutoCompleteProps<AutoCompleteItem>,
//     // ref: React.Ref<HTMLInputElement>
//     props,
//     ref
//   ) {
//     const {
//       label,
//       // ref,
//       error,
//       // defaultValue,
//       onBlur,
//       onInputValueChange,
//       onSelectedItemChange,
//       onFocus,
//       // onCantFind,
//       items,
//       itemToString,
//       stateReducer,
//       placeholder = "Search here",
//       isLoading,
//       highlightColor = theme.colors.secondary.lightBlue.t25,
//       itemsFooter: Footer,
//       // toggleIcon: Toggle,
//     } = props;

//     //   const { search, data, isLoading } = useAddressSearch({ countryCode });
//     //   const inputRef = useRef<HTMLInputElement>(null);

//     const {
//       isOpen,
//       getMenuProps,
//       getInputProps,
//       getItemProps,
//       getComboboxProps,
//       getToggleButtonProps,
//       // closeMenu,
//       // openMenu,
//       // inputValue,
//       }= useCombobox<AutoCompleteItem>({
//       items,
//       ...(stateReducer && { stateReducer }),
//       onInputValueChange,
//       onSelectedItemChange,
//       itemToString,
//     });

//     return <AutoCompleteInternal {...props} innerRef={ref} />;
//   }
// );
const AutoComplete = forwardRef(function AutoCompleteComponent<
  AutoCompleteItem
>(
  props: AutoCompleteProps<AutoCompleteItem>,
  ref: React.Ref<HTMLInputElement>
) {
  return <AutoCompleteInternal {...props} innerRef={ref} />;
}) as ComponentWithStaticProperties<
  AutoCompleteProps<AutoCompleteItem>,
  StaticProperties
>;

AutoComplete.displayName = ComponentNames.AutoComplete;

// AutoComplete.defaultProps = defaultAutoCompleteProps;

export default AutoComplete;
