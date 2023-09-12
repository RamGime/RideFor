import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User } from "../entities/User";
import * as ImagePicker from 'expo-image-picker';

export interface UserRepository {

    update(user: User): Promise<ResponseApiDelivery>;
    updateWithImage(user: User, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>;

}