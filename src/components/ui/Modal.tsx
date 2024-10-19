import {Dialog, Transition} from '@headlessui/react';
import {Fragment} from 'react';

interface ModalProps {
    open: boolean, 
    onClose: () => void,
    children: React.ReactNode
    title?: string,
    description?: string    
}

const Modal = ({ open, onClose, title, children, description}: ModalProps) => {
    return (
        <Transition show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
                <div className="min-h-screen px-4 text-center">
                    <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                    <Transition.Child as={Fragment}>
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                {title}
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">{description}</p>
                            </div>
                            <div className="mt-2">
                                {children}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal