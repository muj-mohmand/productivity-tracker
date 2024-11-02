"use client";
import React, { useEffect, useRef } from "react";
interface ModalProps {
  text: string;
}

export default function Modal({ text }: ModalProps) {
  // Open the modal when the component mounts
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      dialogElement.showModal();
    }

    return () => {
      if (dialogElement) {
        dialogElement.close();
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect();
    if (dialogDimensions) {
      const isInDialog =
        e.clientX >= dialogDimensions.left &&
        e.clientX <= dialogDimensions.right &&
        e.clientY >= dialogDimensions.top &&
        e.clientY <= dialogDimensions.bottom;

      if (!isInDialog) {
        dialogRef.current?.close();
      }
    }
  };

  const onClose = () => {
    dialogRef.current?.close();
  };
  return (
    <dialog
      ref={dialogRef}
      className="modal"
      id="modal_1"
      onClick={handleClick}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{text}</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
        <button
          className="btn"
          onClick={() => document.getElementById("modal_1")?.close()}
        >
          Close
        </button>
      </div>
      <form method="dialog" className="modal-backdrop"></form>
    </dialog>
  );
}
