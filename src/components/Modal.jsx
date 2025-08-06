import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, children, onClose, close }) {
  if (close) return null;
  return (
    <div>
      <div className="backdrop" onClick={() => onClose(true)} />
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => onClose(true)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
