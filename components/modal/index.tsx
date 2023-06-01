import { useState } from "react";
import Photo from "../frame";

export default function Modal({ photo }: any) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledbly="modal-madal-title"
            aria-describedby="modal-modal-description"
        >
            <Photo photo={photo} />
        </Modal>
    );
}
