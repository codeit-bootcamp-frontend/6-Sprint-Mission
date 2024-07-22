"use client";

import React from "react";
import { useRecoilValue } from "recoil";
import modalsAtom from "@/recoil/atoms/ModalsAtom";

function ModalsWrapper() {
  const modalsData = useRecoilValue(modalsAtom);
  return (
    <>
      {modalsData.map((modal) => (
        <React.Fragment key={modal.id}>
          {modal.isOpen && <modal.Component {...modal.props} />}
        </React.Fragment>
      ))}
    </>
  );
}

export default ModalsWrapper;
