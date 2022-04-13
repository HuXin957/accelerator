import {
    Platform,
    Alert
} from 'react-native';
import {PERMISSIONS, RESULTS, check, openSettings, request} from 'react-native-permissions';

export default class Permissions {
    //相机权限
    static CAMERA = () => {
        const permission = Platform.select({
            android: PERMISSIONS.ANDROID.CAMERA,
            ios: PERMISSIONS.IOS.CAMERA
        });
        return Permissions.base(permission, "相机");
    };

    //相册权限
    static PHOTO_LIBRARY = () => {
        const permission = Platform.select({
            android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            ios: PERMISSIONS.IOS.PHOTO_LIBRARY
        });
        return Permissions.base(permission, "相册");
    };

    //使用时获取位置信息
    static LOCATION_WHEN_IN_USE = () => {
        const permission = Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        });
        return Permissions.base(permission, "定位");
    };
    //后台获取位置信息
    static LOCATION_ALWAYS = () => {
        const permission1 = Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_ALWAYS
        });
        return Permissions.base(permission1, "后台定位");
    };

    //录音权限
    static MICROPHONE = () => {
        const permission1 = Platform.select({
            android: PERMISSIONS.ANDROID.RECORD_AUDIO,
            ios: PERMISSIONS.IOS.MICROPHONE
        });
        return Permissions.base(permission1, "后台定位");
    };

    static openSettings = () => {
        return openSettings();
    };
    static base = async (permission, name) => {
        const result = await check(permission);
        switch (result) {
            case RESULTS.UNAVAILABLE:
                throw new Error(`您的设备不支持${name}`);
            case RESULTS.DENIED:
                //throw new Error("您未同意使用相机,请重试");
                const result1 = await request(permission);
                switch (result1) {
                    case RESULTS.UNAVAILABLE:
                        throw new Error(`您的设备不支持${name}`);
                    case RESULTS.DENIED:
                        throw new Error(`您未同意使用${name},请重试`);
                    case RESULTS.GRANTED:
                        //授权成功
                        break;
                    case RESULTS.BLOCKED:
                        const e = new Error(`您不同意使用${name},请设置`);
                        e.code = RESULTS.BLOCKED;
                        throw e;
                }
                break;
            case RESULTS.GRANTED:
                //授权成功
                break;
            case RESULTS.BLOCKED:
                const e = new Error(`您不同意使用${name},请设置`);
                e.code = RESULTS.BLOCKED;
                throw e;
        }
    }
}
