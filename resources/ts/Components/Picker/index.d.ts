import { User } from '../../types/global.d';

export type PickerProps = {
    isSelected: boolean;
    onChange: (selected: boolean) => void | Promise<void>;
}
