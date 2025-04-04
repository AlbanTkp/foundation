import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const useModal = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    const showModal = () => {
      setIsVisible(true);
    };
  
    const hideModal = () => {
      setIsVisible(false);
    };
  
    const Modal = ({ children, maxWidth = '2xl', fullscreen = false, closeable = true, onClose = () => {} }) =>{
        const close = () => {
            if (closeable) {
                onClose();
            }
        };

        const maxWidthClass = {
            sm: 'sm:max-w-sm',
            md: 'sm:max-w-md',
            lg: 'sm:max-w-lg',
            xl: 'sm:max-w-xl',
            '2xl': 'sm:max-w-2xl',
        }[maxWidth]; 
        
        return (
            <Transition show={isVisible} as={Fragment} leave="duration-200">
                <Dialog
                    as="div"
                    id="modal"
                    className="fixed inset-0 flex px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                    onClose={close}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="absolute inset-0 bg-gray-500/75  " />
                    </Transition.Child>

                    {/* <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    > */}
                        <Dialog.Panel
                            // className={`mb-6 bg-white rounded-lg overflow-auto shadow-xl transform transition-all sm:w-full sm:mx-auto modal-box ${maxWidthClass}`}
                            className={`mb-6 bg-white rounded-lg overflow-auto shadow-xl transform transition-all sm:w-full sm:mx-auto modal-box ${fullscreen ?'h-full max-w-full px-5': maxWidthClass}`}
                            // className={`mb-6 rounded-lg overflow-auto shadow-xl transform transition-all sm:w-full sm:mx-auto h-full max-w-full px-5`}
                        >
                            <div className="rounded-lg bg-white">
                                {children}
                            </div>
                        </Dialog.Panel>
                    {/* </Transition.Child> */}
                </Dialog>
            </Transition>
        );
    }

    return {
        showModal,
        hideModal,
        Modal
    };
};

export default useModal;
