import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { Channel } from './Channel';
import { ProducerStat } from './Producer';
import { MediaKind, RtpCapabilities, RtpParameters } from './RtpParameters';
export declare type ConsumerOptions = {
    /**
     * The id of the Producer to consume.
     */
    producerId: string;
    /**
     * RTP capabilities of the consuming endpoint.
     */
    rtpCapabilities?: RtpCapabilities;
    /**
     * Whether the Consumer must start in paused mode. Default false.
     *
     * When creating a video Consumer, it's recommended to set paused to true,
     * then transmit the Consumer parameters to the consuming endpoint and, once
     * the consuming endpoint has created its local side Consumer, unpause the
     * server side Consumer using the resume() method. This is an optimization
     * to make it possible for the consuming endpoint to render the video as far
     * as possible. If the server side Consumer was created with paused: false,
     * mediasoup will immediately request a key frame to the remote Producer and
     * suych a key frame may reach the consuming endpoint even before it's ready
     * to consume it, generating “black” video until the device requests a keyframe
     * by itself.
     */
    paused?: boolean;
    /**
     * Preferred spatial and temporal layer for simulcast or SVC media sources.
     * If unset, the highest ones are selected.
     */
    preferredLayers?: ConsumerLayers;
    /**
     * Custom application data.
     */
    appData?: any;
};
/**
 * Valid types for 'trace' event.
 */
export declare type ConsumerTraceEventType = 'rtp' | 'keyframe' | 'nack' | 'pli' | 'fir';
/**
 * 'trace' event data.
 */
export declare type ConsumerTraceEventData = {
    /**
     * Trace type.
     */
    type: ConsumerTraceEventType;
    /**
     * Event timestamp.
     */
    timestamp: number;
    /**
     * Event direction.
     */
    direction: 'in' | 'out';
    /**
     * Per type information.
     */
    info: any;
};
export declare type ConsumerScore = {
    /**
     * The score of the RTP stream of the consumer.
     */
    score: number;
    /**
     * The score of the currently selected RTP stream of the producer.
     */
    producerScore: number;
    /**
     * The scores of all RTP streams in the producer (just useful when the
     * producer uses simulcast).
     */
    producerScores: number[];
};
export declare type ConsumerLayers = {
    /**
     * The spatial layer index (from 0 to N).
     */
    spatialLayer: number;
    /**
     * The temporal layer index (from 0 to N).
     */
    temporalLayer?: number;
};
export declare type ConsumerStat = {
    type: string;
    timestamp: number;
    ssrc: number;
    rtxSsrc?: number;
    kind: string;
    mimeType: string;
    packetsLost: number;
    fractionLost: number;
    packetsDiscarded: number;
    packetsRetransmitted: number;
    packetsRepaired: number;
    nackCount: number;
    nackPacketCount: number;
    pliCount: number;
    firCount: number;
    score: number;
    packetCount: number;
    byteCount: number;
    bitrate: number;
    roundTripTime?: number;
};
/**
 * Consumer type.
 */
export declare type ConsumerType = 'simple' | 'simulcast' | 'svc' | 'pipe';
export declare class Consumer extends EnhancedEventEmitter {
    private readonly _internal;
    private readonly _data;
    private readonly _channel;
    private _closed;
    private readonly _appData?;
    private _paused;
    private _producerPaused;
    private _priority;
    private _score;
    private _preferredLayers?;
    private _currentLayers?;
    private readonly _observer;
    /**
     * @private
     * @emits transportclose
     * @emits producerclose
     * @emits producerpause
     * @emits producerresume
     * @emits score - (score: ConsumerScore)
     * @emits layerschange - (layers: ConsumerLayers | undefined)
     * @emits trace - (trace: ConsumerTraceEventData)
     * @emits @close
     * @emits @producerclose
     */
    constructor({ internal, data, channel, appData, paused, producerPaused, score, preferredLayers }: {
        internal: any;
        data: any;
        channel: Channel;
        appData?: any;
        paused: boolean;
        producerPaused: boolean;
        score?: ConsumerScore;
        preferredLayers?: ConsumerLayers;
    });
    /**
     * Consumer id.
     */
    get id(): string;
    /**
     * Associated Producer id.
     */
    get producerId(): string;
    /**
     * Whether the Consumer is closed.
     */
    get closed(): boolean;
    /**
     * Media kind.
     */
    get kind(): MediaKind;
    /**
     * RTP parameters.
     */
    get rtpParameters(): RtpParameters;
    /**
     * Consumer type.
     */
    get type(): ConsumerType;
    /**
     * Whether the Consumer is paused.
     */
    get paused(): boolean;
    /**
     * Whether the associate Producer is paused.
     */
    get producerPaused(): boolean;
    /**
     * Current priority.
     */
    get priority(): number;
    /**
     * Consumer score.
     */
    get score(): ConsumerScore;
    /**
     * Preferred video layers.
     */
    get preferredLayers(): ConsumerLayers | undefined;
    /**
     * Current video layers.
     */
    get currentLayers(): ConsumerLayers | undefined;
    /**
     * App custom data.
     */
    get appData(): any;
    /**
     * Invalid setter.
     */
    set appData(appData: any);
    /**
     * Observer.
     *
     * @emits close
     * @emits pause
     * @emits resume
     * @emits score - (score: ConsumerScore)
     * @emits layerschange - (layers: ConsumerLayers | undefined)
     * @emits trace - (trace: ConsumerTraceEventData)
     */
    get observer(): EnhancedEventEmitter;
    /**
     * Close the Consumer.
     */
    close(): void;
    /**
     * Transport was closed.
     *
     * @private
     */
    transportClosed(): void;
    /**
     * Dump Consumer.
     */
    dump(): Promise<any>;
    /**
     * Get Consumer stats.
     */
    getStats(): Promise<Array<ConsumerStat | ProducerStat>>;
    /**
     * Pause the Consumer.
     */
    pause(): Promise<void>;
    /**
     * Resume the Consumer.
     */
    resume(): Promise<void>;
    /**
     * Set preferred video layers.
     */
    setPreferredLayers({ spatialLayer, temporalLayer }: ConsumerLayers): Promise<void>;
    /**
     * Set priority.
     */
    setPriority(priority: number): Promise<void>;
    /**
     * Unset priority.
     */
    unsetPriority(): Promise<void>;
    /**
     * Request a key frame to the Producer.
     */
    requestKeyFrame(): Promise<void>;
    /**
     * Enable 'trace' event.
     */
    enableTraceEvent(types?: ConsumerTraceEventType[]): Promise<void>;
    private _handleWorkerNotifications;
}
//# sourceMappingURL=Consumer.d.ts.map