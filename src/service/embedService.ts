import Polygon from './base/polygon'
import Marker from './base/marker'
import EngineService from './engineService'


export type Embed = Marker | Polygon
export enum EVENTS_MAP {
    CLICK = 'click'
}

class EmbedServie {
    Marker: any = Marker
    Polygon: any = Polygon
    currentStruct: Nullable<Embed> = null
    embedList: Embed[] = []
    engineInstance: Nullable<EngineService> = null
    // material: any = null
    constructor(AMap, mapInstance, server, engineInstance) {
        this.engineInstance = engineInstance
        this.embedList = this.initAllStruct(AMap, mapInstance, server)

    }
    // 观察者模式 
    initAllStruct(AMap, mapInstance, server) {
        const embedList: any = []
        Object.keys(server).forEach((key) => {
            server[key].forEach((serve) => {
                if (this[serve]) {
                    // 创建观察者embed
                    const embed = new this[serve](AMap, mapInstance, this)
                    embedList.push(embed)
                }
            })
        })
        return embedList
    }
    // // 订阅已经实例化的构件点击事件
    subscribeEmbed(type, ctx, ...params: any) {
        this[type](ctx, params)
    }
    getCurrent(currentStruct) {
        this.currentStruct = currentStruct
    }
    // 
    getEventsFromEngine(e) {
        const { type } = e
        switch (type) {
            case EVENTS_MAP.CLICK:
                this.handleClick(e);
                break
            default:
                return;
        }

    }
    // 处理地图点击事件，判断是否添加构件
    handleClick(e) {
        if (this.currentStruct) {
            this.currentStruct?.createStruct(e)
        } else {
            this.engineInstance?.handleMapClick(e)
        }
    }
    // 移除当前构件
    handleRemove(ctx, e) {
        const id = e.target.getExtData().id
        const name = ctx.name
        e.target.setMap(null)
        e.target = null
        const embed = this.embedList.find((embed) => embed.name === name) as Embed
        embed.structs = embed.structs.filter((struct) => struct.getExtData().id !== id)
    }
    handleAdd() {

    }
}

export default EmbedServie