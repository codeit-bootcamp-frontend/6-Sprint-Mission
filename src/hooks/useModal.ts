import { useCallback } from "react";
import { useRecoilState } from "recoil";
import modalsAtom from "@/recoil/atoms/ModalsAtom";

export interface ModalProps {
  id: string; // 고유 속성 (유일값)
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  [key: string]: unknown;
}

const useModal = () => {
  const [modalsData, setModalsData] = useRecoilState(modalsAtom);

  const openModal = useCallback(
    (Component: React.ComponentType, props: ModalProps) => {
      setModalsData((prevModals) => {
        const { id } = props;

        // 중복 모달 방지
        if (prevModals.some((modal) => modal.id === id)) return prevModals;

        return [
          ...prevModals,
          {
            id: id,
            Component,
            props: { ...props, onClose: () => closeModal(id) },
            isOpen: true,
          },
        ];
      });
    },
    [setModalsData],
  );

  const closeModal = useCallback(
    (id: string) => {
      setModalsData((prevModals) =>
        prevModals.filter((modal) => modal.id !== id),
      );
    },
    [setModalsData],
  );

  return { modalsData, openModal, closeModal };
};

export default useModal;
