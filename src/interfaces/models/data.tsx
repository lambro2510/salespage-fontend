export interface baseData {
    loading : boolean
}

export interface modalState {
    isOpen: boolean | false;
    type? : ModalType | 'NOTIFICATION';
    title? : string;
    content? : string;
    createdAt? : Date;
    onClick? : () => void;
    onCancel? : () => void;
}

export type ModalType = 'SUCCESS' | 'ERROR' | 'NOTIFICATION'