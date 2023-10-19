import EmbedServie from "./embedService"

class EngineService {
    mapInstance: any  // 高德地图实例

    AMap: any         // 高德地图构造函数 
    // service: Nullable<EmbedServie> = null
    initEngine(AMap, mapInstance) {
        this.AMap = AMap
        this.mapInstance = mapInstance
    }

    injectEmbedService(server, mapInstance, cb) {
        const service: Nullable<EmbedServie> = new EmbedServie(this.AMap, mapInstance, server)
        cb(service)
    }
    injectMapEvents(key, fn) {
        this.mapInstance.on(key, fn);
    }

    destroyEvents(key, fn) {
        this.mapInstance.off(key, fn);
    }
}

export default EngineService