import React, {
  useState,
  useEffect,
  ReactNode,
  ComponentPropsWithRef,
} from "react";
import ReactModal, { Styles } from "react-modal";
import { nanoid } from "nanoid";
import Button from "../Button";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";
import useTheme from "../../hooks/useTheme";
import useWindow from "../../hooks/useWindow";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";
import { ResponsiveProp } from "../../types";
import { responsiveSize } from "../../utils/css";

type FooterProps = {
  children: ReactNode;
};

function Footer({ children }: FooterProps) {
  const theme = useTheme();

  return <footer css={{ marginTop: theme.space[8] }}>{children}</footer>;
}

type Props = {
  title: string;
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  testId?: string;
} & ResponsiveProp<"width">;

const defaultProps = {
  open: false,
  width: "600",
} as const;

function Modal(props: Props) {
  const { title, open = false, onClose, children, testId } = props;
  const windowFromContext = useWindow();
  const theme = useTheme();
  const [headerId] = useState(() => `modal-header-${nanoid()}`);
  const [appElement, setAppElement] = useState<
    typeof windowFromContext.HTMLElement
  >();
  const closeModal = () => {
    onClose && onClose();
  };
  const responsiveCSS = useResponsivePropsCSS(props, defaultProps, {
    width: responsiveSize("width"),
  });
  const responsiveContentCSS = {
    ...responsiveCSS,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: "fit-content",
    border: 0,
    boxSizing: "border-box",
    margin: "auto",
    padding: `${theme.space[4]} ${theme.space[7]} ${theme.space[6]} ${theme.space[7]}`,
    maxWidth: `calc(100% - ${theme.space[8]})`,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii[1],
    boxShadow: `
      rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px
    `,
    ":focus": {
      outline: 0,
    },
  } as const;
  const modalStyles: Styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  useEffect(() => {
    const element = windowFromContext.document.querySelector(
      "[data-basis-modal-app]"
    );

    if (element) {
      setAppElement(element);
    } else {
      throw new Error(
        "Modal: could not find an element with the `data-basis-modal-app` attribute."
      );
    }
  }, [windowFromContext]);

  /*
    Without this, if open={true} by default, react-modal doesn't set 
    aria-hidden="true" on the appElement.
  */
  if (!appElement) {
    return null;
  }

  return (
    <ReactModal
      css={responsiveContentCSS}
      style={modalStyles}
      isOpen={open}
      onRequestClose={closeModal}
      appElement={appElement}
      parentSelector={() => windowFromContext.document.body}
      contentElement={(
        props: ComponentPropsWithRef<"div">,
        children: ReactNode
      ) => <section {...props}>{children}</section>}
      aria={{
        labelledby: headerId,
      }}
      testId={testId}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: theme.space[4],
        }}
      >
        <header
          id={headerId}
          css={{
            ...theme.textStyles.heading4,
            color: theme.colors.primary.blue.t100,
          }}
        >
          {title}
        </header>
        <div css={{ marginRight: `-${theme.space[4]}` }}>
          <Button variant="icon" onClick={closeModal}>
            <Icon name="cross" />
            <VisuallyHidden>Close modal</VisuallyHidden>
          </Button>
        </div>
      </div>
      {children}
    </ReactModal>
  );
}

Modal.defaultProps = defaultProps;
Modal.Footer = Footer;

export default Modal;
