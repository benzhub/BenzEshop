import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { ImCancelCircle } from "react-icons/im";

type ModalContextValue = {
  openName: string;
  open: Dispatch<SetStateAction<string>>;
  close: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  const contextValue = useContext(ModalContext);
  if (!contextValue)
    throw new Error(
      "useModalContext must be used within a ModalContextProvider",
    );
  return contextValue;
};

function Modal({ children }: PropsWithChildren) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenProps = {
  children: JSX.Element;
  opens: string;
};

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useModalContext();
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

type WindowProps = {
  children: JSX.Element;
  name: string;
};

function Window({ children, name }: WindowProps) {
  const { openName, close } = useModalContext();
  const ref = useOutsideClick(close);
  if (!ref || name !== openName) return null;
  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center backdrop-blur-sm transition-all">
      <div className="w-[30%] rounded-lg border-2 bg-neutral p-4" ref={ref}>
        <div className="flex justify-end">
          <button onClick={close}>
            <ImCancelCircle size={32} />
          </button>
        </div>
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
